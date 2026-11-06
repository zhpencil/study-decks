    function ModelStatus({ state }) {
      const { t } = useCopy()
      if (state.status === 'loading') {
        return h('span', { className: 'sd-chip' }, h('span', { className: 'sd-dot' }), t('modelChip', { model: '…' }))
      }
      if (state.status === 'error') {
        return h('span', { className: 'sd-chip warn' }, h('span', { className: 'sd-dot' }), t('offline'))
      }
      const vision = state.images === true ? t('visionYes') : state.images === false ? t('visionNo') : t('visionUnknown')
      return h(
        'span',
        { className: `sd-chip ${state.images === true ? 'success' : state.images === false ? 'warn' : ''}` },
        h('span', { className: 'sd-dot' }),
        t('modelChip', { model: state.modelName || state.model || 'AI' }),
        h('span', { style: { opacity: 0.6 } }, '·'),
        vision,
      )
    }

    function DeckCard({ deck, wrongCount, onOpen, onDelete }) {
      const { lang, t } = useCopy()
      const stats = deckStats(deck)
      const accuracy = accuracyOf(stats)
      const source = deckSourceLabel(deck, t)
      return h(
        'article',
        {
          className: 'sd-deck-card',
          role: 'button',
          tabIndex: 0,
          onClick: onOpen,
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onOpen()
            }
          },
          'aria-label': deck.title,
        },
        h(
          'div',
          { className: 'sd-card-menu' },
          h(
            'button',
            {
              type: 'button',
              className: 'sd-btn icon danger',
              title: t('delete'),
              'aria-label': t('delete'),
              onClick: (event) => {
                event.stopPropagation()
                onDelete()
              },
              onKeyDown: (event) => event.stopPropagation(),
            },
            h(Glyph, { name: 'trash', size: 14 }),
          ),
        ),
        h('div', { className: 'sd-deck-title' }, deck.title),
        h('div', { className: 'sd-deck-source' }, source, deck.sourceName ? ` · ${deck.sourceName}` : ''),
        h(
          'div',
          { className: 'sd-deck-meta' },
          h('span', { className: 'sd-tag' }, h(Glyph, { name: 'cards', size: 12 }), t('quizUnit', { n: deck.quizzes.length })),
          wrongCount > 0 ? h('span', { className: 'sd-tag', style: { color: 'var(--dsw-alias-state-error-primary,#c43a3a)' } }, t('wrongCount'), ` ${wrongCount}`) : null,
          stats.attempts > 0 ? h('span', { className: 'sd-tag' }, `${accuracy}% ${t('accuracy')}`) : null,
        ),
        h(
          'div',
          { className: 'sd-deck-footer' },
          h(
            'div',
            { className: 'sd-deck-progress' },
            h('div', { className: 'sd-bar' }, h('i', { style: { width: `${accuracy}%` } })),
            h('small', null, stats.attempts > 0 ? `${t('lastAt', { date: formatRelative(stats.lastAt, lang) })}` : t('never')),
          ),
          h(Glyph, { name: 'chevronRight', size: 15 }),
        ),
      )
    }

    function HomeView({ db, onCreate, onOpen, onDelete, onWrong }) {
      const { lang, t } = useCopy()
      const allWrong = wrongItems(db)
      const summary = wrongStats(allWrong)
      const totalQuizzes = db.decks.reduce((sum, deck) => sum + deck.quizzes.length, 0)
      const allStats = db.decks.reduce(
        (acc, deck) => {
          const stats = deckStats(deck)
          acc.attempts += stats.attempts
          acc.correct += stats.correct
          return acc
        },
        { attempts: 0, correct: 0 },
      )
      const accuracy = allStats.attempts ? Math.round((allStats.correct / allStats.attempts) * 100) : 0
      return h(
        React.Fragment,
        null,
        h(
          'section',
          { className: 'sd-hero' },
          h('div', { className: 'sd-eyebrow' }, h(Glyph, { name: 'spark', size: 13 }), t('tagline')),
          h('h1', null, t('heroTitle')),
          h('p', null, t('heroSubtitle')),
          h(
            'div',
            { className: 'sd-hero-actions' },
            h('button', { type: 'button', className: 'sd-btn primary', onClick: onCreate }, h(Glyph, { name: 'plus', size: 15 }), t('newDeck')),
            allWrong.length > 0
              ? h('button', { type: 'button', className: 'sd-btn ghost', onClick: onWrong }, h(Glyph, { name: 'book', size: 15 }), t('wrongBook'), ` · ${summary.active}`)
              : null,
          ),
          h(
            'div',
            { className: 'sd-stat-row' },
            h('div', { className: 'sd-stat' }, h('strong', null, db.decks.length), h('span', null, t('cards'))),
            h('div', { className: 'sd-stat' }, h('strong', null, totalQuizzes), h('span', null, t('totalQuizzes'))),
            h('div', { className: 'sd-stat' }, h('strong', null, `${accuracy}%`), h('span', null, t('accuracy'))),
            h('div', { className: 'sd-stat' }, h('strong', null, summary.active), h('span', null, t('toReview'))),
          ),
        ),
        h(
          'div',
          { className: 'sd-section-head' },
          h('h2', null, t('cards')),
          h('span', null, t('deckUnit', { n: db.decks.length })),
        ),
        db.decks.length === 0
          ? h(
              'div',
              { className: 'sd-empty' },
              h('div', { className: 'sd-empty-icon' }, h(Glyph, { name: 'layers', size: 26 })),
              h('h3', null, t('emptyTitle')),
              h('p', null, t('emptySubtitle')),
              h('button', { type: 'button', className: 'sd-btn primary', onClick: onCreate }, h(Glyph, { name: 'plus', size: 15 }), t('emptyCta')),
            )
          : h(
              'div',
              { className: 'sd-deck-grid' },
              ...db.decks.map((deck) =>
                h(DeckCard, {
                  key: deck.id,
                  deck,
                  wrongCount: allWrong.filter((item) => item.deckId === deck.id && !item.mastered).length,
                  onOpen: () => onOpen(deck),
                  onDelete: () => onDelete(deck),
                }),
              ),
            ),
      )
    }

    function CreateView({ onBack, onCreated, notify }) {
      const { t } = useCopy()
      const [tab, setTab] = useState('pdf')
      const [pdfFile, setPdfFile] = useState(null)
      const [pageFrom, setPageFrom] = useState('')
      const [pageTo, setPageTo] = useState('')
      const [images, setImages] = useState([])
      const [text, setText] = useState('')
      const [textFileName, setTextFileName] = useState('')
      const [title, setTitle] = useState('')
      const [busy, setBusy] = useState(false)
      const [stage, setStage] = useState('')
      const [progress, setProgress] = useState({ done: 0, total: 0 })
      const [warnings, setWarnings] = useState([])
      const [error, setError] = useState('')
      const abortRef = useRef(null)

      const previews = useMemo(
        () => images.map((file) => ({ file, url: URL.createObjectURL(file) })),
        [images],
      )

      useEffect(() => {
        return () => {
          for (const preview of previews) URL.revokeObjectURL(preview.url)
        }
      }, [previews])

      useEffect(() => {
        return () => {
          abortRef.current?.abort()
        }
      }, [])

      const choosePdf = (event) => {
        const file = event.target.files?.[0]
        event.target.value = ''
        if (!file) return
        if (file.type !== 'application/pdf' && !/\.pdf$/i.test(file.name)) {
          notify(t('needPdf'), 'warn')
          return
        }
        setPdfFile(file)
        if (!title.trim()) setTitle(titleFromFile(file.name))
      }

      const dropPdf = (event) => {
        event.preventDefault()
        const file = event.dataTransfer?.files?.[0]
        if (!file) return
        if (file.type !== 'application/pdf' && !/\.pdf$/i.test(file.name)) {
          notify(t('needPdf'), 'warn')
          return
        }
        setPdfFile(file)
        if (!title.trim()) setTitle(titleFromFile(file.name))
      }

      const addImageFiles = (incoming) => {
        const candidates = [...(incoming ?? [])].filter((file) => file.type.startsWith('image/'))
        if (!candidates.length) {
          notify(t('imageSkipped'), 'warn')
          return
        }
        const usable = candidates.filter((file) => file.size <= 12 * 1024 * 1024)
        if (usable.length < candidates.length) notify(t('imageSkipped'), 'warn')
        if (!usable.length) return
        const remaining = Math.max(0, 10 - images.length)
        if (remaining === 0) {
          notify(t('imageLimit'), 'warn')
          return
        }
        const accepted = usable.slice(0, remaining)
        if (usable.length > remaining) notify(t('imageLimit'), 'warn')
        setImages((current) => [...current, ...accepted].slice(0, 10))
        if (!title.trim()) setTitle(titleFromFile(accepted[0].name))
      }

      const chooseImages = (event) => {
        const files = [...(event.target.files ?? [])]
        event.target.value = ''
        addImageFiles(files)
      }

      const dropImages = (event) => {
        event.preventDefault()
        addImageFiles([...(event.dataTransfer?.files ?? [])])
      }

      const chooseTextFile = async (event) => {
        const file = event.target.files?.[0]
        event.target.value = ''
        if (!file) return
        try {
          const content = await fileToText(file)
          setText(content)
          setTextFileName(file.name)
          if (!title.trim()) setTitle(titleFromFile(file.name))
        } catch (readError) {
          setError(readError instanceof Error ? readError.message : String(readError))
        }
      }

      const generate = async () => {
        if (busy) return
        setError('')
        setWarnings([])
        const controller = new AbortController()
        abortRef.current = controller
        try {
          if (tab === 'pdf' && !pdfFile) throw new Error(t('needPdf'))
          if (tab === 'images' && images.length === 0) throw new Error(t('needImages'))
          if (tab === 'text' && !text.trim()) throw new Error(t('needContent'))

          setBusy(true)
          let markdown = ''
          let sourceName = ''
          let sourcePages = null
          let imageCount = 0
          const collectedWarnings = []
          const fallbackTitle = title.trim() || (tab === 'pdf' ? titleFromFile(pdfFile?.name) : tab === 'images' ? titleFromFile(images[0]?.name) : titleFromFile(textFileName)) || t('studyMaterial')

          if (tab === 'pdf') {
            setStage('extract')
            setProgress({ done: 0, total: 0 })
            const data = await fileToBase64(pdfFile)
            const result = await callHost(
              'extractPdf',
              {
                data,
                title: fallbackTitle,
                pageFrom: pageFrom === '' ? undefined : Number(pageFrom),
                pageTo: pageTo === '' ? undefined : Number(pageTo),
              },
              controller.signal,
            )
            markdown = result.markdown
            sourceName = pdfFile.name
            sourcePages = { from: result.from, to: result.to }
            if (Array.isArray(result.warnings)) collectedWarnings.push(...result.warnings)
          } else if (tab === 'images') {
            setStage('ocr')
            setProgress({ done: 0, total: images.length })
            const payloads = []
            for (let index = 0; index < images.length; index += 1) {
              const file = images[index]
              payloads.push({
                name: file.name,
                mediaType: file.type || 'image/jpeg',
                data: await fileToBase64(file),
              })
              setProgress({ done: index + 1, total: images.length })
            }
            const result = await callHost('ocrImages', { images: payloads, title: fallbackTitle }, controller.signal)
            markdown = result.markdown
            sourceName = images.map((file) => file.name).join(', ')
            imageCount = images.length
            if (Array.isArray(result.warnings)) collectedWarnings.push(...result.warnings)
          } else {
            setStage('prepare')
            markdown = text
            sourceName = textFileName || t('textSource')
          }

          setStage('prepare')
          const chunks = splitStudyText(markdown)
          if (chunks.length === 0) throw new Error(t('needContent'))
          if (chunks.length > MAX_CHUNKS) throw new Error(t('materialTooLong', { n: chunks.length }))
          setProgress({ done: 0, total: chunks.length })
          setStage('quiz')

          const quizzes = []
          const seen = new Set()
          let suggestedTitle = ''
          for (let index = 0; index < chunks.length; index += 1) {
            if (controller.signal.aborted) throw new Error('aborted')
            const chunk = chunks[index]
            const language = /[\u3400-\u9fff]/.test(chunk) ? '中文' : 'English'
            const result = await callHost(
              'generate',
              {
                text: chunk,
                title: title.trim(),
                index: index + 1,
                total: chunks.length,
                language,
              },
              controller.signal,
            )
            if (!suggestedTitle && typeof result.suggestedTitle === 'string') {
              suggestedTitle = result.suggestedTitle.trim().slice(0, 120)
            }
            for (const quiz of result.quizzes ?? []) {
              const key = normalizeAnswer(String(quiz.stem ?? '').replace(/\{\{\s*\d+\s*\}\}/g, ''))
              if (!key || seen.has(key)) continue
              seen.add(key)
              quizzes.push(quiz)
            }
            setProgress({ done: index + 1, total: chunks.length })
          }
          if (quizzes.length === 0) throw new Error(t('noQuizzes'))

          setStage('save')
          const deck = {
            id: newId(),
            title: title.trim() || suggestedTitle || fallbackTitle,
            createdAt: Date.now(),
            sourceName,
            sourceKind: tab,
            sourcePages,
            imageCount,
            warnings: collectedWarnings,
            quizzes,
            stats: defaultStats(),
          }
          onCreated(deck)
        } catch (generateError) {
          if (controller.signal.aborted || generateError?.message === 'aborted') {
            notify(t('cancel'))
          } else {
            setError(generateError instanceof Error ? generateError.message : String(generateError))
          }
        } finally {
          setBusy(false)
          abortRef.current = null
        }
      }

      const stageLabel =
        stage === 'extract'
          ? t('stageExtract')
          : stage === 'ocr'
            ? t('stageOcr')
            : stage === 'prepare'
              ? t('stagePrepare')
              : stage === 'save'
                ? t('stageSave')
                : t('stageQuiz', { done: progress.done, total: progress.total })
      const percent = progress.total > 0 ? Math.min(100, Math.round((progress.done / progress.total) * 100)) : 8

      if (busy) {
        return h(
          'div',
          null,
          h('button', { type: 'button', className: 'sd-back', onClick: onBack }, h(Glyph, { name: 'arrowLeft', size: 13 }), t('back')),
          h(
            'div',
            { className: 'sd-progress-card' },
            h('div', { className: 'sd-spinner' }),
            h('h3', null, stageLabel),
            h('p', null, t('progressHint')),
            h('div', { className: 'sd-progress-bar' }, h('i', { style: { width: `${percent}%` } })),
            h('div', { style: { fontSize: 11.5, color: 'var(--dsw-alias-label-secondary,#697386)' } }, progress.total > 0 ? `${progress.done} / ${progress.total}` : ''),
            h(
              'button',
              {
                type: 'button',
                className: 'sd-btn ghost',
                style: { marginTop: 20 },
                onClick: () => {
                  abortRef.current?.abort()
                },
              },
              t('abort'),
            ),
            warnings.length > 0
              ? h('div', { className: 'sd-warning' }, warnings.map((warning, index) => h('div', { key: index }, warning)))
              : null,
            error ? h('div', { className: 'sd-error' }, error) : null,
          ),
        )
      }

      return h(
        'div',
        null,
        h('button', { type: 'button', className: 'sd-back', onClick: onBack }, h(Glyph, { name: 'arrowLeft', size: 13 }), t('back')),
        h(
          'div',
          { className: 'sd-page-head' },
          h('div', null, h('h1', null, t('importTitle')), h('p', null, t('importSubtitle'))),
        ),
        h(
          'div',
          { className: 'sd-panel sd-form' },
          h(
            'div',
            { className: 'sd-tabs', role: 'tablist' },
            h(
              'button',
              { type: 'button', role: 'tab', 'aria-selected': tab === 'pdf', className: `sd-tab ${tab === 'pdf' ? 'active' : ''}`, onClick: () => setTab('pdf') },
              h(Glyph, { name: 'pdf', size: 15 }),
              t('tabPdf'),
            ),
            h(
              'button',
              { type: 'button', role: 'tab', 'aria-selected': tab === 'images', className: `sd-tab ${tab === 'images' ? 'active' : ''}`, onClick: () => setTab('images') },
              h(Glyph, { name: 'image', size: 15 }),
              t('tabImages'),
            ),
            h(
              'button',
              { type: 'button', role: 'tab', 'aria-selected': tab === 'text', className: `sd-tab ${tab === 'text' ? 'active' : ''}`, onClick: () => setTab('text') },
              h(Glyph, { name: 'text', size: 15 }),
              t('tabText'),
            ),
          ),
          tab === 'pdf'
            ? h(
                React.Fragment,
                null,
                h('p', { className: 'sd-help' }, t('pdfHelp')),
                pdfFile
                  ? h(
                      React.Fragment,
                      null,
                      h(
                        'div',
                        { className: 'sd-file-row' },
                        h('div', { className: 'sd-file-icon' }, h(Glyph, { name: 'pdf', size: 18 })),
                        h(
                          'div',
                          { className: 'sd-grow' },
                          h('div', { className: 'sd-file-name' }, pdfFile.name),
                          h('div', { className: 'sd-file-meta' }, `${Math.max(1, Math.round(pdfFile.size / 1024))} KB`),
                        ),
                        h(
                          'div',
                          { className: 'sd-file-actions' },
                          h(
                            'label',
                            { className: 'sd-btn ghost sm' },
                            t('change'),
                            h('input', { type: 'file', accept: '.pdf,application/pdf', hidden: true, onChange: choosePdf }),
                          ),
                          h(
                            'button',
                            { type: 'button', className: 'sd-btn icon ghost', 'aria-label': t('removeFile'), onClick: () => setPdfFile(null) },
                            h(Glyph, { name: 'close', size: 14 }),
                          ),
                        ),
                      ),
                      h(
                        'div',
                        { className: 'sd-range-card' },
                        h(
                          'div',
                          { className: 'sd-range-card-head' },
                          h('span', null, t('rangeOptional')),
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'sd-btn ghost sm',
                              onClick: () => {
                                setPageFrom('')
                                setPageTo('')
                              },
                            },
                            t('allPages'),
                          ),
                        ),
                        h(
                          'div',
                          { className: 'sd-range-fields' },
                          h(
                            'label',
                            { className: 'sd-range-field' },
                            h('span', null, t('pageFrom')),
                            h('input', {
                              className: 'sd-input',
                              type: 'number',
                              min: 1,
                              inputMode: 'numeric',
                              placeholder: '1',
                              value: pageFrom,
                              onChange: (event) => setPageFrom(event.target.value.replace(/[^\d]/g, '')),
                            }),
                          ),
                          h('span', { className: 'sd-range-dash' }, '—'),
                          h(
                            'label',
                            { className: 'sd-range-field' },
                            h('span', null, t('pageTo')),
                            h('input', {
                              className: 'sd-input',
                              type: 'number',
                              min: 1,
                              inputMode: 'numeric',
                              placeholder: t('allPages'),
                              value: pageTo,
                              onChange: (event) => setPageTo(event.target.value.replace(/[^\d]/g, '')),
                            }),
                          ),
                        ),
                        h('p', { className: 'sd-help', style: { margin: '8px 0 0' } }, t('pageRangeHint')),
                      ),
                    )
                  : h(
                      'label',
                      {
                        className: 'sd-drop',
                        onDragOver: (event) => event.preventDefault(),
                        onDrop: dropPdf,
                      },
                      h('div', { className: 'sd-drop-icon' }, h(Glyph, { name: 'upload', size: 21 })),
                      h('strong', null, t('choosePdf')),
                      h('span', null, t('pdfDropHint')),
                      h('input', { type: 'file', accept: '.pdf,application/pdf', hidden: true, onChange: choosePdf }),
                    ),
              )
            : tab === 'images'
              ? h(
                  React.Fragment,
                  null,
                  h('p', { className: 'sd-help' }, t('imagesHelp')),
                  images.length === 0
                    ? h(
                        'label',
                        {
                          className: 'sd-drop',
                          onDragOver: (event) => event.preventDefault(),
                          onDrop: dropImages,
                        },
                        h('div', { className: 'sd-drop-icon' }, h(Glyph, { name: 'image', size: 21 })),
                        h('strong', null, t('chooseImages')),
                        h('span', null, t('imagesDropHint')),
                        h('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp,image/gif', multiple: true, hidden: true, onChange: chooseImages }),
                      )
                    : null,
                  images.length > 0
                    ? h(
                        React.Fragment,
                        null,
                        h(
                          'div',
                          { className: 'sd-image-head' },
                          h('span', null, t('imagesChosen', { n: images.length })),
                          h('span', null, t('imagesDropHint')),
                        ),
                        h(
                          'div',
                          { className: 'sd-image-grid' },
                          ...previews.map((preview, index) =>
                            h(
                              'div',
                              { className: 'sd-thumb', key: `${preview.file.name}-${index}` },
                              h('img', { src: preview.url, alt: preview.file.name, title: preview.file.name }),
                              h('span', { className: 'sd-thumb-index' }, index + 1),
                              h(
                                'button',
                                {
                                  type: 'button',
                                  'aria-label': `${t('removeFile')} ${preview.file.name}`,
                                  onClick: () => setImages((current) => current.filter((_, itemIndex) => itemIndex !== index)),
                                },
                                h(Glyph, { name: 'close', size: 11 }),
                              ),
                            ),
                          ),
                          images.length < 10
                            ? h(
                                'label',
                                {
                                  className: 'sd-thumb sd-thumb-add',
                                  onDragOver: (event) => event.preventDefault(),
                                  onDrop: dropImages,
                                },
                                h(Glyph, { name: 'plus', size: 18 }),
                                h('span', null, t('addImages')),
                                h('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp,image/gif', multiple: true, hidden: true, onChange: chooseImages }),
                              )
                            : null,
                        ),
                      )
                    : null,
                )
              : h(
                  React.Fragment,
                  null,
                  h('p', { className: 'sd-help' }, t('textHelp')),
                  h('textarea', {
                    className: 'sd-textarea',
                    placeholder: t('pastePlaceholder'),
                    value: text,
                    onChange: (event) => setText(event.target.value),
                  }),
                  h(
                    'div',
                    { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 8, flexWrap: 'wrap' } },
                    h(
                      'label',
                      { className: 'sd-btn ghost sm' },
                      h(Glyph, { name: 'upload', size: 13 }),
                      t('uploadText'),
                      h('input', { type: 'file', accept: '.md,.markdown,.txt,text/plain,text/markdown', hidden: true, onChange: chooseTextFile }),
                    ),
                    h('span', { className: 'sd-char' }, textFileName ? `${textFileName} · ` : '', `${text.length} chars`),
                  ),
                ),
          h(
            'label',
            { className: 'sd-field' },
            h('div', { className: 'sd-label' }, t('titleLabel'), h('small', null, t('titleHint'))),
            h('input', {
              className: 'sd-input',
              value: title,
              placeholder: t('titlePlaceholder'),
              maxLength: 120,
              onChange: (event) => setTitle(event.target.value),
            }),
          ),
          warnings.length > 0
            ? h('div', { className: 'sd-warning' }, warnings.map((warning, index) => h('div', { key: index }, warning)))
            : null,
          error ? h('div', { className: 'sd-error' }, h('strong', null, `${t('errorTitle')} · `), error) : null,
          h(
            'div',
            { className: 'sd-footer' },
            h('span', { className: 'sd-hint' }, t('importFooterHint')),
            h('button', { type: 'button', className: 'sd-btn ghost', onClick: onBack }, t('cancel')),
            h('button', { type: 'button', className: 'sd-btn primary', onClick: generate }, h(Glyph, { name: 'spark', size: 15 }), t('generate')),
          ),
        ),
      )
    }
