import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { getDocumentProxy, extractText, extractImages } from './vendor/unpdf/dist/index.mjs'

export const inject = ['connection', 'llm', 'attachments', 'webServer']

const CHANNEL = '/study-decks'
const MAX_RPC_BYTES = 64 * 1024 * 1024
const MAX_PDF_BYTES = 36 * 1024 * 1024
const MAX_IMAGE_BYTES = 12 * 1024 * 1024
const MAX_IMAGES = 10
const MAX_PAGES = 60
const MAX_SCANNED_PAGES = 20
const MAX_TEXT_CHARS = 1_200_000
const MAX_TITLE_CHARS = 120

const PACKAGE_DIR = dirname(fileURLToPath(import.meta.url))
const CMAP_DIR = `${join(PACKAGE_DIR, 'cmaps').replaceAll('\\', '/')}/`
const FONT_DIR = `${join(PACKAGE_DIR, 'standard_fonts').replaceAll('\\', '/')}/`

class StudyError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'StudyError'
    this.code = code
  }
}

/**
 * Host half of the Study decks bundle. The browser half talks to these methods
 * through the package-private connection channel; no agent tool is exposed.
 */
export function apply(ctx) {
  const handler = async (endpoint, payload, signal) => {
    try {
      switch (endpoint) {
        case 'status':
          return ok(await status(ctx))
        case 'extractPdf':
          return ok(await extractPdf(ctx, payload, signal))
        case 'ocrImages':
          return ok(await ocrImages(ctx, payload, signal))
        case 'generate':
          return ok(await generate(ctx, payload, signal))
        case 'reviseQuiz':
          return ok(await reviseQuiz(ctx, payload, signal))
        default:
          throw new StudyError('study/unknown-endpoint', `未知的接口：${endpoint}`)
      }
    } catch (error) {
      if (signal.aborted) {
        return fail('study/aborted', '操作已取消。')
      }
      if (error instanceof StudyError) {
        return fail(error.code, error.message)
      }
      console.error('[study-decks]', error)
      return fail('study/internal', error instanceof Error ? error.message : String(error))
    }
  }

  ctx.effect(() => {
    const dispose = ctx.webServer.register({
      kind: 'prefix',
      path: CHANNEL,
      handler: (request, response) => serveRpc(ctx, handler, request, response),
    })
    return () => {
      dispose()
    }
  }, 'study-decks: package RPC route')
}

async function serveRpc(ctx, handler, request, response) {
  const connection = ctx.get('connection')
  try {
    const rejection = connection?.requestRejection?.({ headers: request.headers })
    if (rejection) {
      response.writeHead(rejection)
      response.end(rejection === 401 ? 'unauthorized' : 'forbidden')
      return
    }
  } catch (error) {
    console.error('[study-decks] request trust check failed', error)
    response.writeHead(403)
    response.end('forbidden')
    return
  }

  if (request.method !== 'POST') {
    response.writeHead(405, { allow: 'POST' })
    response.end('method not allowed')
    return
  }

  let body
  try {
    body = JSON.parse(await readRequestBody(request, MAX_RPC_BYTES))
  } catch (error) {
    response.writeHead(400, { 'content-type': 'application/json; charset=utf-8' })
    response.end(
      JSON.stringify({
        type: 'server-response',
        rpcId: 'invalid-request',
        result: {
          ok: false,
          error: {
            code: 'study/bad-request',
            message: error instanceof Error ? error.message : 'Invalid request',
            details: {},
          },
        },
      }),
    )
    return
  }

  const rpcId = typeof body?.rpcId === 'string' ? body.rpcId : 'invalid-request'
  const endpoint = typeof body?.method === 'string' ? body.method : ''
  const controller = new AbortController()
  const abort = () => {
    if (!response.writableEnded) controller.abort()
  }
  response.on('close', abort)
  try {
    const result = await handler(endpoint, body?.payload, controller.signal)
    if (response.writableEnded) return
    response.writeHead(200, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    })
    response.end(JSON.stringify({ type: 'server-response', rpcId, result }))
  } catch (error) {
    if (response.writableEnded) return
    response.writeHead(200, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    })
    response.end(
      JSON.stringify({
        type: 'server-response',
        rpcId,
        result: fail('study/internal', error instanceof Error ? error.message : String(error)),
      }),
    )
  } finally {
    response.off('close', abort)
  }
}

