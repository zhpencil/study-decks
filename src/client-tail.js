    function PanelIcon({ size = 20, active = false }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-flex',
            width: size,
            height: size,
            alignItems: 'center',
            justifyContent: 'center',
            color: active ? 'var(--dsw-alias-brand-primary,#2f7cf6)' : 'currentColor',
          },
          'aria-hidden': true,
        },
        h(Glyph, { name: 'cards', size }),
      )
    }

    function StudyPanel() {
      const lang = useLang()
      const [db, setDb] = useState(loadDb)
      const [route, setRoute] = useState({ name: 'home' })
      const [toast, setToast] = useState(null)
      const [model, setModel] = useState({ status: 'loading' })
      const toastTimer = useRef(null)
      const t = useCallback((key, vars) => tr(lang, key, vars), [lang])

      useEffect(() => {
        if (!persistDb(db)) {
          setToast({ message: tr(lang, 'warnings'), tone: 'warn' })
        }
      }, [db, lang])

      useEffect(() => {
        let alive = true
        let timer
        const load = (attempt) => {
          callHost('status')
            .then((status) => {
              if (alive) setModel({ status: 'ok', ...status })
            })
            .catch(() => {
              if (!alive) return
              if (attempt < 4) timer = setTimeout(() => load(attempt + 1), 1200 * (attempt + 1))
              else setModel({ status: 'error' })
            })
        }
        load(0)
        return () => {
          alive = false
          if (timer) clearTimeout(timer)
        }
      }, [])

      useEffect(() => {
        return () => {
          if (toastTimer.current) clearTimeout(toastTimer.current)
        }
      }, [])

      const notify = useCallback(
        (message, tone = 'info') => {
          setToast({ message, tone })
          if (toastTimer.current) clearTimeout(toastTimer.current)
          toastTimer.current = setTimeout(() => setToast(null), 3200)
        },
        [setToast],
      )

      const recordAttempt = useCallback(
        (deckId, quiz, result, mode, answers) => {
          setDb((previous) => {
            const now = Date.now()
            const deck = previous.decks.find((item) => item.id === deckId)
            const decks = previous.decks.map((item) => {
              if (item.id !== deckId) return item
              const stats = { ...defaultStats(), ...(item.stats ?? {}) }
              stats.attempts += 1
              if (result === 'correct') stats.correct += 1
              else if (result === 'wrong') stats.wrong += 1
              else stats.skipped += 1
              stats.lastAt = now
              return { ...item, stats }
            })
            const key = `${deckId}:${quiz.id}`
            const existing = previous.wrong[key]
            if (result === 'correct' && !existing) return { ...previous, decks }
            const base = existing ?? {
              key,
              deckId,
              deckTitle: deck?.title ?? '',
              quiz,
              wrongCount: 0,
              skippedCount: 0,
              correctCount: 0,
              streak: 0,
              mastered: false,
              lastAt: now,
              lastMode: mode,
              lastAnswer: null,
            }
            const next = {
              ...base,
              quiz,
              deckTitle: deck?.title ?? base.deckTitle,
              lastAt: now,
              lastMode: mode,
              lastAnswer: Object.fromEntries(
                Object.entries(answers ?? {}).map(([blankIndex, value]) => [blankIndex, String(value).slice(0, 200)]),
              ),
            }
            if (result === 'wrong') {
              next.wrongCount = (base.wrongCount ?? 0) + 1
              next.streak = 0
              next.mastered = false
            } else if (result === 'skipped') {
              next.skippedCount = (base.skippedCount ?? 0) + 1
              next.streak = 0
              next.mastered = false
            } else {
              next.correctCount = (base.correctCount ?? 0) + 1
              next.streak = (base.streak ?? 0) + 1
              if (next.streak >= 2) next.mastered = true
            }
            return { ...previous, decks, wrong: { ...previous.wrong, [key]: next } }
          })
        },
        [setDb],
      )

      const markMastered = useCallback(
        (key, mastered) => {
          setDb((previous) => {
            const item = previous.wrong[key]
            if (!item) return previous
            return { ...previous, wrong: { ...previous.wrong, [key]: { ...item, mastered: Boolean(mastered), lastAt: Date.now() } } }
          })
        },
        [setDb],
      )

      const removeWrong = useCallback(
        (key) => {
          setDb((previous) => {
            if (!previous.wrong[key]) return previous
            const next = { ...previous.wrong }
            delete next[key]
            return { ...previous, wrong: next }
          })
        },
        [setDb],
      )

      const deleteDeck = useCallback(
        (deck) => {
          if (!deck) return
          if (!globalThis.confirm?.(t('deleteConfirm', { title: deck.title }))) return
          setDb((previous) => ({ ...previous, decks: previous.decks.filter((item) => item.id !== deck.id) }))
          setRoute((current) => (current.name === 'deck' && current.deckId === deck.id ? { name: 'home' } : current))
          notify(t('deleted'))
        },
        [notify, t],
      )

      const renameDeck = useCallback(
        (deck, title) => {
          const next = String(title ?? '').trim().slice(0, 120)
          if (!next) {
            notify(t('titleEmpty'), 'warn')
            return false
          }
          if (next === deck.title) return true
          setDb((previous) => ({
            ...previous,
            decks: previous.decks.map((item) => (item.id === deck.id ? { ...item, title: next } : item)),
            wrong: Object.fromEntries(
              Object.entries(previous.wrong).map(([key, item]) => [
                key,
                item.deckId === deck.id ? { ...item, deckTitle: next } : item,
              ]),
            ),
          }))
          notify(t('titleSaved'))
          return true
        },
        [notify, t],
      )

      const createDeck = useCallback(
        (rawDeck) => {
          const deck = sanitizeDeck(rawDeck)
          if (!deck) {
            notify(t('noQuizzes'), 'warn')
            return
          }
          setDb((previous) => ({ ...previous, decks: [deck, ...previous.decks].slice(0, 40) }))
          setRoute({ name: 'deck', deckId: deck.id })
          notify(t('generated'))
        },
        [notify, t],
      )

      const generateRevision = useCallback(async (deck, quiz, instruction) => {
        const result = await callHost('reviseQuiz', {
          quiz,
          instruction,
          title: deck.title,
          language: currentLang(),
        })
        const revised = sanitizeQuiz({ ...(result?.quiz ?? {}), id: quiz.id })
        if (!revised) throw new Error(tr(currentLang(), 'reviseFailed'))
        return revised
      }, [])

      const applyRevision = useCallback(
        (deck, revised) => {
          setDb((previous) => {
            const key = `${deck.id}:${revised.id}`
            const decks = previous.decks.map((item) =>
              item.id === deck.id
                ? { ...item, quizzes: item.quizzes.map((quiz) => (quiz.id === revised.id ? revised : quiz)) }
                : item,
            )
            const existing = previous.wrong[key]
            return {
              ...previous,
              decks,
              wrong: existing ? { ...previous.wrong, [key]: { ...existing, quiz: revised } } : previous.wrong,
            }
          })
          notify(t('reviseSaved'))
        },
        [notify, t],
      )

      const startDeckTest = useCallback((deck, mode) => {
        setRoute({
          name: 'test',
          items: deck.quizzes.map((quiz) => ({ deckId: deck.id, quiz })),
          mode,
          returnTo: { name: 'deck', deckId: deck.id },
        })
      }, [])

      const startWrongTest = useCallback(
        (items, mode) => {
          if (!items.length) return
          setRoute({
            name: 'test',
            items: items.map((item) => ({ deckId: item.deckId, quiz: item.quiz })),
            mode,
            returnTo: route.deckId ? { name: 'wrong', deckId: route.deckId } : { name: 'wrong' },
          })
        },
        [route.deckId],
      )

      const openWrong = useCallback((deckId) => {
        setRoute({ name: 'wrong', deckId })
      }, [])

      let content
      if (route.name === 'create') {
        content = h(CreateView, { onBack: () => setRoute({ name: 'home' }), onCreated: createDeck, notify })
      } else if (route.name === 'deck') {
        const deck = db.decks.find((item) => item.id === route.deckId)
        content = deck
          ? h(DeckView, {
              deck,
              db,
              onBack: () => setRoute({ name: 'home' }),
              onStart: startDeckTest,
              onWrong: openWrong,
              onDelete: deleteDeck,
              onRename: renameDeck,
              onGenerateRevision: generateRevision,
              onApplyRevision: applyRevision,
            })
          : h(
              'div',
              { className: 'sd-empty' },
              h('h3', null, t('notFound')),
              h('button', { type: 'button', className: 'sd-btn primary', onClick: () => setRoute({ name: 'home' }) }, t('backHome')),
            )
      } else if (route.name === 'test') {
        content = h(TestView, {
          items: route.items ?? [],
          mode: route.mode === 'hard' ? 'hard' : 'easy',
          returnTo: route.returnTo,
          onExit: () => setRoute(route.returnTo ?? { name: 'home' }),
          onRecord: recordAttempt,
          notify,
        })
      } else if (route.name === 'wrong') {
        const deck = route.deckId ? db.decks.find((item) => item.id === route.deckId) : null
        content = h(WrongBookView, {
          db,
          deckId: route.deckId,
          deckTitle: deck?.title,
          onBack: () => setRoute(route.deckId ? { name: 'deck', deckId: route.deckId } : { name: 'home' }),
          onRetest: startWrongTest,
          onReview: (keys) => setRoute({ name: 'review', keys, returnTo: route.deckId ? { name: 'wrong', deckId: route.deckId } : { name: 'wrong' } }),
          onMastered: markMastered,
          onRemove: (key) => {
            if (globalThis.confirm?.(t('removeWrong'))) {
              removeWrong(key)
              notify(t('removeWrong'))
            }
          },
        })
      } else if (route.name === 'review') {
        content = h(ReviewView, {
          keys: route.keys ?? [],
          db,
          onBack: () => setRoute(route.returnTo ?? { name: 'wrong' }),
          onMastered: markMastered,
          onRemove: (key) => {
            removeWrong(key)
            notify(t('removeWrong'))
          },
        })
      } else {
        content = h(HomeView, {
          db,
          onCreate: () => setRoute({ name: 'create' }),
          onOpen: (deck) => setRoute({ name: 'deck', deckId: deck.id }),
          onDelete: deleteDeck,
          onWrong: () => setRoute({ name: 'wrong' }),
        })
      }

      return h(
        CopyContext.Provider,
        { value: lang },
        h(
          'div',
          { className: 'sd-root' },
          h('style', null, CSS),
          h(
            'div',
            { className: 'sd-shell' },
            h(
              'header',
              { className: 'sd-top' },
              h(
                'div',
                { className: 'sd-brand' },
                h('div', { className: 'sd-mark' }, h(Glyph, { name: 'layers', size: 24, strokeWidth: 1.8 })),
                h('div', null, h('div', { className: 'sd-brand-name' }, t('brand')), h('div', { className: 'sd-brand-tag' }, t('tagline'))),
              ),
              h(
                'div',
                { className: 'sd-top-right' },
                h(ModelStatus, { state: model }),
                route.name !== 'create'
                  ? h(
                      'button',
                      { type: 'button', className: 'sd-btn primary', onClick: () => setRoute({ name: 'create' }) },
                      h(Glyph, { name: 'plus', size: 15 }),
                      t('newDeck'),
                    )
                  : null,
              ),
            ),
            content,
            toast
              ? h('div', { className: 'sd-toast', role: 'status', style: toast.tone === 'warn' ? { background: 'var(--dsw-alias-state-warn-primary,#a9660b)' } : undefined }, toast.message)
              : null,
          ),
        ),
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        connectionService = ctx.get('connection')
        layoutService = ctx.get('layout')
        localeService = ctx.get('locale')
        if (localeService) {
          ctx.effect(() => {
            const disposeZh = localeService.register('study-decks', 'zh', STRINGS.zh)
            const disposeEn = localeService.register('study-decks', 'en', STRINGS.en)
            return () => {
              disposeZh()
              disposeEn()
            }
          }, 'study-decks: locale')
        }
        ctx.slots.inject('main', () =>
          ctx.slots.register(
            {
              name: 'main',
              key: 'study-decks',
            },
            StudyPanel,
          ),
        )
        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: 'study-decks',
              order: 20,
              label: () => tr(currentLang(), 'nav'),
            },
            PanelIcon,
          ),
        )
      },
    }
  },
})
