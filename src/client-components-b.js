    function ClozePreview({ quiz, hoverAnswers = false, revealAll = false }) {
      const nodes = splitStem(quiz.stem)
      return h(
        React.Fragment,
        null,
        ...nodes.map((node, index) => {
          if (node.type === 'text') return h(React.Fragment, { key: index }, node.text)
          const blank = quiz.blanks[node.index]
          if (!blank) return h(React.Fragment, { key: index }, '____')
          const show = revealAll || hoverAnswers
          return h(
            'span',
            {
              key: index,
              className: `sd-blank ${hoverAnswers && !revealAll ? 'hover' : ''}`,
              'data-answer': hoverAnswers ? blank.answer : undefined,
              title: hoverAnswers ? blank.answer : undefined,
              tabIndex: hoverAnswers && !revealAll ? 0 : undefined,
              'aria-label': hoverAnswers ? `${blank.answer}（悬停可查看）` : undefined,
            },
            revealAll ? blank.answer : '____',
          )
        }),
      )
    }

    function ModeChoice({ selected, onSelect, compact = false }) {
      const { t } = useCopy()
      return h(
        'div',
        { className: 'sd-mode-grid', style: compact ? { marginTop: 0 } : undefined },
        h(
          'button',
          { type: 'button', className: `sd-mode-card ${selected === 'easy' ? 'active' : ''}`, onClick: () => onSelect('easy') },
          h('strong', null, h('span', { className: 'sd-mode-icon' }, h(Glyph, { name: 'check', size: 15 })), t('easy')),
          h('span', null, t('easyDesc')),
        ),
        h(
          'button',
          { type: 'button', className: `sd-mode-card ${selected === 'hard' ? 'active' : ''}`, onClick: () => onSelect('hard') },
          h('strong', null, h('span', { className: 'sd-mode-icon' }, h(Glyph, { name: 'pen', size: 15 })), t('hard')),
          h('span', null, t('hardDesc')),
        ),
      )
    }

    function ReviseDialog({ quiz, deckTitle, onGenerate, onApply, onClose }) {
      const { t } = useCopy()
      const [instruction, setInstruction] = useState('')
      const [candidate, setCandidate] = useState(null)
      const [busy, setBusy] = useState(false)
      const [error, setError] = useState('')

      useEffect(() => {
        const onKeyDown = (event) => {
          if (event.key === 'Escape' && !busy) onClose()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
      }, [busy, onClose])

      const run = async () => {
        if (busy) return
        setBusy(true)
        setError('')
        try {
          const base = candidate ?? quiz
          const revised = await onGenerate(base, instruction)
          setCandidate(revised)
        } catch (generateError) {
          setError(generateError instanceof Error ? generateError.message : String(generateError))
        } finally {
          setBusy(false)
        }
      }

      return h(
        'div',
        {
          className: 'sd-modal-backdrop',
          onMouseDown: (event) => {
            if (event.target === event.currentTarget && !busy) onClose()
          },
        },
        h(
          'div',
          { className: 'sd-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('reviseTitle') },
          h(
            'div',
            { className: 'sd-modal-head' },
            h('div', null, h('h2', null, t('reviseTitle')), h('p', null, t('reviseHint'))),
            h('button', { type: 'button', className: 'sd-btn icon ghost', 'aria-label': t('reviseClose'), disabled: busy, onClick: onClose }, h(Glyph, { name: 'close', size: 15 })),
          ),
          h(
            'div',
            { className: 'sd-modal-section' },
            h('h3', null, t('currentQuiz')),
            h('div', { className: 'sd-modal-quiz' }, h(ClozePreview, { quiz, hoverAnswers: true })),
            h(
              'div',
              { className: 'sd-revise-answer-list' },
              ...quiz.blanks.map((blank, index) => h('span', { key: index }, `${index + 1}. ${blank.answer}`)),
            ),
            quiz.source ? h('div', { className: 'sd-help', style: { marginTop: 7 } }, quiz.source) : null,
          ),
          h(
            'div',
            { className: 'sd-field' },
            h('div', { className: 'sd-label' }, t('yourInstruction')),
            h('textarea', {
              className: 'sd-textarea',
              style: { minHeight: 78 },
              placeholder: t('revisePlaceholder'),
              value: instruction,
              maxLength: 600,
              onChange: (event) => setInstruction(event.target.value),
            }),
          ),
          error ? h('div', { className: 'sd-error' }, h('strong', null, `${t('reviseFailed')} · `), error) : null,
          candidate
            ? h(
                'div',
                { className: 'sd-modal-section' },
                h('h3', null, t('newQuiz')),
                h('div', { className: 'sd-modal-quiz' }, h(ClozePreview, { quiz: candidate, hoverAnswers: true })),
                h(
                  'div',
                  { className: 'sd-revise-answer-list' },
                  ...candidate.blanks.map((blank, index) => h('span', { key: index }, `${index + 1}. ${blank.answer}`)),
                ),
                candidate.explanation ? h('div', { className: 'sd-help', style: { marginTop: 8 } }, candidate.explanation) : null,
                candidate.source ? h('div', { className: 'sd-help', style: { marginTop: 4 } }, candidate.source) : null,
              )
            : null,
          h(
            'div',
            { className: 'sd-modal-actions' },
            h('span', { className: 'sd-hint' }, deckTitle),
            h('button', { type: 'button', className: 'sd-btn ghost', disabled: busy, onClick: onClose }, t('reviseClose')),
            busy
              ? h('span', { className: 'sd-btn soft', style: { cursor: 'wait' } }, h('span', { className: 'sd-dot' }), t('reviseRunning'))
              : h(
                  'button',
                  { type: 'button', className: candidate ? 'sd-btn ghost' : 'sd-btn primary', onClick: run },
                  h(Glyph, { name: 'spark', size: 14 }),
                  candidate ? t('reviseAgain') : t('reviseRun'),
                ),
            candidate
              ? h('button', { type: 'button', className: 'sd-btn primary', disabled: busy, onClick: () => onApply(candidate) }, h(Glyph, { name: 'check', size: 14 }), t('applyRevision'))
              : null,
          ),
        ),
      )
    }

    function DeckView({ deck, db, onBack, onStart, onWrong, onDelete, onRename, onGenerateRevision, onApplyRevision }) {
      const { lang, t } = useCopy()
      const [mode, setMode] = useState('easy')
      const [reviseTarget, setReviseTarget] = useState(null)
      const [editingTitle, setEditingTitle] = useState(false)
      const [titleDraft, setTitleDraft] = useState(deck.title)
      const stats = deckStats(deck)

      useEffect(() => {
        setTitleDraft(deck.title)
      }, [deck.title])

      const saveTitle = () => {
        if (onRename(deck, titleDraft)) setEditingTitle(false)
      }
      const accuracy = accuracyOf(stats)
      const deckWrong = wrongItems(db, deck.id)
      const deckWrongActive = deckWrong.filter((item) => !item.mastered).length
      return h(
        'div',
        null,
        h('button', { type: 'button', className: 'sd-back', onClick: onBack }, h(Glyph, { name: 'arrowLeft', size: 13 }), t('backHome')),
        h(
          'section',
          { className: 'sd-deck-hero' },
          editingTitle
            ? h(
                'div',
                { className: 'sd-title-edit' },
                h('input', {
                  className: 'sd-input',
                  value: titleDraft,
                  maxLength: 120,
                  autoFocus: true,
                  'aria-label': t('editName'),
                  onChange: (event) => setTitleDraft(event.target.value),
                  onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      saveTitle()
                    } else if (event.key === 'Escape') {
                      setTitleDraft(deck.title)
                      setEditingTitle(false)
                    }
                  },
                }),
                h('button', { type: 'button', className: 'sd-btn primary sm', onClick: saveTitle }, h(Glyph, { name: 'check', size: 13 }), t('save')),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'sd-btn ghost sm',
                    onClick: () => {
                      setTitleDraft(deck.title)
                      setEditingTitle(false)
                    },
                  },
                  t('cancel'),
                ),
              )
            : h(
                'div',
                { className: 'sd-title-line' },
                h('h1', null, deck.title),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'sd-btn icon ghost',
                    title: t('rename'),
                    'aria-label': t('editName'),
                    onClick: () => {
                      setTitleDraft(deck.title)
                      setEditingTitle(true)
                    },
                  },
                  h(Glyph, { name: 'pen', size: 14 }),
                ),
              ),
          h(
            'div',
            { className: 'sd-meta-line' },
            h('span', null, deckSourceLabel(deck, t)),
            h('span', null, '·'),
            h('span', null, t('createdAt', { date: formatDate(deck.createdAt, lang) })),
            h('span', null, '·'),
            h('span', null, t('quizUnit', { n: deck.quizzes.length })),
          ),
          h(
            'div',
            { className: 'sd-actions' },
            h('button', { type: 'button', className: 'sd-btn primary', onClick: () => onStart(deck, mode) }, h(Glyph, { name: 'play', size: 14 }), t('startTest')),
            h('button', { type: 'button', className: 'sd-btn ghost', onClick: () => onWrong(deck.id) }, h(Glyph, { name: 'book', size: 14 }), t('wrongBook'), deckWrongActive > 0 ? ` · ${deckWrongActive}` : ''),
            h('button', { type: 'button', className: 'sd-btn danger', onClick: () => onDelete(deck) }, h(Glyph, { name: 'trash', size: 14 }), t('deleteDeck')),
          ),
        ),
        h(
          'div',
          { className: 'sd-detail-grid' },
          h(
            'div',
            null,
            h(
              'div',
              { className: 'sd-panel' },
              h('div', { style: { fontSize: 13, fontWeight: 680, marginBottom: 2 } }, t('chooseMode')),
              h('p', { className: 'sd-help', style: { marginTop: 3 } }, t('answerHidden')),
              h(ModeChoice, { selected: mode, onSelect: setMode }),
              h(
                'div',
                { style: { display: 'flex', justifyContent: 'flex-end', marginTop: 14 } },
                h('button', { type: 'button', className: 'sd-btn primary', onClick: () => onStart(deck, mode) }, h(Glyph, { name: 'play', size: 14 }), mode === 'easy' ? t('startEasy') : t('startHard')),
              ),
            ),
            deck.warnings?.length
              ? h('div', { className: 'sd-warning' }, h('strong', null, `${t('warnings')} · `), ...deck.warnings.map((warning, index) => h('div', { key: index }, warning)))
              : null,
            h('div', { className: 'sd-section-head' }, h('h2', null, t('quizPreview')), h('span', null, t('quizUnit', { n: deck.quizzes.length }))),
            h(
              'div',
              { className: 'sd-quiz-list' },
              ...deck.quizzes.slice(0, 40).map((quiz, index) =>
                h(
                  'div',
                  { className: 'sd-quiz-row', key: quiz.id },
                  h('div', { className: 'sd-quiz-num' }, String(index + 1).padStart(2, '0')),
                  h(
                    'div',
                    { style: { minWidth: 0 } },
                    h('div', { className: 'sd-quiz-stem' }, h(ClozePreview, { quiz })),
                    h('div', { className: 'sd-quiz-meta' }, quiz.tags?.length ? quiz.tags.join(' · ') : t('easyTag'), ' · ', `${quiz.blanks.length} ${t('blankLabel', { n: '' }).trim()}`),
                  ),
                  h(
                    'div',
                    { className: 'sd-quiz-action' },
                    h(
                      'button',
                      { type: 'button', className: 'sd-btn ghost sm', onClick: () => setReviseTarget(quiz) },
                      h(Glyph, { name: 'pen', size: 12 }),
                      t('reviseBlanks'),
                    ),
                  ),
                ),
              ),
            ),
            deck.quizzes.length > 40 ? h('p', { className: 'sd-help', style: { marginTop: 8 } }, `+${deck.quizzes.length - 40}`) : null,
          ),
          h(
            'aside',
            null,
            h(
              'div',
              { className: 'sd-side-card' },
              h('h3', null, t('history')),
              h('div', { className: 'sd-kv' }, h('span', null, t('totalQuizzes')), h('strong', null, deck.quizzes.length)),
              h('div', { className: 'sd-kv' }, h('span', null, t('accuracy')), h('strong', null, stats.attempts ? `${accuracy}%` : '—')),
              h('div', { className: 'sd-kv' }, h('span', null, t('wrongCount')), h('strong', null, deckWrong.length)),
              h('div', { className: 'sd-kv' }, h('span', null, t('toReview')), h('strong', null, deckWrongActive)),
              h('div', { className: 'sd-kv' }, h('span', null, t('lastTime')), h('strong', null, stats.lastAt ? formatRelative(stats.lastAt, lang) : '—')),
            ),
            h(
              'div',
              { className: 'sd-side-card' },
              h('h3', null, t('testHint')),
              h('p', { className: 'sd-help', style: { marginBottom: 0 } }, t('easyHint'), ' ', t('hardHint')),
            ),
          ),
        ),
        reviseTarget
          ? h(ReviseDialog, {
              quiz: reviseTarget,
              deckTitle: deck.title,
              onGenerate: (base, instruction) => onGenerateRevision(deck, base, instruction),
              onApply: (revised) => {
                onApplyRevision(deck, revised)
                setReviseTarget(null)
              },
              onClose: () => setReviseTarget(null),
            })
          : null,
      )
    }

    function TestView({ items, mode, returnTo, onExit, onRecord, notify }) {
      const { lang, t } = useCopy()
      const [index, setIndex] = useState(0)
      const [phase, setPhase] = useState('answer')
      const [answers, setAnswers] = useState({})
      const [checked, setChecked] = useState(null)
      const [results, setResults] = useState([])
      const [error, setError] = useState('')
      const [activeBlank, setActiveBlank] = useState(0)
      const [choiceReview, setChoiceReview] = useState(false)
      const inputRefs = useRef([])
      const topRef = useRef(null)
      const current = items[index]
      const quiz = current?.quiz

      useEffect(() => {
        inputRefs.current = []
        setActiveBlank(0)
        setChoiceReview(false)
      }, [index])

      useEffect(() => {
        topRef.current?.scrollIntoView?.({ block: 'nearest' })
      }, [index, phase])

      if (!quiz) {
        return h(
          'div',
          { className: 'sd-summary' },
          h('h2', null, t('emptyTest')),
          h('div', { className: 'sd-summary-actions' }, h('button', { type: 'button', className: 'sd-btn primary', onClick: onExit }, t('back'))),
        )
      }

      const modeTag = mode === 'easy' ? t('easy') : t('hard')
      const complete = quiz.blanks.every((_, blankIndex) => String(answers[blankIndex] ?? '').trim().length > 0)
      const currentBlank = Math.min(activeBlank, quiz.blanks.length - 1)

      const selectOption = (blankIndex, option) => {
        if (checked) return
        const nextAnswers = { ...answers, [blankIndex]: option }
        setAnswers(nextAnswers)
        setError('')
        const nextBlank = quiz.blanks.findIndex((_, index) => !String(nextAnswers[index] ?? '').trim())
        if (nextBlank >= 0) {
          setActiveBlank(nextBlank)
          setChoiceReview(false)
        } else {
          setChoiceReview(true)
        }
      }

      const submit = () => {
        if (!complete) {
          setError(t('answerAll'))
          return
        }
        setError('')
        const correct = quiz.blanks.every((blank, blankIndex) => answerIsCorrect(answers[blankIndex], blank.answer))
        onRecord(current.deckId, quiz, correct ? 'correct' : 'wrong', mode, answers)
        setChecked({ correct })
        setChoiceReview(true)
        setResults((currentResults) => [...currentResults, { result: correct ? 'correct' : 'wrong', quiz }])
        setPhase('feedback')
      }

      const next = () => {
        if (index + 1 >= items.length) {
          setPhase('summary')
          return
        }
        setIndex((currentIndex) => currentIndex + 1)
        setAnswers({})
        setChecked(null)
        setError('')
        setActiveBlank(0)
        setChoiceReview(false)
        setPhase('answer')
      }

      const skip = () => {
        onRecord(current.deckId, quiz, 'skipped', mode, answers)
        setResults((currentResults) => [...currentResults, { result: 'skipped', quiz }])
        if (index + 1 >= items.length) setPhase('summary')
        else {
          setIndex((currentIndex) => currentIndex + 1)
          setAnswers({})
          setChecked(null)
          setError('')
          setActiveBlank(0)
          setChoiceReview(false)
          setPhase('answer')
        }
      }

      if (phase === 'summary') {
        const correct = results.filter((item) => item.result === 'correct').length
        const wrong = results.filter((item) => item.result === 'wrong').length
        const skipped = results.filter((item) => item.result === 'skipped').length
        return h(
          'div',
          { className: 'sd-summary' },
          h('div', { className: 'sd-summary-icon' }, h(Glyph, { name: 'target', size: 29 })),
          h('h2', null, t('resultTitle')),
          h('p', null, t('resultScore', { correct, total: results.length })),
          h(
            'div',
            { className: 'sd-summary-grid' },
            h('div', { className: 'sd-summary-cell good' }, h('strong', null, correct), h('span', null, t('summaryCorrect'))),
            h('div', { className: 'sd-summary-cell bad' }, h('strong', null, wrong), h('span', null, t('summaryWrong'))),
            h('div', { className: 'sd-summary-cell' }, h('strong', null, skipped), h('span', null, t('summarySkipped'))),
          ),
          h('p', { style: { marginTop: 14 } }, `${t('resultWrong', { n: wrong + skipped })} · ${t('resultSkipped', { n: skipped })}`),
          h(
            'div',
            { className: 'sd-summary-actions' },
            h(
              'button',
              {
                type: 'button',
                className: 'sd-btn primary',
                onClick: () => {
                  setIndex(0)
                  setAnswers({})
                  setChecked(null)
                  setResults([])
                  setError('')
                  setActiveBlank(0)
                  setChoiceReview(false)
                  setPhase('answer')
                },
              },
              h(Glyph, { name: 'refresh', size: 14 }),
              t('testAgain'),
            ),
            h('button', { type: 'button', className: 'sd-btn ghost', onClick: onExit }, returnTo?.name === 'wrong' ? t('backWrong') : t('backToDeck')),
          ),
        )
      }

      const renderBlank = (node, blankIndex) => {
        const blank = quiz.blanks[blankIndex]
        if (!blank) return h(React.Fragment, { key: `missing-${blankIndex}` }, '____')
        if (mode === 'easy') {
          const value = answers[blankIndex] ?? ''
          const isCorrect = checked && value === blank.answer
          return h(
            'span',
            {
              key: `blank-${blankIndex}`,
              className: `sd-blank ${checked ? (isCorrect ? 'correct' : 'bad') : 'editable'}`,
              style: { maxWidth: 210, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
              role: checked ? undefined : 'button',
              tabIndex: checked ? undefined : 0,
              'aria-label': t('pickAnswer', { n: blankIndex + 1 }),
              onClick: () => {
                if (checked) return
                setChoiceReview(false)
                setActiveBlank(blankIndex)
              },
              onKeyDown: (event) => {
                if (checked || (event.key !== 'Enter' && event.key !== ' ')) return
                event.preventDefault()
                setChoiceReview(false)
                setActiveBlank(blankIndex)
              },
            },
            value || '?',
          )
        }
        const value = answers[blankIndex] ?? ''
        const isCorrect = checked && answerIsCorrect(value, blank.answer)
        return h('input', {
          key: `blank-${blankIndex}`,
          ref: (element) => {
            inputRefs.current[blankIndex] = element
          },
          className: `sd-input-blank ${checked ? (isCorrect ? 'correct' : 'bad') : ''}`,
          style: { width: Math.max(100, Math.min(260, (blank.answer.length + 2) * 14)) },
          value,
          placeholder: t('typeAnswer'),
          readOnly: Boolean(checked),
          'aria-label': t('blankLabel', { n: blankIndex + 1 }),
          onChange: (event) => {
            if (checked) return
            const nextValue = event.target.value
            setAnswers((currentAnswers) => ({ ...currentAnswers, [blankIndex]: nextValue }))
          },
          onKeyDown: (event) => {
            if (event.key !== 'Enter') return
            event.preventDefault()
            if (blankIndex + 1 < quiz.blanks.length) inputRefs.current[blankIndex + 1]?.focus()
            else if (!checked) submit()
          },
        })
      }

      return h(
        'div',
        { className: 'sd-test-wrap', ref: topRef },
        h(
          'div',
          { className: 'sd-test-top' },
          h(
            'div',
            { className: 'sd-test-info' },
            h('span', null, t('questionProgress', { current: index + 1, total: items.length })),
            h('span', { className: 'sd-mini-bar' }, h('i', { style: { width: `${Math.round(((index + 1) / items.length) * 100)}%` } })),
            h('span', { className: 'sd-tag' }, modeTag),
          ),
          h('button', { type: 'button', className: 'sd-btn ghost sm', onClick: onExit }, t('exit')),
        ),
        h(
          'div',
          { className: 'sd-quiz-card' },
          h(
            'div',
            { className: 'sd-quiz-kicker' },
            h(Glyph, { name: mode === 'easy' ? 'check' : 'pen', size: 14 }),
            mode === 'easy' ? t('easyHint') : t('hardHint'),
          ),
          h(
            'div',
            { className: 'sd-question' },
            ...splitStem(quiz.stem).map((node, nodeIndex) =>
              node.type === 'text' ? h(React.Fragment, { key: nodeIndex }, node.text) : renderBlank(node, node.index),
            ),
          ),
          mode === 'easy'
            ? choiceReview && complete
              ? h(
                  'div',
                  { className: 'sd-choice-review' },
                  h(
                    'div',
                    { className: 'sd-choice-review-head' },
                    h('strong', null, t('choiceDone')),
                    h('span', { className: 'sd-help', style: { margin: 0 } }, t('selectedAnswers')),
                  ),
                  h(
                    'div',
                    { className: 'sd-choice-list' },
                    ...quiz.blanks.map((blank, blankIndex) =>
                      h(
                        'div',
                        { className: 'sd-choice-line', key: blankIndex },
                        h('small', null, t('blankLabel', { n: blankIndex + 1 })),
                        h('span', null, answers[blankIndex] ?? ''),
                        h(
                          'button',
                          {
                            type: 'button',
                            className: 'sd-btn ghost sm',
                            onClick: () => {
                              setChoiceReview(false)
                              setActiveBlank(blankIndex)
                            },
                          },
                          t('changeChoice'),
                        ),
                      ),
                    ),
                  ),
                )
              : h(
                  'div',
                  { className: 'sd-answer-groups' },
                  h(
                    'div',
                    { className: 'sd-choice-step' },
                    h(
                      'div',
                      { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                      h('strong', null, t('choiceStep', { current: currentBlank + 1, total: quiz.blanks.length })),
                      h(
                        'span',
                        { className: 'sd-choice-dots' },
                        ...quiz.blanks.map((_, dotIndex) =>
                          h('span', {
                            key: dotIndex,
                            className: `sd-choice-dot ${answers[dotIndex] ? 'done' : dotIndex === currentBlank ? 'active' : ''}`,
                          }),
                        ),
                      ),
                    ),
                    currentBlank > 0
                      ? h(
                          'button',
                          {
                            type: 'button',
                            className: 'sd-btn ghost sm',
                            onClick: () => {
                              setChoiceReview(false)
                              setActiveBlank(currentBlank - 1)
                            },
                          },
                          t('backBlank'),
                        )
                      : null,
                  ),
                  (() => {
                    const blank = quiz.blanks[currentBlank]
                    const selected = answers[currentBlank] ?? ''
                    const options = seededShuffle(
                      blank.options?.length ? blank.options : [blank.answer],
                      `${quiz.id}:${currentBlank}`,
                    )
                    return h(
                      'div',
                      { className: 'sd-answer-group', style: { borderTop: 0, paddingTop: 0 } },
                      h('div', { className: 'sd-answer-label' }, t('pickAnswer', { n: currentBlank + 1 })),
                      h(
                        'div',
                        { className: 'sd-options' },
                        ...options.map((option, optionIndex) =>
                          h(
                            'button',
                            {
                              type: 'button',
                              key: `${optionIndex}-${option}`,
                              className: `sd-option ${selected === option ? 'selected' : ''}`,
                              'aria-pressed': selected === option,
                              onClick: () => selectOption(currentBlank, option),
                            },
                            h('span', { className: 'sd-option-key' }, String.fromCharCode(65 + optionIndex)),
                            h('span', null, option),
                          ),
                        ),
                      ),
                    )
                  })(),
                )
            : null,
          error ? h('div', { className: 'sd-error' }, error) : null,
          phase === 'feedback' && checked
            ? h(
                'div',
                { className: `sd-feedback ${checked.correct ? 'good' : 'bad'}` },
                h(
                  'div',
                  { className: 'sd-feedback-head' },
                  h(Glyph, { name: checked.correct ? 'check' : 'x', size: 15 }),
                  checked.correct ? t('correct') : t('wrong'),
                ),
                checked.correct
                  ? null
                  : h(
                      'div',
                      { className: 'sd-feedback-body' },
                      ...quiz.blanks.map((blank, blankIndex) =>
                        h(
                          'p',
                          { key: blankIndex },
                          h('span', { className: 'sd-fb-label' }, t('blankLabel', { n: blankIndex + 1 })),
                          h('span', null, `${t('yourAnswer')}: ${answers[blankIndex] || '—'}　`),
                          h('span', { className: 'sd-answer-pill' }, blank.answer),
                        ),
                      ),
                    ),
                quiz.explanation
                  ? h('div', { className: 'sd-feedback-body' }, h('p', null, h('span', { className: 'sd-fb-label' }, t('explanation')), quiz.explanation))
                  : null,
                quiz.source
                  ? h('div', { className: 'sd-feedback-body' }, h('p', null, h('span', { className: 'sd-fb-label' }, t('sourceText')), quiz.source))
                  : null,
              )
            : null,
          h(
            'div',
            { className: 'sd-test-actions' },
            h(
              'div',
              { className: 'sd-left' },
              h('button', { type: 'button', className: 'sd-btn ghost', onClick: onExit }, t('exit')),
            ),
            h(
              'div',
              { className: 'sd-right' },
              phase === 'answer'
                ? h(
                    React.Fragment,
                    null,
                    h('button', { type: 'button', className: 'sd-btn ghost', onClick: skip }, t('skip')),
                    h('button', { type: 'button', className: 'sd-btn primary', onClick: submit }, t('submit')),
                  )
                : h('button', { type: 'button', className: 'sd-btn primary', onClick: next }, index + 1 >= items.length ? t('seeResult') : t('next')),
            ),
          ),
        ),
      )
    }

    function WrongBookView({ db, deckId, deckTitle, onBack, onRetest, onReview, onMastered, onRemove }) {
      const { lang, t } = useCopy()
      const [filter, setFilter] = useState('todo')
      const [picker, setPicker] = useState(false)
      const [pickMode, setPickMode] = useState('easy')
      const all = wrongItems(db, deckId)
      const summary = wrongStats(all)
      const filtered = all.filter((item) => (filter === 'todo' ? !item.mastered : filter === 'mastered' ? item.mastered : true))
      const active = all.filter((item) => !item.mastered)
      return h(
        'div',
        null,
        h('button', { type: 'button', className: 'sd-back', onClick: onBack }, h(Glyph, { name: 'arrowLeft', size: 13 }), deckId ? t('backToDeck') : t('backHome')),
        h(
          'div',
          { className: 'sd-page-head' },
          h('div', null, h('h1', null, deckTitle ? `${t('wrongBook')} · ${deckTitle}` : t('allWrong')), h('p', null, t('wrongSubtitle'))),
          active.length > 0
            ? h(
                'button',
                { type: 'button', className: 'sd-btn primary', onClick: () => setPicker((current) => !current) },
                h(Glyph, { name: 'refresh', size: 14 }),
                t('retestWrong'),
              )
            : null,
        ),
        picker
          ? h(
              'div',
              { className: 'sd-panel', style: { marginBottom: 14 } },
              h('div', { className: 'sd-label' }, t('chooseMode')),
              h(ModeChoice, { selected: pickMode, onSelect: setPickMode, compact: true }),
              h(
                'div',
                { style: { display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 } },
                h('button', { type: 'button', className: 'sd-btn ghost', onClick: () => setPicker(false) }, t('cancel')),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'sd-btn primary',
                    onClick: () => {
                      setPicker(false)
                      onRetest(active, pickMode)
                    },
                  },
                  t('start'),
                ),
              ),
            )
          : null,
        h(
          'div',
          { className: 'sd-summary-grid', style: { marginBottom: 12 } },
          h('div', { className: 'sd-summary-cell' }, h('strong', null, summary.active), h('span', null, t('toReview'))),
          h('div', { className: 'sd-summary-cell' }, h('strong', null, `${summary.accuracy}%`), h('span', null, t('accuracy'))),
          h('div', { className: 'sd-summary-cell' }, h('strong', null, summary.mastered), h('span', null, t('mastered'))),
        ),
        h(
          'div',
          { className: 'sd-filter-row' },
          h('button', { type: 'button', className: `sd-filter ${filter === 'todo' ? 'active' : ''}`, onClick: () => setFilter('todo') }, `${t('filterTodo')} ${summary.active}`),
          h('button', { type: 'button', className: `sd-filter ${filter === 'all' ? 'active' : ''}`, onClick: () => setFilter('all') }, `${t('filterAll')} ${summary.total}`),
          h('button', { type: 'button', className: `sd-filter ${filter === 'mastered' ? 'active' : ''}`, onClick: () => setFilter('mastered') }, `${t('filterMastered')} ${summary.mastered}`),
          filtered.length > 0
            ? h(
                'button',
                {
                  type: 'button',
                  className: 'sd-btn ghost sm',
                  style: { marginLeft: 'auto' },
                  onClick: () => onReview(filtered.map((item) => item.key)),
                },
                h(Glyph, { name: 'eye', size: 13 }),
                t('review'),
              )
            : null,
        ),
        all.length === 0
          ? h(
              'div',
              { className: 'sd-empty' },
              h('div', { className: 'sd-empty-icon' }, h(Glyph, { name: 'book', size: 25 })),
              h('h3', null, deckTitle ? t('noWrongForDeck') : t('wrongEmpty')),
              h('p', null, t('wrongEmptyHint')),
            )
          : filtered.length === 0
            ? h('p', { className: 'sd-help' }, t('wrongEmpty'))
            : h(
                'div',
                { className: 'sd-wrong-list' },
                ...filtered.map((item) =>
                  h(
                    'div',
                    { className: 'sd-wrong-row', key: item.key },
                    h(
                      'div',
                      { className: 'sd-wrong-main' },
                      h(
                        'div',
                        { className: 'sd-wrong-top' },
                        item.mastered ? h('span', { className: 'sd-badge good' }, t('mastered')) : h('span', { className: 'sd-badge warn' }, t('toReview')),
                        item.wrongCount > 0 ? h('span', { className: 'sd-badge bad' }, t('statsWrong', { n: item.wrongCount })) : null,
                        item.skippedCount > 0 ? h('span', { className: 'sd-badge warn' }, t('statsSkipped', { n: item.skippedCount })) : null,
                        item.correctCount > 0 ? h('span', { className: 'sd-badge good' }, t('statsCorrect', { n: item.correctCount })) : null,
                        !deckId && item.deckTitle ? h('span', { className: 'sd-badge' }, t('fromDeck', { title: item.deckTitle })) : null,
                      ),
                      h('div', { className: 'sd-wrong-stem' }, h(ClozePreview, { quiz: item.quiz, hoverAnswers: true })),
                      h(
                        'div',
                        { className: 'sd-wrong-meta' },
                        h('span', null, t('lastAt', { date: formatDate(item.lastAt, lang) })),
                        item.streak > 0 ? h('span', null, t('streak', { n: item.streak })) : null,
                        h('span', null, t('reviewHint')),
                      ),
                    ),
                    h(
                      'div',
                      { className: 'sd-wrong-actions' },
                      h('button', { type: 'button', className: 'sd-btn soft sm', onClick: () => onReview([item.key]) }, h(Glyph, { name: 'eye', size: 13 }), t('review')),
                      h(
                        'button',
                        { type: 'button', className: 'sd-btn ghost sm', onClick: () => onMastered(item.key, !item.mastered) },
                        item.mastered ? t('unmarkMastered') : t('markMastered'),
                      ),
                      h('button', { type: 'button', className: 'sd-btn ghost sm', onClick: () => onRemove(item.key) }, t('removeWrong')),
                    ),
                  ),
                ),
              ),
      )
    }

    function ReviewView({ keys, db, onBack, onMastered, onRemove }) {
      const { lang, t } = useCopy()
      const [index, setIndex] = useState(0)
      const [reveal, setReveal] = useState(false)
      const [done, setDone] = useState(false)
      const items = keys.map((key) => db.wrong[key]).filter(Boolean)
      const safeIndex = items.length ? Math.min(index, items.length - 1) : 0
      const item = items[safeIndex]
      const progress = items.length ? Math.round(((safeIndex + 1) / items.length) * 100) : 0

      if (!items.length) {
        return h(
          'div',
          { className: 'sd-summary' },
          h('h2', null, t('wrongEmpty')),
          h('div', { className: 'sd-summary-actions' }, h('button', { type: 'button', className: 'sd-btn primary', onClick: onBack }, t('backWrong'))),
        )
      }

      if (done) {
        return h(
          'div',
          { className: 'sd-summary' },
          h('div', { className: 'sd-summary-icon' }, h(Glyph, { name: 'check', size: 28 })),
          h('h2', null, t('reviewDone')),
          h('p', null, t('reviewProgress', { current: items.length, total: items.length })),
          h('div', { className: 'sd-summary-actions' }, h('button', { type: 'button', className: 'sd-btn primary', onClick: onBack }, t('backWrong'))),
        )
      }

      return h(
        'div',
        { className: 'sd-review-wrap' },
        h('button', { type: 'button', className: 'sd-back', onClick: onBack }, h(Glyph, { name: 'arrowLeft', size: 13 }), t('backWrong')),
        h(
          'div',
          { className: 'sd-test-top' },
          h(
            'div',
            { className: 'sd-test-info' },
            h('span', null, t('reviewing')),
            h('span', { className: 'sd-mini-bar' }, h('i', { style: { width: `${progress}%` } })),
            h('span', null, t('reviewProgress', { current: safeIndex + 1, total: items.length })),
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'sd-btn ghost sm',
              onClick: () => setReveal((current) => !current),
            },
            h(Glyph, { name: reveal ? 'eyeOff' : 'eye', size: 13 }),
            reveal ? t('hideAnswer') : t('revealAnswer'),
          ),
        ),
        h(
          'div',
          { className: 'sd-review-card' },
          h(
            'div',
            { className: 'sd-review-meta' },
            h('span', null, item.deckTitle || t('allWrong')),
            h('span', null, t('lastAt', { date: formatDate(item.lastAt, lang) })),
          ),
          h('div', { className: 'sd-question' }, h(ClozePreview, { quiz: item.quiz, hoverAnswers: !reveal, revealAll: reveal })),
          h(
            'div',
            { className: 'sd-review-answerbox' },
            reveal
              ? h(
                  React.Fragment,
                  null,
                  ...item.quiz.blanks.map((blank, blankIndex) =>
                    h(
                      'div',
                      { key: blankIndex, style: { marginTop: 3 } },
                      h('span', { style: { fontWeight: 600 } }, t('blankLabel', { n: blankIndex + 1 })),
                      ' ',
                      h('strong', null, blank.answer),
                    ),
                  ),
                  item.quiz.explanation ? h('div', { style: { marginTop: 10 } }, h('strong', null, `${t('explanation')}：`), item.quiz.explanation) : null,
                  item.quiz.source ? h('div', { style: { marginTop: 6 } }, h('strong', null, `${t('sourceText')}：`), item.quiz.source) : null,
                )
              : h('div', null, h(Glyph, { name: 'eye', size: 14 }), ' ', t('reviewHint')),
          ),
          h(
            'div',
            { className: 'sd-test-actions' },
            h(
              'div',
              { className: 'sd-left' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'sd-btn ghost',
                  disabled: safeIndex === 0,
                  onClick: () => {
                    setIndex((current) => Math.max(0, current - 1))
                    setReveal(false)
                  },
                },
                t('prev'),
              ),
              h(
                'button',
                { type: 'button', className: 'sd-btn ghost', onClick: () => onMastered(item.key, !item.mastered) },
                item.mastered ? t('unmarkMastered') : t('markMastered'),
              ),
            ),
            h(
              'div',
              { className: 'sd-right' },
              h('button', { type: 'button', className: 'sd-btn ghost', onClick: () => onRemove(item.key) }, t('removeWrong')),
              h(
                'button',
                {
                  type: 'button',
                  className: 'sd-btn primary',
                  onClick: () => {
                    if (safeIndex + 1 >= items.length) setDone(true)
                    else {
                      setIndex(safeIndex + 1)
                      setReveal(false)
                    }
                  },
                },
                index + 1 >= items.length ? t('finishReview') : t('nextReview'),
              ),
            ),
          ),
        ),
      )
    }