async function readRequestBody(request, limit) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > limit) throw new Error('请求内容过大。')
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

function ok(value) {
  return { ok: true, value }
}

function fail(code, message) {
  return { ok: false, error: { code, message, details: {} } }
}

async function status(ctx) {
  const selection = await selectModel(ctx)
  let info
  try {
    info = await ctx.llm.resolveModelInfo(selection.provider, selection.model)
  } catch {
    info = undefined
  }
  const modalities = info?.inputModalities
  return {
    provider: selection.provider,
    model: selection.model,
    modelName: info?.name ?? selection.model,
    images: Array.isArray(modalities) ? modalities.includes('image') : undefined,
  }
}

async function selectModel(ctx) {
  const configured = ctx.get('agentDefaultModel')?.currentSelection?.()
  if (configured?.provider && configured?.model) {
    return { provider: configured.provider, model: configured.model }
  }
  const providers = ctx.llm.listProviders()
  for (const provider of providers) {
    try {
      const models = await ctx.llm.listModels(provider.id)
      if (models[0]?.id) return { provider: provider.id, model: models[0].id }
    } catch {
      // Try the next registered provider.
    }
  }
  throw new StudyError('study/model-unavailable', '当前没有可用的模型，请先在设置里配置模型。')
}

async function runModel(ctx, request, signal) {
  const selection = await selectModel(ctx)
  const config = {
    provider: selection.provider,
    model: selection.model,
    maxTokens: request.maxTokens ?? 2600,
    temperature: request.temperature ?? 0.35,
  }
  const prepared = await ctx.llm.prepareCall(config, signal)
  let text = ''
  let fallbackText = ''
  let finish
  const stream = prepared.stream({
    ...prepared.config,
    system: request.system,
    messages: request.messages,
    signal,
  })
  for await (const chunk of stream) {
    if (chunk.type === 'text-delta') text += chunk.text
    else if (chunk.type === 'block-end' && chunk.block?.type === 'text') fallbackText += chunk.block.text
    else if (chunk.type === 'finish') finish = chunk.reason
  }
  if (signal.aborted || finish?.kind === 'aborted') {
    throw new StudyError('study/aborted', '操作已取消。')
  }
  if (finish?.kind === 'error') {
    throw new StudyError('study/model-error', finish.failure?.message ?? '模型调用失败。')
  }
  const output = (text || fallbackText).trim()
  if (!output) throw new StudyError('study/empty-model-output', '模型没有返回内容，请重试。')
  return output
}

async function imageOutputSupported(ctx) {
  const selection = await selectModel(ctx)
  try {
    const info = await ctx.llm.resolveModelInfo(selection.provider, selection.model)
    return info.inputModalities === undefined ? undefined : info.inputModalities.includes('image')
  } catch {
    return undefined
  }
}

async function visionMarkdown(ctx, data, mediaType, name, signal, context) {
  if ((await imageOutputSupported(ctx)) === false) {
    throw new StudyError(
      'study/vision-unavailable',
      '当前模型不支持图片理解。请改用文本或 Markdown 上传，或在设置中切换支持图片的模型。',
    )
  }
  const [attachment] = await ctx.attachments.saveImages([{ data, mediaType, name }])
  const prompt = [
    context,
    '',
    '请逐字转录图片中的全部可见文字，保留标题、段落、列表、表格和公式的结构，用 Markdown 输出。',
    '不要总结，不要解释，不要补充图片中不存在的内容。若某处无法辨认，用 [无法辨认] 标记。',
    '只输出 Markdown 正文，不要代码围栏。',
  ].join('\n')
  return stripFences(
    await runModel(
      ctx,
      {
        system: '你是严谨的文档数字化助手。你的唯一任务是把图片内容转成可供学习的 Markdown。',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image', attachment },
            ],
          },
        ],
        maxTokens: 4200,
        temperature: 0.1,
      },
      signal,
    ),
  )
}

