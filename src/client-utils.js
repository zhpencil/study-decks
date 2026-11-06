    function newId() {
      if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
      return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
    }

    function hashString(value) {
      let hash = 2166136261
      const text = String(value)
      for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index)
        hash = Math.imul(hash, 16777619)
      }
      return hash >>> 0
    }

    function seededShuffle(items, seed) {
      const copy = items.slice()
      let state = hashString(seed) || 1
      const random = () => {
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0
        return state / 4294967296
      }
      for (let index = copy.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(random() * (index + 1))
        ;[copy[index], copy[swap]] = [copy[swap], copy[index]]
      }
      return copy
    }

    function normalizeAnswer(value) {
      return String(value ?? '')
        .toLowerCase()
        .replace(/[\s\u3000]+/g, '')
        .replace(/[，。；：、,.;:!?！？"'“”‘’（）()\[\]【】《》<>·—–-]/g, '')
        .trim()
    }

    function answerIsCorrect(input, answer) {
      const normalized = normalizeAnswer(input)
      return normalized.length > 0 && normalized === normalizeAnswer(answer)
    }

    function formatDate(timestamp, lang) {
      if (!timestamp) return tr(lang, 'never')
      try {
        return new Date(timestamp).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      } catch {
        return ''
      }
    }

    function formatRelative(timestamp, lang) {
      if (!timestamp) return tr(lang, 'never')
      const diff = Date.now() - timestamp
      if (diff < 60_000) return tr(lang, 'now')
      return formatDate(timestamp, lang)
    }

    function splitStem(stem) {
      const nodes = []
      const pattern = /\{\{\s*(\d+)\s*\}\}/g
      const text = String(stem ?? '')
      let last = 0
      let match
      while ((match = pattern.exec(text)) !== null) {
        if (match.index > last) nodes.push({ type: 'text', text: text.slice(last, match.index) })
        nodes.push({ type: 'blank', index: Number(match[1]) - 1 })
        last = pattern.lastIndex
      }
      if (last < text.length) nodes.push({ type: 'text', text: text.slice(last) })
      return nodes
    }

    function defaultStats() {
      return { attempts: 0, correct: 0, wrong: 0, skipped: 0, lastAt: null }
    }

    function deckStats(deck) {
      return { ...defaultStats(), ...(deck?.stats ?? {}) }
    }

    function accuracyOf(stats) {
      const total = (stats?.correct ?? 0) + (stats?.wrong ?? 0) + (stats?.skipped ?? 0)
      if (!total) return 0
      return Math.round(((stats.correct ?? 0) / total) * 100)
    }

    function wrongItems(db, deckId) {
      return Object.values(db?.wrong ?? {})
        .filter((item) => item && item.quiz && (!deckId || item.deckId === deckId))
        .sort((left, right) => (right.lastAt ?? 0) - (left.lastAt ?? 0))
    }

    function wrongStats(items) {
      const list = Array.isArray(items) ? items : []
      let wrong = 0
      let skipped = 0
      let correct = 0
      for (const item of list) {
        wrong += item.wrongCount ?? 0
        skipped += item.skippedCount ?? 0
        correct += item.correctCount ?? 0
      }
      const attempts = wrong + skipped + correct
      return {
        total: list.length,
        active: list.filter((item) => !item.mastered).length,
        mastered: list.filter((item) => item.mastered).length,
        wrong,
        skipped,
        correct,
        attempts,
        accuracy: attempts ? Math.round((correct / attempts) * 100) : 0,
      }
    }

    function emptyDb() {
      return { version: 1, decks: [], wrong: {} }
    }

    function sanitizeQuiz(raw) {
      if (!raw || typeof raw !== 'object') return null
      const stem = String(raw.stem ?? '').trim()
      if (!stem || !/\{\{\s*\d+\s*\}\}/.test(stem)) return null
      const blanks = (Array.isArray(raw.blanks) ? raw.blanks : [])
        .map((blank) => {
          if (!blank || typeof blank !== 'object') return null
          const answer = String(blank.answer ?? '').trim()
          if (!answer) return null
          const options = Array.isArray(blank.options)
            ? [...new Set(blank.options.map((option) => String(option ?? '').trim()).filter(Boolean))]
            : []
          if (!options.some((option) => normalizeAnswer(option) === normalizeAnswer(answer))) options.unshift(answer)
          return { answer, options: options.slice(0, 6) }
        })
        .filter(Boolean)
      if (!blanks.length) return null
      return {
        id: String(raw.id ?? newId()),
        stem,
        blanks,
        explanation: String(raw.explanation ?? ''),
        source: String(raw.source ?? ''),
        tags: Array.isArray(raw.tags) ? raw.tags.map(String).filter(Boolean).slice(0, 5) : [],
      }
    }

    function sanitizeDeck(raw) {
      if (!raw || typeof raw !== 'object' || !raw.id) return null
      const quizzes = (Array.isArray(raw.quizzes) ? raw.quizzes : []).map(sanitizeQuiz).filter(Boolean)
      if (!quizzes.length) return null
      return {
        id: String(raw.id),
        title: String(raw.title ?? 'Untitled').slice(0, 160),
        createdAt: Number(raw.createdAt) || Date.now(),
        sourceName: String(raw.sourceName ?? '').slice(0, 160),
        sourceKind: ['pdf', 'images', 'text'].includes(raw.sourceKind) ? raw.sourceKind : 'text',
        sourcePages: raw.sourcePages && typeof raw.sourcePages === 'object' ? raw.sourcePages : null,
        imageCount: Number(raw.imageCount) || 0,
        warnings: Array.isArray(raw.warnings) ? raw.warnings.map(String).slice(0, 8) : [],
        quizzes,
        stats: { ...defaultStats(), ...(raw.stats && typeof raw.stats === 'object' ? raw.stats : {}) },
      }
    }

    function sanitizeWrong(raw) {
      if (!raw || typeof raw !== 'object') return null
      const quiz = sanitizeQuiz(raw.quiz)
      if (!quiz || !raw.key) return null
      return {
        key: String(raw.key),
        deckId: String(raw.deckId ?? ''),
        deckTitle: String(raw.deckTitle ?? '').slice(0, 160),
        quiz,
        wrongCount: Number(raw.wrongCount) || 0,
        skippedCount: Number(raw.skippedCount) || 0,
        correctCount: Number(raw.correctCount) || 0,
        streak: Number(raw.streak) || 0,
        mastered: Boolean(raw.mastered),
        lastAt: Number(raw.lastAt) || Date.now(),
        lastMode: raw.lastMode === 'hard' ? 'hard' : 'easy',
        lastAnswer: raw.lastAnswer && typeof raw.lastAnswer === 'object' ? raw.lastAnswer : null,
      }
    }

    function sanitizeDb(raw) {
      const db = emptyDb()
      if (!raw || typeof raw !== 'object') return db
      const seen = new Set()
      for (const item of Array.isArray(raw.decks) ? raw.decks : []) {
        const deck = sanitizeDeck(item)
        if (!deck || seen.has(deck.id)) continue
        seen.add(deck.id)
        db.decks.push(deck)
      }
      for (const [key, value] of Object.entries(raw.wrong && typeof raw.wrong === 'object' ? raw.wrong : {})) {
        const item = sanitizeWrong({ ...value, key })
        if (item) db.wrong[item.key] = item
      }
      db.decks.sort((left, right) => right.createdAt - left.createdAt)
      return db
    }

    function loadDb() {
      try {
        const raw = globalThis.localStorage?.getItem(STORAGE_KEY)
        return raw ? sanitizeDb(JSON.parse(raw)) : emptyDb()
      } catch (error) {
        console.error('[study-decks] failed to load local decks', error)
        return emptyDb()
      }
    }

    function persistDb(db) {
      try {
        globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(db))
        return true
      } catch (error) {
        console.error('[study-decks] failed to save local decks', error)
        return false
      }
    }

    async function callHost(endpoint, payload, signal) {
      if (!connectionService?.rpc?.call) {
        throw new Error(tr(currentLang(), 'offline'))
      }
      const result = await connectionService.rpc.call(CHANNEL, endpoint, payload, signal)
      if (!result || result.ok !== true) {
        const error = new Error(result?.error?.message ?? 'Host call failed')
        error.code = result?.error?.code
        throw error
      }
      return result.value
    }

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = () => reject(new Error('无法读取文件'))
        reader.onload = () => {
          const result = String(reader.result ?? '')
          const comma = result.indexOf(',')
          resolve(comma >= 0 ? result.slice(comma + 1) : result)
        }
        reader.readAsDataURL(file)
      })
    }

    function fileToText(file) {
      if (typeof file.text === 'function') return file.text()
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = () => reject(new Error('无法读取文件'))
        reader.onload = () => resolve(String(reader.result ?? ''))
        reader.readAsText(file)
      })
    }

    function titleFromFile(name) {
      return String(name ?? '')
        .replace(/\.[^.]+$/, '')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 100)
    }

    function splitStudyText(text, maxChars = CHUNK_CHARS) {
      const clean = String(text ?? '')
        .replace(/\r\n?/g, '\n')
        .replace(/\n{4,}/g, '\n\n\n')
        .trim()
      if (!clean) return []
      const lines = clean.split('\n')
      const chunks = []
      let buffer = ''
      const flush = () => {
        if (buffer.trim().length > 0) chunks.push(buffer.trim())
        buffer = ''
      }
      for (const line of lines) {
        const nextLength = buffer.length + line.length + 1
        if (nextLength > maxChars && buffer.trim().length > 120) flush()
        if (line.length > maxChars) {
          let rest = line
          while (rest.length > maxChars) {
            if (buffer.trim()) flush()
            chunks.push(rest.slice(0, maxChars))
            rest = rest.slice(maxChars)
          }
          buffer += `${rest}\n`
          continue
        }
        buffer += `${line}\n`
      }
      flush()
      const merged = []
      for (const chunk of chunks) {
        if (chunk.length < 320 && merged.length > 0) merged[merged.length - 1] += `\n\n${chunk}`
        else merged.push(chunk)
      }
      return merged
    }

    function deckSourceLabel(deck, t) {
      if (!deck) return ''
      if (deck.sourceKind === 'pdf' && deck.sourcePages) {
        return t('pageInfo', { from: deck.sourcePages.from, to: deck.sourcePages.to })
      }
      if (deck.sourceKind === 'images') return t('imageCount', { n: deck.imageCount || 0 })
      return t('textSource')
    }

    function Glyph({ name, size = 18, strokeWidth = 1.8 }) {
      const common = {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        focusable: false,
      }
      const paths = {
        plus: ['M12 5v14', 'M5 12h14'],
        arrowLeft: ['M15 18l-6-6 6-6'],
        arrowRight: ['M9 18l6-6-6-6'],
        chevronRight: ['M9 18l6-6-6-6'],
        pdf: ['M7 3h7l4 4v14H7z', 'M14 3v5h5', 'M9.5 14h5', 'M9.5 17h3.5'],
        image: ['M4 5h16v14H4z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M4 16l4.5-4.5L14 17l2.5-2.5L20 18'],
        text: ['M5 6h14', 'M5 10h14', 'M5 14h9', 'M5 18h6'],
        trash: ['M4 7h16', 'M9 7V4h6v3', 'M6 7l1 13h10l1-13', 'M10 11v5', 'M14 11v5'],
        close: ['M6 6l12 12', 'M18 6L6 18'],
        check: ['M5 12.5l4.5 4.5L19 7'],
        x: ['M7 7l10 10', 'M17 7L7 17'],
        book: ['M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z', 'M4 5.5v16', 'M8 7h8', 'M8 10h6'],
        target: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'],
        refresh: ['M20 7v5h-5', 'M4 17v-5h5', 'M6.1 8.5A7 7 0 0 1 18.5 7', 'M17.9 15.5A7 7 0 0 1 5.5 17'],
        eye: ['M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
        eyeOff: ['M3 3l18 18', 'M10.6 6.1A9.9 9.9 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.2 3.8', 'M6.3 7.6A16.8 16.8 0 0 0 2.5 12S6 18 12 18a10 10 0 0 0 4.1-.9'],
        upload: ['M12 16V4', 'M7 9l5-5 5 5', 'M5 20h14'],
        cards: ['M8 3h11v14H8z', 'M5 6v15h11'],
        clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7v5l3 2'],
        spark: ['M12 2.5l1.9 5.2 5.2 1.9-5.2 1.9L12 16.7l-1.9-5.2L4.9 9.6l5.2-1.9z', 'M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9z'],
        play: ['M8 5l11 7-11 7z'],
        pen: ['M4 20l4.5-1 10-10-3.5-3.5-10 10z', 'M13.5 6.5l3.5 3.5'],
        brain: ['M9.5 4.5a3 3 0 0 0-4.5 2.7 3.2 3.2 0 0 0-1.5 5.7A3.5 3.5 0 0 0 7 18.5a3 3 0 0 0 4.5 1.6', 'M14.5 4.5a3 3 0 0 1 4.5 2.7 3.2 3.2 0 0 1 1.5 5.7 3.5 3.5 0 0 1-3.5 5.6 3 3 0 0 1-4.5 1.6', 'M12 4v16'],
        layers: ['M12 3l9 5-9 5-9-5z', 'M3 12l9 5 9-5', 'M3 16l9 5 9-5'],
      }
      const selected = paths[name] ?? paths.cards
      return h('svg', common, ...selected.map((d, index) => h('path', { key: index, d })))
    }