async function extractPdf(ctx, payload, signal) {
  const input = objectOf(payload)
  const data = decodeBase64(input.data, MAX_PDF_BYTES)
  const title = cleanTitle(input.title) || 'PDF 文档'
  const document = await getDocumentProxy(new Uint8Array(data), {
    maxImageSize: 16_777_216,
    cMapUrl: CMAP_DIR,
    cMapPacked: true,
    standardFontDataUrl: FONT_DIR,
    useSystemFonts: false,
  })
  try {
    const totalPages = document.numPages
    if (!Number.isFinite(totalPages) || totalPages < 1) {
      throw new StudyError('study/pdf-empty', '这个 PDF 没有可读取的页面。')
    }
    const from = clampPage(input.pageFrom, 1, totalPages, 1)
    const to = clampPage(input.pageTo, 1, totalPages, totalPages)
    if (to < from) throw new StudyError('study/pdf-range', '结束页不能小于起始页。')
    if (to - from + 1 > MAX_PAGES) {
      throw new StudyError('study/pdf-range-too-large', `一次最多处理 ${MAX_PAGES} 页，请缩小页码范围。`)
    }

    const extracted = await extractText(document, { mergePages: false })
    const pages = Array.isArray(extracted.text) ? extracted.text : [String(extracted.text ?? '')]
    const sections = []
    const scannedPages = []
    const warnings = []
    let skippedScans = 0

    for (let page = from; page <= to; page += 1) {
      if (signal.aborted) throw new StudyError('study/aborted', '操作已取消。')
      const pageText = cleanPageText(pages[page - 1] ?? '')
      if (visibleLength(pageText) >= 20) {
        sections.push(`## 第 ${page} 页\n\n${pageText}`)
        continue
      }

      scannedPages.push(page)
      if (scannedPages.length > MAX_SCANNED_PAGES) {
        skippedScans += 1
        continue
      }
      let images = []
      try {
        images = await extractImages(document, page, { format: 'png' })
      } catch (error) {
        console.warn(`[study-decks] image extraction failed for page ${page}:`, error)
      }
      const image = largestImage(images)
      if (!image) {
        warnings.push(`第 ${page} 页没有可提取的文字或页面图像。`)
        continue
      }
      try {
        const markdown = await visionMarkdown(
          ctx,
          image.data,
          'image/png',
          `${title}-p${page}.png`,
          signal,
          `这是 PDF《${title}》第 ${page} 页的扫描图。`,
        )
        if (markdown.trim()) sections.push(`## 第 ${page} 页（扫描页识别）\n\n${markdown.trim()}`)
      } catch (error) {
        if (error instanceof StudyError && error.code === 'study/aborted') throw error
        warnings.push(`第 ${page} 页的扫描识别失败：${error instanceof Error ? error.message : String(error)}`)
      }
    }

    if (skippedScans > 0) {
      warnings.push(`扫描页超过 ${MAX_SCANNED_PAGES} 页，已跳过 ${skippedScans} 页。请缩小页码范围。`)
    }

    const markdown = [
      `# ${title}`,
      `> 来源：PDF · 第 ${from}–${to} 页 · 共 ${totalPages} 页`,
      '',
      ...sections,
    ].join('\n\n')
    const textOnly = markdown.replace(/^#.*$/gm, '').replace(/^>.*$/gm, '')
    if (visibleLength(textOnly) < 120) {
      throw new StudyError(
        'study/pdf-no-text',
        '没有从 PDF 提取到足够的文字。它可能是扫描件或受保护的 PDF；请把关键页面截图后按图片上传。',
      )
    }
    return {
      markdown,
      totalPages,
      from,
      to,
      scannedPages,
      warnings,
    }
  } finally {
    await closePdf(document)
  }
}

async function closePdf(document) {
  try {
    if (typeof document?.destroy === 'function') {
      await document.destroy()
      return
    }
    if (typeof document?.loadingTask?.destroy === 'function') {
      await document.loadingTask.destroy()
      return
    }
    if (typeof document?._transport?.destroy === 'function') {
      await document._transport.destroy()
    }
  } catch {
    // Closing is best-effort; extracted text is already detached.
  }
}

async function ocrImages(ctx, payload, signal) {
  const input = objectOf(payload)
  const images = Array.isArray(input.images) ? input.images : []
  if (images.length === 0) throw new StudyError('study/no-images', '没有收到图片。')
  if (images.length > MAX_IMAGES) {
    throw new StudyError('study/too-many-images', `一次最多上传 ${MAX_IMAGES} 张图片。`)
  }
  const title = cleanTitle(input.title) || '图片笔记'
  const sections = []
  const warnings = []
  for (let index = 0; index < images.length; index += 1) {
    if (signal.aborted) throw new StudyError('study/aborted', '操作已取消。')
    const item = objectOf(images[index])
    const name = cleanName(item.name) || `图片 ${index + 1}`
    const mediaType = imageMediaType(item.mediaType, name)
    const data = decodeBase64(item.data, MAX_IMAGE_BYTES)
    try {
      const markdown = await visionMarkdown(
        ctx,
        data,
        mediaType,
        name,
        signal,
        `这是学习材料中的第 ${index + 1} 张图片（${name}）。`,
      )
      if (markdown.trim()) sections.push(`## ${name}\n\n${markdown.trim()}`)
      else warnings.push(`${name} 没有识别到文字。`)
    } catch (error) {
      if (error instanceof StudyError && error.code === 'study/aborted') throw error
      warnings.push(`${name} 识别失败：${error instanceof Error ? error.message : String(error)}`)
    }
  }
  if (sections.length === 0) {
    throw new StudyError('study/ocr-empty', warnings[0] ?? '没有从图片中识别出内容。')
  }
  return {
    markdown: [`# ${title}`, `> 来源：图片 · ${images.length} 张`, '', ...sections].join('\n\n'),
    warnings,
  }
}

async function generate(ctx, payload, signal) {
  const input = objectOf(payload)
  const text = String(input.text ?? '').slice(0, MAX_TEXT_CHARS).trim()
  if (text.length < 60) throw new StudyError('study/text-too-short', '这一段材料太短，无法出题。')
  const title = cleanTitle(input.title) || '学习材料'
  const index = Number.isFinite(input.index) ? Math.max(1, Math.floor(input.index)) : 1
  const total = Number.isFinite(input.total) ? Math.max(index, Math.floor(input.total)) : 1
  const language = input.language === 'en' ? 'English' : '中文'

  const system = [
    '你是一位资深记忆卡设计师，擅长把学习材料拆成高质量的挖空测验。',
    '你只输出一个 JSON 对象，不输出 Markdown、解释或代码围栏。',
    '',
    'JSON 格式：',
    '{"title":"不超过 18 个字的卡组名称","quizzes":[{"stem":"包含 {{1}} 占位符的句子","blanks":[{"answer":"标准答案","options":["正确答案","干扰项1","干扰项2","干扰项3"]}],"explanation":"为什么这样填","source":"对应的原文句子","tags":["主题"]}]}',
    '',
    '出题规则：',
    '1. 先根据材料主题起一个具体、简洁的卡组名称 title。中文不超过 18 个字，英文不超过 10 个词；不要用“学习材料”“笔记”“复习资料”这类空泛名称。',
    '2. 每段材料出 3–5 题，宁可少而精，不要出重复题。',
    '3. 每题 1–3 个空；优先 1–2 个空。占位符必须按 {{1}}、{{2}} 顺序出现，数量与 blanks 完全一致。',
    '4. 挖空只挖关键概念、术语、人名、时间、数字、因果或对比关系，不要挖整句，也不要留下无法推断的空。',
    '5. stem 必须保留足够上下文，让认真学过的人能填出来；不要出现“根据材料”这类空泛表述。',
    '6. 每个 blank 的 options 恰好 4 个，包含 answer，另外 3 个必须是同类型、可信但错误的干扰项；不要用“以上都不是”。',
    '7. explanation 用一两句话解释答案与易错点；source 从原文中摘一句，不要改写。',
    '8. 不要把目录、页码、作者简介、版权信息作为考点。',
    `9. 材料语言为${language}时，卡组名称、题目、选项和解释也使用${language}。`,
    '10. 不要输出任何 JSON 之外的内容。',
  ].join('\n')

  const user = [
    `文档标题：${title}`,
    `材料片段：${index}/${total}`,
    '',
    '请阅读下面的材料并出题：',
    '"""',
    text,
    '"""',
  ].join('\n')

  let raw = await runModel(
    ctx,
    {
      system,
      messages: [{ role: 'user', content: [{ type: 'text', text: user }] }],
      maxTokens: 3600,
      temperature: 0.45,
    },
    signal,
  )
  let parsed = parseGenerated(raw)
  if (parsed.quizzes.length === 0) {
    raw = await runModel(
      ctx,
      {
        system,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `${user}\n\n上次输出无法解析为有效题目。请重新输出，严格只输出规定的 JSON 对象。`,
              },
            ],
          },
        ],
        maxTokens: 3600,
        temperature: 0.25,
      },
      signal,
    )
    parsed = parseGenerated(raw)
  }
  if (parsed.quizzes.length === 0) {
    throw new StudyError('study/quiz-parse', '模型没有生成可用的题目，请重试或缩短材料。')
  }
  return { quizzes: parsed.quizzes, suggestedTitle: parsed.suggestedTitle, title, index, total }
}

async function reviseQuiz(ctx, payload, signal) {
  const input = objectOf(payload)
  const rawQuiz = objectOf(input.quiz)
  const original = normalizeQuizzes(JSON.stringify({ quizzes: [rawQuiz] }))[0]
  if (!original) throw new StudyError('study/quiz-invalid', '这道题缺少可用的挖空信息，无法重新选空。')
  const instruction = String(input.instruction ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 600)
  const title = cleanTitle(input.title) || '学习材料'
  const language = input.language === 'en' ? 'English' : '中文'

  const system = [
    '你是记忆卡编辑，正在帮用户重新选择一道挖空题的挖空位置。',
    '你只输出一个 JSON 对象，不输出 Markdown、解释或代码围栏。',
    '',
    'JSON 格式：',
    '{"quizzes":[{"stem":"包含 {{1}} 占位符的句子","blanks":[{"answer":"标准答案","options":["正确答案","干扰项1","干扰项2","干扰项3"]}],"explanation":"为什么这样填","source":"对应的原文句子","tags":["主题"]}]}',
    '',
    '编辑规则：',
    '1. 只输出 1 道题。保留原题的核心考点和事实，不得添加材料中没有的信息。',
    '2. 优先满足用户对挖空位置、挖空数量或难度的要求；用户要求不明确时，换一个不同的挖空位置，难度相当。',
    '3. 每题 1–3 个空；占位符必须按 {{1}}、{{2}} 顺序出现，数量与 blanks 完全一致。',
    '4. 挖空必须是有意义的考点，不能挖整句，也不能让上下文失去推断依据。',
    '5. 每个 blank 的 options 恰好 4 个，包含 answer，另外 3 个是同类型、可信但错误的干扰项。',
    '6. explanation 用一两句话解释答案；source 从原文中摘一句，不要改写。',
    `7. 材料语言为${language}时，题目、选项和解释也使用${language}。`,
    '8. 不要输出任何 JSON 之外的内容。',
  ].join('\n')

  const answers = original.blanks.map((blank, index) => `空${index + 1}：${blank.answer}`).join('；')
  const user = [
    `卡组：${title}`,
    `当前题干：${original.stem}`,
    `当前答案：${answers}`,
    original.explanation ? `当前解析：${original.explanation}` : '',
    original.source ? `原文：${original.source}` : '',
    '',
    `用户要求：${instruction || '换一个挖空位置，保持原题知识点和难度大致不变。'}`,
    '',
    '请重新设计这一道题，并严格只输出规定的 JSON 对象。',
  ]
    .filter(Boolean)
    .join('\n')

  const request = {
    system,
    messages: [{ role: 'user', content: [{ type: 'text', text: user }] }],
    maxTokens: 2200,
    temperature: 0.55,
  }
  let raw = await runModel(ctx, request, signal)
  let quizzes = normalizeQuizzes(raw)
  if (quizzes.length === 0) {
    raw = await runModel(
      ctx,
      {
        ...request,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `${user}\n\n上次输出无法解析。请重新输出，严格只输出 1 道题的 JSON 对象。`,
              },
            ],
          },
        ],
        temperature: 0.25,
      },
      signal,
    )
    quizzes = normalizeQuizzes(raw)
  }
  if (quizzes.length === 0) {
    throw new StudyError('study/quiz-parse', 'AI 没有生成可用的新挖空，请换个说法再试。')
  }
  return { quiz: { ...quizzes[0], id: String(rawQuiz.id || quizzes[0].id) } }
}

function parseGenerated(raw) {
  const parsed = parseJson(raw)
  const title = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed.title ?? parsed.deckTitle : ''
  return {
    quizzes: normalizeQuizzes(raw),
    suggestedTitle: cleanTitle(title) || '',
  }
}

function normalizeQuizzes(raw) {
  const parsed = parseJson(raw)
  if (!parsed) return []
  const list = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed.quizzes)
      ? parsed.quizzes
      : Array.isArray(parsed.cards)
        ? parsed.cards
        : Array.isArray(parsed.items)
          ? parsed.items
          : []
  const sourceAnswers = []
  for (const item of list) {
    const blanks = blanksOf(item)
    for (const blank of blanks) {
      const answer = cleanAnswer(blank.answer ?? blank.value ?? blank.text)
      if (answer) sourceAnswers.push(answer)
    }
  }
  const quizzes = []
  for (const item of list.slice(0, 8)) {
    const quiz = normalizeQuiz(item, sourceAnswers)
    if (quiz) quizzes.push(quiz)
  }
  return quizzes
}

function normalizeQuiz(raw, answerPool) {
  if (!raw || typeof raw !== 'object') return null
  let stem = String(raw.stem ?? raw.question ?? raw.sentence ?? raw.text ?? '')
    .replace(/\r/g, '')
    .replace(/\[\s*(\d+)\s*\]/g, '{{$1}}')
    .replace(/【\s*(\d+)\s*】/g, '{{$1}}')
    .replace(/｛｛\s*(\d+)\s*｝｝/g, '{{$1}}')
    .replace(/\s+/g, ' ')
    .trim()
  if (!stem) return null
  let blanks = blanksOf(raw)
    .map((blank) => normalizeBlank(blank, answerPool))
    .filter(Boolean)
  if (!blanks.length) return null

  if (!/\{\{\s*\d+\s*\}\}/.test(stem)) {
    const underscoreCount = (stem.match(/_{2,}|＿{2,}/g) ?? []).length
    if (underscoreCount > 0) {
      let position = 0
      stem = stem.replace(/_{2,}|＿{2,}/g, () => `{{${++position}}}`)
    }
  }
  if (!/\{\{\s*\d+\s*\}\}/.test(stem)) {
    const firstAnswer = blanks[0].answer
    const index = firstAnswer ? stem.indexOf(firstAnswer) : -1
    if (index < 0) return null
    stem = `${stem.slice(0, index)}{{1}}${stem.slice(index + firstAnswer.length)}`
  }

  const marker = /\{\{\s*(\d+)\s*\}\}/g
  const used = []
  let last = 0
  let nextStem = ''
  let sequence = 0
  for (const match of stem.matchAll(marker)) {
    nextStem += stem.slice(last, match.index)
    const blank = blanks[Number(match[1]) - 1]
    if (blank) {
      sequence += 1
      used.push(blank)
      nextStem += `{{${sequence}}}`
    }
    last = match.index + match[0].length
  }
  nextStem += stem.slice(last)
  if (used.length === 0) return null
  stem = nextStem.replace(/\s+/g, ' ').trim()
  if (stem.length < 8 || stem.length > 900) return null

  const answerSet = new Set(used.map((blank) => normalizeAnswer(blank.answer)))
  if (answerSet.size !== used.length) return null

  return {
    id: `q_${crypto.randomUUID().slice(0, 8)}`,
    stem,
    blanks: used,
    explanation: cleanSentence(raw.explanation ?? raw.reason ?? ''),
    source: cleanSentence(raw.source ?? raw.evidence ?? ''),
    tags: cleanTags(raw.tags ?? raw.tag),
  }
}

function blanksOf(item) {
  if (!item || typeof item !== 'object') return []
  const source = item.blanks ?? item.answers ?? item.blanksList
  if (Array.isArray(source)) return source
  if (typeof source === 'string') {
    return source
      .split(/\s*[|｜]\s*/)
      .filter(Boolean)
      .map((answer) => ({ answer }))
  }
  return []
}

function normalizeBlank(raw, answerPool) {
  if (typeof raw === 'string') raw = { answer: raw }
  if (!raw || typeof raw !== 'object') return null
  const answer = cleanAnswer(raw.answer ?? raw.value ?? raw.text ?? raw.correct)
  if (!answer) return null
  const rawOptions = raw.options ?? raw.choices ?? raw.distractors ?? []
  const seen = new Set([normalizeAnswer(answer)])
  const extras = []
  for (const option of Array.isArray(rawOptions) ? rawOptions : []) {
    const text = cleanAnswer(option)
    if (!text) continue
    const key = normalizeAnswer(text)
    if (seen.has(key)) continue
    seen.add(key)
    extras.push(text)
    if (extras.length >= 3) break
  }
  if (extras.length < 3) {
    for (const candidate of answerPool) {
      const text = cleanAnswer(candidate)
      if (!text) continue
      const key = normalizeAnswer(text)
      if (seen.has(key)) continue
      seen.add(key)
      extras.push(text)
      if (extras.length >= 3) break
    }
  }
  if (extras.length < 1) extras.push('以上都不是')
  if (extras.length < 3) {
    for (const fallback of ['以上都不是', '无法确定', '材料未提及']) {
      if (extras.length >= 3) break
      const key = normalizeAnswer(fallback)
      if (seen.has(key)) continue
      seen.add(key)
      extras.push(fallback)
    }
  }
  return { answer, options: [answer, ...extras.slice(0, 3)] }
}

function parseJson(raw) {
  let text = stripFences(String(raw ?? '')).trim()
  const candidates = [text]
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start >= 0 && end > start) candidates.push(text.slice(start, end + 1))
  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate)
    } catch {
      // Try the next candidate.
    }
  }
  return null
}

function stripFences(value) {
  const text = String(value ?? '').trim()
  const fenced = text.match(/^```(?:json|markdown|md)?\s*\n([\s\S]*?)\n```$/i)
  return fenced ? fenced[1].trim() : text
}

function objectOf(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

function decodeBase64(value, maxBytes) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new StudyError('study/no-data', '没有收到文件数据。')
  }
  const cleaned = value.replace(/^data:[^;]+;base64,/i, '').replace(/\s+/g, '')
  let buffer
  try {
    buffer = Buffer.from(cleaned, 'base64')
  } catch {
    throw new StudyError('study/bad-base64', '文件数据损坏，请重新选择。')
  }
  if (!buffer.length) throw new StudyError('study/empty-file', '文件是空的。')
  if (buffer.length > maxBytes) {
    throw new StudyError('study/file-too-large', `文件超过 ${Math.round(maxBytes / 1024 / 1024)} MB 限制。`)
  }
  return new Uint8Array(buffer)
}

function imageMediaType(mediaType, name) {
  const declared = String(mediaType ?? '').toLowerCase()
  if (['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(declared)) return declared
  const extension = String(name ?? '').toLowerCase().split('.').pop()
  if (extension === 'png') return 'image/png'
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg'
  if (extension === 'webp') return 'image/webp'
  if (extension === 'gif') return 'image/gif'
  throw new StudyError('study/image-type', '只支持 PNG、JPEG、WebP 或 GIF 图片。')
}

function clampPage(value, min, max, fallback) {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.min(max, Math.max(min, Math.floor(number)))
}

function largestImage(images) {
  let best
  let bestArea = 0
  for (const image of Array.isArray(images) ? images : []) {
    if (!image?.data?.byteLength) continue
    const area = (image.width ?? 0) * (image.height ?? 0)
    if (area > bestArea) {
      best = image
      bestArea = area
    }
  }
  return bestArea >= 20_000 ? best : undefined
}

function visibleLength(value) {
  return String(value ?? '').replace(/\s+/g, '').length
}

function cleanPageText(value) {
  return String(value ?? '')
    .replace(/\u0000/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()
}

function cleanTitle(value) {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_TITLE_CHARS)
}

function cleanName(value) {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160)
}

function cleanAnswer(value) {
  return String(value ?? '')
    .replace(/^["'“”‘’]+|["'“”‘’]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)
}

function cleanSentence(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 800)
}

function cleanTags(value) {
  const list = Array.isArray(value) ? value : typeof value === 'string' ? value.split(/[,，、]/) : []
  return [...new Set(list.map((tag) => String(tag).trim()).filter(Boolean))].slice(0, 5)
}

function normalizeAnswer(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[\s\u3000]+/g, '')
    .replace(/[，。；：、,.;:!?！？"'“”‘’（）()\[\]【】《》<>·—–-]/g, '')
    .trim()
}
