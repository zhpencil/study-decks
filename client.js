window.__ModuleLoader__.load({
  id: '@local/study-decks',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const {
      useState,
      useEffect,
      useMemo,
      useRef,
      useCallback,
      useSyncExternalStore,
      useContext,
      createContext,
    } = React

    const CHANNEL = '/study-decks'
    const STORAGE_KEY = 'dsh.studyDecks.v1'
    const MAX_CHUNKS = 48
    const CHUNK_CHARS = 3400

    const STRINGS = {
      zh: {
        nav: '记忆卡组',
        brand: '记忆卡组',
        tagline: '主动回忆 · 挖空测验',
        heroTitle: '把读过的东西，变成记得住的东西。',
        heroSubtitle:
          '上传 PDF、图片或笔记，AI 会先整理成 Markdown，再拆成一个个挖空测验。简单模式用选择题熟悉内容，困难模式逼自己把答案写出来。',
        newDeck: '新建卡组',
        importMaterial: '导入材料',
        deckUnit: '{n} 个卡组',
        quizUnit: '{n} 题',
        accuracy: '正确率',
        wrongCount: '错题',
        toReview: '待复习',
        cards: '卡组',
        emptyTitle: '还没有卡组',
        emptySubtitle: '从一份 PDF、几张课堂照片，或一段笔记开始。',
        emptyCta: '创建第一个卡组',
        open: '打开',
        delete: '删除',
        deleteConfirm: '删除“{title}”？错题记录会保留。',
        back: '返回',
        backHome: '返回卡组',
        importTitle: '导入一份新材料',
        importSubtitle: '选择一种来源。AI 会先整理成 Markdown，再按段落拆成可测试的挖空题。',
        tabPdf: 'PDF',
        tabImages: '图片',
        tabText: '文本 / Markdown',
        pdfHelp: '上传文字版 PDF。扫描页会尝试识别，单次最多处理 20 页扫描件。',
        choosePdf: '选择 PDF',
        pdfSelected: '已选择',
        pageRange: '页码范围',
        pageFrom: '起始页',
        pageTo: '结束页',
        pageRangeHint: '留空表示全部，单次最多 60 页。',
        imagesHelp: '上传课堂照片、截图或书页，最多 10 张。支持 PNG、JPEG、WebP、GIF。',
        chooseImages: '选择图片',
        textHelp: '粘贴课堂笔记，或上传 .md / .txt 文件。',
        pastePlaceholder: '把要背的内容粘贴到这里……',
        uploadText: '上传 .md / .txt',
        titleLabel: '卡组名称',
        titlePlaceholder: '例如：病理学 · 细胞损伤',
        titleHint: '留空由 AI 根据内容自动命名，之后可随时修改。',
        rename: '重命名',
        titleSaved: '卡组名称已更新',
        titleEmpty: '卡组名称不能为空',
        editName: '编辑卡组名称',
        save: '保存',
        generate: '生成卡组',
        generating: '生成中',
        cancel: '取消',
        stageExtract: '正在读取 PDF…',
        stageOcr: '正在识别图片文字…',
        stagePrepare: '正在整理 Markdown…',
        stageQuiz: '正在拆题 {done} / {total}',
        stageSave: '正在保存卡组…',
        progressHint: '材料较长时可能需要几分钟，请不要关闭页面。',
        abort: '停止生成',
        errorTitle: '生成失败',
        retry: '重试',
        warnings: '提示',
        materialTooLong: '材料太长（{n} 段）。请缩小页码范围或分批上传。',
        needContent: '请先选择文件或输入文本。',
        needPdf: '请选择一个 PDF 文件。',
        needImages: '请选择至少一张图片。',
        noQuizzes: '没有生成可用题目，请换一段材料重试。',
        modelChip: '模型：{model}',
        visionYes: '可识别图片',
        visionNo: '当前模型不支持图片',
        visionUnknown: '图片能力未知',
        offline: 'AI 未连接',
        deckDetail: '卡组详情',
        createdAt: '创建于 {date}',
        startTest: '开始测试',
        chooseMode: '选择测试模式',
        easy: '简单模式',
        hard: '困难模式',
        easyDesc: '在选项里选出正确答案，适合第一遍熟悉内容。',
        hardDesc: '在挖空处输入答案，适合考前硬回忆。',
        startEasy: '简单模式开始',
        startHard: '困难模式开始',
        wrongBook: '错题集',
        wrongBookHint: '答错和跳过的题会自动收进来。',
        quizPreview: '题目预览',
        answerHidden: '答案会在测试和错题回顾中显示',
        deleteDeck: '删除卡组',
        questionProgress: '第 {current} / {total} 题',
        exit: '退出',
        skip: '跳过',
        submit: '提交答案',
        next: '下一题',
        seeResult: '查看结果',
        correct: '答对了',
        wrong: '答错了',
        skippedTitle: '已跳过',
        answerAll: '请先填完所有空。',
        typeAnswer: '输入答案',
        blankLabel: '空 {n}',
        pickAnswer: '为空 {n} 选择一个答案',
        easyHint: '按顺序为每个空选择答案。',
        hardHint: '在挖空处输入答案，按 Enter 可跳到下一空。',
        correctAnswer: '正确答案',
        yourAnswer: '你的答案',
        explanation: '解析',
        sourceText: '原文',
        resultTitle: '本轮完成',
        resultScore: '{correct} / {total} 题正确',
        resultWrong: '{n} 题已进入错题集',
        resultSkipped: '跳过 {n} 题',
        testAgain: '再测一次',
        backToDeck: '返回卡组',
        allWrong: '全部错题',
        wrongSubtitle: '悬停挖空查看答案，逐题回顾，或重新测试。',
        filterAll: '全部',
        filterTodo: '待复习',
        filterMastered: '已掌握',
        retestWrong: '重测待复习',
        review: '回顾',
        reviewing: '逐题回顾',
        reviewHint: '悬停或聚焦挖空处查看答案',
        prev: '上一题',
        nextReview: '下一题',
        finishReview: '完成回顾',
        markMastered: '标记已掌握',
        unmarkMastered: '重新加入',
        removeWrong: '移出错题集',
        statsWrong: '答错 {n}',
        statsSkipped: '跳过 {n}',
        statsCorrect: '答对 {n}',
        streak: '连续答对 {n}',
        lastAt: '上次 {date}',
        mastered: '已掌握',
        reviewDone: '回顾完成',
        reviewProgress: '{current} / {total}',
        revealAnswer: '显示答案',
        hideAnswer: '隐藏答案',
        showAll: '全部显示',
        hideAll: '全部隐藏',
        close: '关闭',
        noWrongForDeck: '这个卡组还没有错题',
        wrongEmpty: '错题集是空的',
        wrongEmptyHint: '测试中答错或跳过的题会自动出现在这里。',
        goTest: '去测试',
        fromDeck: '来自 {title}',
        allDecks: '全部卡组',
        history: '答题记录',
        mistakes: '错题',
        lastTime: '最近练习',
        never: '还没练过',
        start: '开始',
        total: '总计',
        source: '来源',
        pageInfo: '第 {from}–{to} 页',
        imageCount: '{n} 张图片',
        textSource: '粘贴文本',
        fileSource: '文件',
        scanned: '扫描页识别',
        aiMaking: 'AI 正在拆题',
        choose: '选择',
        change: '更换',
        removeFile: '移除',
        added: '已加入',
        generated: '卡组已生成',
        deleted: '卡组已删除',
        now: '刚刚',
        questionN: '第 {n} 题',
        addOne: '新建卡组',
        reviewThis: '回顾此题',
        totalQuizzes: '总题数',
        deckProgress: '掌握进度',
        deckAccuracy: '正确率',
        undo: '撤销',
        notFound: '找不到这个卡组',
        backWrong: '返回错题集',
        emptyTest: '没有可测试的题目',
        testHint: '答错或跳过都会进入错题集',
        easyTag: '选择',
        hardTag: '输入',
        summaryCorrect: '正确',
        summaryWrong: '答错',
        summarySkipped: '跳过',
        studyMaterial: '学习材料',
        importFooterHint: 'AI 会先整理 Markdown，再逐段出题',
        pdfDropHint: '支持 PDF，单次最多 60 页',
        imagesDropHint: 'PNG / JPEG / WebP / GIF，最多 10 张',
        addImages: '继续添加',
        imagesChosen: '已选择 {n} / 10 张',
        allPages: '全部页',
        rangeOptional: '页码范围（可选）',
        imageLimit: '最多选择 10 张图片，已保留前 10 张。',
        imageSkipped: '已跳过不支持或过大的图片。',
        reviseBlanks: '重新选空',
        reviseTitle: '和 AI 重新选空',
        reviseHint: '描述你想挖哪里、挖几个空，或让 AI 换一个考点。AI 只会修改这一道题。',
        yourInstruction: '你的要求',
        revisePlaceholder: '例如：只挖一个空，挖机制而不是名词；或者：把数字挖掉，难度再高一点。',
        reviseRun: '让 AI 重新选空',
        reviseRunning: 'AI 正在重新读题…',
        revisePreview: '新挖空预览',
        applyRevision: '应用这道题',
        reviseAgain: '继续调整',
        reviseClose: '关闭',
        reviseSaved: '已更新这道题的挖空',
        reviseFailed: '重新选空失败',
        currentQuiz: '当前题目',
        newQuiz: 'AI 的新版本',
        choiceStep: '第 {current} / {total} 个空',
        choiceDone: '所有空都已选择',
        changeChoice: '修改',
        selectedAnswers: '已选答案',
        backBlank: '上一个空',
      },
      en: {
        nav: 'Study decks',
        brand: 'Study decks',
        tagline: 'Active recall · cloze quizzes',
        heroTitle: 'Turn what you read into what you remember.',
        heroSubtitle:
          'Upload a PDF, some photos or your notes. AI turns them into Markdown, then into cloze quizzes. Use Easy mode to get familiar, then Hard mode to force recall.',
        newDeck: 'New deck',
        importMaterial: 'Import material',
        deckUnit: '{n} decks',
        quizUnit: '{n} quizzes',
        accuracy: 'Accuracy',
        wrongCount: 'Mistakes',
        toReview: 'To review',
        cards: 'Decks',
        emptyTitle: 'No decks yet',
        emptySubtitle: 'Start with a PDF, a few class photos, or a block of notes.',
        emptyCta: 'Create your first deck',
        open: 'Open',
        delete: 'Delete',
        deleteConfirm: 'Delete “{title}”? Mistake records will be kept.',
        back: 'Back',
        backHome: 'Back to decks',
        importTitle: 'Import new material',
        importSubtitle: 'Pick a source. AI first turns it into Markdown, then splits it into testable cloze quizzes.',
        tabPdf: 'PDF',
        tabImages: 'Images',
        tabText: 'Text / Markdown',
        pdfHelp: 'Upload a text-based PDF. Scanned pages are attempted too, up to 20 scanned pages per run.',
        choosePdf: 'Choose PDF',
        pdfSelected: 'Selected',
        pageRange: 'Page range',
        pageFrom: 'From',
        pageTo: 'To',
        pageRangeHint: 'Leave blank for all pages. Up to 60 pages per run.',
        imagesHelp: 'Upload class photos, screenshots or book pages. Up to 10 images. PNG, JPEG, WebP or GIF.',
        chooseImages: 'Choose images',
        textHelp: 'Paste your notes, or upload a .md / .txt file.',
        pastePlaceholder: 'Paste the material you want to remember…',
        uploadText: 'Upload .md / .txt',
        titleLabel: 'Deck name',
        titlePlaceholder: 'e.g. Pathology · Cell injury',
        titleHint: 'Leave blank and AI names it from the content. You can rename it later.',
        rename: 'Rename',
        titleSaved: 'Deck name updated',
        titleEmpty: 'Deck name cannot be empty',
        editName: 'Edit deck name',
        save: 'Save',
        generate: 'Generate deck',
        generating: 'Generating',
        cancel: 'Cancel',
        stageExtract: 'Reading PDF…',
        stageOcr: 'Reading images…',
        stagePrepare: 'Preparing Markdown…',
        stageQuiz: 'Building quizzes {done} / {total}',
        stageSave: 'Saving deck…',
        progressHint: 'Long material can take a few minutes. Keep this page open.',
        abort: 'Stop',
        errorTitle: 'Generation failed',
        retry: 'Retry',
        warnings: 'Notes',
        materialTooLong: 'Material is too long ({n} chunks). Narrow the page range or import it in parts.',
        needContent: 'Choose a file or type some text first.',
        needPdf: 'Choose a PDF file.',
        needImages: 'Choose at least one image.',
        noQuizzes: 'No usable quizzes were generated. Try different material.',
        modelChip: 'Model: {model}',
        visionYes: 'Images supported',
        visionNo: 'Current model has no image input',
        visionUnknown: 'Image support unknown',
        offline: 'AI not connected',
        deckDetail: 'Deck',
        createdAt: 'Created {date}',
        startTest: 'Start test',
        chooseMode: 'Choose a mode',
        easy: 'Easy',
        hard: 'Hard',
        easyDesc: 'Pick the correct option. Great for a first pass.',
        hardDesc: 'Type the answer into each blank. Great for exam recall.',
        startEasy: 'Start easy',
        startHard: 'Start hard',
        wrongBook: 'Mistake book',
        wrongBookHint: 'Wrong and skipped quizzes land here automatically.',
        quizPreview: 'Quiz preview',
        answerHidden: 'Answers appear during a test or review',
        deleteDeck: 'Delete deck',
        questionProgress: 'Question {current} of {total}',
        exit: 'Exit',
        skip: 'Skip',
        submit: 'Submit answer',
        next: 'Next',
        seeResult: 'See result',
        correct: 'Correct',
        wrong: 'Not quite',
        skippedTitle: 'Skipped',
        answerAll: 'Fill every blank first.',
        typeAnswer: 'Type answer',
        blankLabel: 'Blank {n}',
        pickAnswer: 'Pick an answer for blank {n}',
        easyHint: 'Pick one answer for each blank, in order.',
        hardHint: 'Type into each blank. Press Enter to jump to the next.',
        correctAnswer: 'Correct answer',
        yourAnswer: 'Your answer',
        explanation: 'Why',
        sourceText: 'Source',
        resultTitle: 'Round complete',
        resultScore: '{correct} of {total} correct',
        resultWrong: '{n} added to your mistake book',
        resultSkipped: '{n} skipped',
        testAgain: 'Test again',
        backToDeck: 'Back to deck',
        allWrong: 'All mistakes',
        wrongSubtitle: 'Hover a blank to reveal its answer, review one by one, or retest.',
        filterAll: 'All',
        filterTodo: 'To review',
        filterMastered: 'Mastered',
        retestWrong: 'Retest to-review',
        review: 'Review',
        reviewing: 'Review',
        reviewHint: 'Hover or focus a blank to reveal the answer',
        prev: 'Previous',
        nextReview: 'Next',
        finishReview: 'Finish review',
        markMastered: 'Mark mastered',
        unmarkMastered: 'Add back',
        removeWrong: 'Remove',
        statsWrong: 'Wrong {n}',
        statsSkipped: 'Skipped {n}',
        statsCorrect: 'Correct {n}',
        streak: 'Streak {n}',
        lastAt: 'Last {date}',
        mastered: 'Mastered',
        reviewDone: 'Review complete',
        reviewProgress: '{current} / {total}',
        revealAnswer: 'Show answers',
        hideAnswer: 'Hide answers',
        showAll: 'Show all',
        hideAll: 'Hide all',
        close: 'Close',
        noWrongForDeck: 'No mistakes from this deck yet',
        wrongEmpty: 'Your mistake book is empty',
        wrongEmptyHint: 'Wrong or skipped quizzes from a test appear here automatically.',
        goTest: 'Go to a test',
        fromDeck: 'From {title}',
        allDecks: 'All decks',
        history: 'Attempts',
        mistakes: 'Mistakes',
        lastTime: 'Last practised',
        never: 'Never',
        start: 'Start',
        total: 'Total',
        source: 'Source',
        pageInfo: 'Pages {from}–{to}',
        imageCount: '{n} images',
        textSource: 'Pasted text',
        fileSource: 'File',
        scanned: 'Scanned pages',
        aiMaking: 'AI is building quizzes',
        choose: 'Choose',
        change: 'Change',
        removeFile: 'Remove',
        added: 'Added',
        generated: 'Deck created',
        deleted: 'Deck deleted',
        now: 'just now',
        questionN: 'Question {n}',
        addOne: 'New deck',
        reviewThis: 'Review this',
        totalQuizzes: 'Quizzes',
        deckProgress: 'Progress',
        deckAccuracy: 'Accuracy',
        undo: 'Undo',
        notFound: 'Deck not found',
        backWrong: 'Back to mistakes',
        emptyTest: 'No quizzes to test',
        testHint: 'Wrong or skipped answers go to the mistake book',
        easyTag: 'Choice',
        hardTag: 'Typing',
        summaryCorrect: 'Correct',
        summaryWrong: 'Wrong',
        summarySkipped: 'Skipped',
        studyMaterial: 'Study material',
        importFooterHint: 'AI first prepares Markdown, then builds quizzes section by section',
        pdfDropHint: 'PDF only, up to 60 pages per run',
        imagesDropHint: 'PNG / JPEG / WebP / GIF, up to 10 images',
        addImages: 'Add more',
        imagesChosen: '{n} / 10 images',
        allPages: 'All pages',
        rangeOptional: 'Page range (optional)',
        imageLimit: 'Up to 10 images. The first 10 are kept.',
        imageSkipped: 'Unsupported or oversized images were skipped.',
        reviseBlanks: 'Re-blank',
        reviseTitle: 'Re-blank with AI',
        reviseHint: 'Describe which parts to blank, how many blanks, or let AI choose a different target. Only this quiz changes.',
        yourInstruction: 'Your instruction',
        revisePlaceholder: 'e.g. one blank only, test the mechanism instead of a noun; or blank the numbers and make it harder.',
        reviseRun: 'Ask AI to re-blank',
        reviseRunning: 'AI is re-reading the quiz…',
        revisePreview: 'New blank preview',
        applyRevision: 'Use this version',
        reviseAgain: 'Adjust again',
        reviseClose: 'Close',
        reviseSaved: 'Quiz blanks updated',
        reviseFailed: 'Re-blank failed',
        currentQuiz: 'Current quiz',
        newQuiz: 'AI version',
        choiceStep: 'Blank {current} of {total}',
        choiceDone: 'All blanks selected',
        changeChoice: 'Change',
        selectedAnswers: 'Selected answers',
        backBlank: 'Previous blank',
      },
    }

    const CopyContext = createContext('zh')
    const EMPTY_LOCALE = Object.freeze({ active: 'zh', revision: 0, locales: [] })
    let localeService
    let connectionService
    let layoutService

    function tr(lang, key, vars) {
      const dictionary = STRINGS[lang] ?? STRINGS.zh
      let value = dictionary[key]
      if (value === undefined) value = STRINGS.zh[key] ?? key
      if (vars) {
        value = value.replace(/\{(\w+)\}/g, (_, name) => (vars[name] === undefined ? `{${name}}` : String(vars[name])))
      }
      return value
    }

    function currentLang() {
      const active = String(localeService?.getLocale?.().active ?? 'zh').toLowerCase()
      return active.startsWith('zh') ? 'zh' : 'en'
    }

    function subscribeLocale(listener) {
      return localeService ? localeService.subscribe(listener) : () => {}
    }

    function getLocaleSnapshot() {
      return localeService ? localeService.getSnapshot() : EMPTY_LOCALE
    }

    function useLang() {
      const snapshot = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, () => EMPTY_LOCALE)
      return String(snapshot.active ?? 'zh').toLowerCase().startsWith('zh') ? 'zh' : 'en'
    }

    function useCopy() {
      const lang = useContext(CopyContext)
      const t = useMemo(() => (key, vars) => tr(lang, key, vars), [lang])
      return { lang, t }
    }

    const CSS = `
.sd-root{height:100%;min-height:0;overflow-y:auto;overflow-x:hidden;background:var(--dsw-alias-bg-base,#f7f8fb);color:var(--dsw-alias-label-primary,#1c2230);font-family:inherit;line-height:1.55;}
.sd-root *{box-sizing:border-box;}
.sd-shell{width:100%;max-width:1120px;margin:0 auto;padding:30px 32px 60px;}
.sd-top{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:26px;}
.sd-brand{display:flex;align-items:center;gap:12px;min-width:0;}
.sd-mark{width:42px;height:42px;border-radius:13px;background:linear-gradient(135deg,#2f7cf6,#6d5df1 55%,#8b5cf6);display:grid;place-items:center;color:#fff;flex:0 0 auto;box-shadow:0 8px 18px rgba(68,86,226,.24);}
.sd-brand-name{font-size:17px;font-weight:680;letter-spacing:-.01em;}
.sd-brand-tag{font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);margin-top:1px;letter-spacing:.03em;}
.sd-top-right{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end;}
.sd-chip{display:inline-flex;align-items:center;gap:6px;min-height:30px;padding:4px 10px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);background:var(--dsw-alias-bg-layer-1,#fff);font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);white-space:nowrap;}
.sd-chip.success{color:var(--dsw-alias-state-success-primary,#168a5b);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 26%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 7%,var(--dsw-alias-bg-layer-1,#fff));}
.sd-chip.warn{color:var(--dsw-alias-state-warn-primary,#a9660b);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#a9660b) 26%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#a9660b) 7%,var(--dsw-alias-bg-layer-1,#fff));}
.sd-dot{width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.8;}
.sd-btn{appearance:none;border:1px solid transparent;border-radius:11px;min-height:38px;padding:8px 15px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:background .16s,border-color .16s,transform .12s,box-shadow .16s;white-space:nowrap;}
.sd-btn:active{transform:translateY(1px);}
.sd-btn:focus-visible{outline:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 24%,transparent);}
.sd-btn.primary{background:var(--dsw-alias-brand-primary,#2f7cf6);color:#fff;box-shadow:0 5px 14px color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 24%,transparent);}
.sd-btn.primary:hover{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 88%,#000);}
.sd-btn.ghost{background:transparent;color:var(--dsw-alias-label-secondary,#697386);border-color:var(--dsw-alias-border-l1,#e3e6ee);}
.sd-btn.ghost:hover{background:var(--dsw-alias-bg-layer-2,#f2f4f8);color:var(--dsw-alias-label-primary,#1c2230);}
.sd-btn.soft{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 9%,var(--dsw-alias-bg-layer-1,#fff));color:var(--dsw-alias-brand-primary,#2f7cf6);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 14%,transparent);}
.sd-btn.soft:hover{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 14%,var(--dsw-alias-bg-layer-1,#fff));}
.sd-btn.danger{background:transparent;color:var(--dsw-alias-state-error-primary,#c43a3a);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 22%,transparent);}
.sd-btn.danger:hover{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 8%,transparent);}
.sd-btn.sm{min-height:30px;padding:4px 10px;border-radius:8px;font-size:12px;}
.sd-btn.icon{width:34px;height:34px;min-height:34px;padding:0;border-radius:9px;}
.sd-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
.sd-hero{position:relative;overflow:hidden;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:22px;background:var(--dsw-alias-bg-layer-1,#fff);padding:34px 36px 30px;margin-bottom:22px;isolation:isolate;}
.sd-hero::before{content:"";position:absolute;width:360px;height:360px;right:-130px;top:-170px;border-radius:50%;background:radial-gradient(circle at center,rgba(94,111,246,.18),rgba(94,111,246,0) 68%);pointer-events:none;z-index:-1;}
.sd-hero::after{content:"";position:absolute;width:240px;height:240px;right:80px;bottom:-180px;border-radius:50%;background:radial-gradient(circle at center,rgba(22,185,129,.13),rgba(22,185,129,0) 68%);pointer-events:none;z-index:-1;}
.sd-eyebrow{display:inline-flex;align-items:center;gap:7px;font-size:11.5px;font-weight:600;color:var(--dsw-alias-brand-primary,#2f7cf6);letter-spacing:.04em;text-transform:uppercase;margin-bottom:12px;}
.sd-hero h1{font-size:30px;line-height:1.22;letter-spacing:-.035em;margin:0 0 10px;font-weight:720;max-width:720px;}
.sd-hero p{margin:0;max-width:690px;color:var(--dsw-alias-label-secondary,#697386);font-size:14px;}
.sd-hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px;}
.sd-stat-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:24px;max-width:660px;}
.sd-stat{padding:12px 14px;border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2,#f2f4f8) 70%,transparent);border:1px solid var(--dsw-alias-border-l1,#e3e6ee);}
.sd-stat strong{display:block;font-size:20px;line-height:1.2;letter-spacing:-.02em;}
.sd-stat span{display:block;font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);margin-top:3px;}
.sd-section-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:26px 2px 12px;}
.sd-section-head h2{font-size:15px;margin:0;letter-spacing:-.01em;}
.sd-section-head span{font-size:12px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-deck-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
.sd-deck-card{position:relative;display:flex;flex-direction:column;gap:12px;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);background:var(--dsw-alias-bg-layer-1,#fff);border-radius:16px;padding:17px 17px 15px;cursor:pointer;transition:border-color .16s,box-shadow .16s,transform .16s;min-height:176px;overflow:hidden;}
.sd-deck-card:hover{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 28%,var(--dsw-alias-border-l1,#e3e6ee));box-shadow:0 10px 26px rgba(30,41,80,.08);transform:translateY(-1px);}
.sd-deck-card::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,#2f7cf6,#7c6cf2,#16b981);opacity:.8;}
.sd-deck-title{font-size:15px;font-weight:660;letter-spacing:-.015em;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;padding-right:28px;}
.sd-deck-source{font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.sd-deck-meta{display:flex;gap:6px;flex-wrap:wrap;}
.sd-tag{display:inline-flex;align-items:center;gap:5px;font-size:10.5px;line-height:1;padding:5px 7px;border-radius:6px;background:var(--dsw-alias-bg-layer-2,#f2f4f8);color:var(--dsw-alias-label-secondary,#697386);white-space:nowrap;}
.sd-deck-footer{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:2px;}
.sd-deck-progress{flex:1;min-width:0;}
.sd-bar{height:5px;border-radius:99px;background:var(--dsw-alias-bg-layer-2,#eef1f6);overflow:hidden;}
.sd-bar > i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#2f7cf6,#16b981);transition:width .4s ease;}
.sd-deck-progress small{display:block;font-size:10.5px;color:var(--dsw-alias-label-secondary,#697386);margin-top:5px;}
.sd-card-menu{position:absolute;right:11px;top:11px;opacity:0;transition:opacity .14s;}
.sd-deck-card:hover .sd-card-menu,.sd-card-menu:focus-within{opacity:1;}
.sd-empty{border:1px dashed var(--dsw-alias-border-l2,#cfd5e2);border-radius:18px;padding:54px 24px;text-align:center;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1,#fff) 60%,transparent);}
.sd-empty-icon{width:52px;height:52px;margin:0 auto 14px;border-radius:16px;display:grid;place-items:center;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 9%,var(--dsw-alias-bg-layer-1,#fff));color:var(--dsw-alias-brand-primary,#2f7cf6);}
.sd-empty h3{font-size:16px;margin:0 0 6px;}
.sd-empty p{margin:0 auto 20px;max-width:390px;color:var(--dsw-alias-label-secondary,#697386);font-size:13px;}
.sd-page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:20px;}
.sd-page-head h1{font-size:23px;line-height:1.3;letter-spacing:-.025em;margin:0 0 6px;}
.sd-page-head p{margin:0;color:var(--dsw-alias-label-secondary,#697386);font-size:13px;max-width:640px;}
.sd-back{appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-secondary,#697386);font:inherit;font-size:12px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;padding:0;margin-bottom:12px;}
.sd-back:hover{color:var(--dsw-alias-label-primary,#1c2230);}
.sd-panel{border:1px solid var(--dsw-alias-border-l1,#e3e6ee);background:var(--dsw-alias-bg-layer-1,#fff);border-radius:18px;padding:24px;}
.sd-form{max-width:780px;}
.sd-tabs{display:flex;gap:4px;padding:4px;border-radius:11px;background:var(--dsw-alias-bg-layer-2,#f2f4f8);margin-bottom:20px;}
.sd-tab{appearance:none;border:0;background:transparent;border-radius:8px;min-height:34px;padding:6px 14px;display:inline-flex;align-items:center;gap:7px;font:inherit;font-size:12.5px;font-weight:600;color:var(--dsw-alias-label-secondary,#697386);cursor:pointer;}
.sd-tab.active{background:var(--dsw-alias-bg-layer-1,#fff);color:var(--dsw-alias-label-primary,#1c2230);box-shadow:0 2px 8px rgba(25,34,64,.08);}
.sd-help{font-size:12px;color:var(--dsw-alias-label-secondary,#697386);margin:0 0 12px;}
.sd-drop{display:block;width:100%;border:1.5px dashed var(--dsw-alias-border-l2,#cfd5e2);border-radius:14px;padding:26px 20px;text-align:center;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2,#f2f4f8) 45%,transparent);transition:border-color .16s,background .16s;}
.sd-drop:hover{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 40%,var(--dsw-alias-border-l2,#cfd5e2));background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 4%,transparent);}
.sd-drop strong{display:block;font-size:13.5px;margin:8px 0 4px;}
.sd-drop span{display:block;font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-drop-icon{width:42px;height:42px;border-radius:12px;margin:0 auto;display:grid;place-items:center;background:var(--dsw-alias-bg-layer-1,#fff);border:1px solid var(--dsw-alias-border-l1,#e3e6ee);color:var(--dsw-alias-brand-primary,#2f7cf6);}
.sd-file-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:12px;background:var(--dsw-alias-bg-layer-2,#f7f8fb);margin-top:12px;}
.sd-file-row .sd-file-icon{width:36px;height:36px;border-radius:9px;background:var(--dsw-alias-bg-layer-1,#fff);display:grid;place-items:center;color:var(--dsw-alias-brand-primary,#2f7cf6);border:1px solid var(--dsw-alias-border-l1,#e3e6ee);flex:0 0 auto;}
.sd-file-name{font-size:12.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.sd-file-meta{font-size:11px;color:var(--dsw-alias-label-secondary,#697386);margin-top:2px;}
.sd-file-row .sd-grow{flex:1;min-width:0;}
.sd-field{display:block;margin-top:16px;}
.sd-label{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px;font-weight:600;margin-bottom:7px;}
.sd-label small{font-weight:400;color:var(--dsw-alias-label-secondary,#697386);font-size:11px;}
.sd-input,.sd-textarea,.sd-select{width:100%;border:1px solid var(--dsw-alias-border-l1,#dde2ec);border-radius:10px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#1c2230);font:inherit;font-size:13px;padding:9px 11px;transition:border-color .15s,box-shadow .15s;}
.sd-input:focus,.sd-textarea:focus,.sd-select:focus{outline:none;border-color:var(--dsw-alias-brand-primary,#2f7cf6);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 14%,transparent);}
.sd-textarea{min-height:180px;resize:vertical;line-height:1.6;}
.sd-range{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:360px;}
.sd-range-card{margin-top:14px;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:12px;background:var(--dsw-alias-bg-layer-2,#f7f8fb);padding:12px 13px;}
.sd-range-card-head{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px;font-weight:600;margin-bottom:9px;}
.sd-range-card-head .sd-help{margin:0;font-weight:400;}
.sd-range-fields{display:flex;align-items:flex-end;gap:9px;flex-wrap:wrap;}
.sd-range-field{display:flex;flex-direction:column;gap:4px;min-width:110px;}
.sd-range-field span{font-size:10.5px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-range-dash{color:var(--dsw-alias-label-secondary,#697386);padding-bottom:10px;font-size:12px;}
.sd-file-actions{display:flex;align-items:center;gap:5px;flex:0 0 auto;}
.sd-char{font-size:11px;color:var(--dsw-alias-label-secondary,#697386);text-align:right;margin-top:5px;}
.sd-image-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px;font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-image-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px;margin-top:8px;}
.sd-thumb-add{border:1.5px dashed var(--dsw-alias-border-l2,#cfd5e2);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2,#f2f4f8) 55%,transparent);display:flex;flex-direction:column;gap:5px;align-items:center;justify-content:center;color:var(--dsw-alias-brand-primary,#2f7cf6);font-size:10.5px;font-weight:600;text-align:center;cursor:pointer;padding:6px;}
.sd-thumb-add:hover{border-color:var(--dsw-alias-brand-primary,#2f7cf6);background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 5%,transparent);}
.sd-thumb-index{position:absolute;left:4px;top:4px;background:rgba(20,26,40,.7);color:#fff;border-radius:5px;font-size:9px;line-height:1;padding:3px 5px;}
.sd-thumb{position:relative;aspect-ratio:1/1;border-radius:10px;overflow:hidden;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);background:var(--dsw-alias-bg-layer-2,#f2f4f8);}
.sd-thumb img{width:100%;height:100%;object-fit:cover;display:block;}
.sd-thumb button{position:absolute;right:3px;top:3px;width:22px;height:22px;border-radius:50%;border:0;background:rgba(20,26,40,.72);color:#fff;display:grid;place-items:center;cursor:pointer;font-size:12px;line-height:1;}
.sd-footer{display:flex;align-items:center;justify-content:flex-end;gap:9px;flex-wrap:wrap;margin-top:22px;padding-top:18px;border-top:1px solid var(--dsw-alias-border-l1,#e3e6ee);}
.sd-footer .sd-hint{margin-right:auto;font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-progress-card{max-width:680px;margin:12px auto;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:18px;background:var(--dsw-alias-bg-layer-1,#fff);padding:34px;text-align:center;}
.sd-spinner{width:34px;height:34px;border-radius:50%;border:3px solid color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 16%,transparent);border-top-color:var(--dsw-alias-brand-primary,#2f7cf6);margin:0 auto 16px;animation:sd-spin .8s linear infinite;}
@keyframes sd-spin{to{transform:rotate(360deg)}}
.sd-progress-card h3{font-size:16px;margin:0 0 5px;}
.sd-progress-card p{font-size:12.5px;color:var(--dsw-alias-label-secondary,#697386);margin:0 0 18px;}
.sd-progress-bar{height:7px;border-radius:99px;background:var(--dsw-alias-bg-layer-2,#eef1f6);overflow:hidden;margin-bottom:8px;}
.sd-progress-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#2f7cf6,#16b981);transition:width .35s;}
.sd-warning{border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary,#a9660b) 22%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#a9660b) 7%,var(--dsw-alias-bg-layer-1,#fff));color:var(--dsw-alias-state-warn-primary,#a9660b);border-radius:10px;padding:10px 12px;font-size:12px;margin-top:12px;text-align:left;}
.sd-error{border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 22%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 6%,var(--dsw-alias-bg-layer-1,#fff));color:var(--dsw-alias-state-error-primary,#c43a3a);border-radius:10px;padding:11px 13px;font-size:12.5px;margin-top:14px;}
.sd-summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:16px;}
.sd-summary-cell{border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:11px;padding:12px;background:var(--dsw-alias-bg-layer-2,#f7f8fb);}
.sd-summary-cell strong{font-size:22px;display:block;line-height:1.15;}
.sd-summary-cell span{font-size:11px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-summary-cell.good strong{color:var(--dsw-alias-state-success-primary,#168a5b);}
.sd-summary-cell.bad strong{color:var(--dsw-alias-state-error-primary,#c43a3a);}
.sd-deck-hero{border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:20px;background:var(--dsw-alias-bg-layer-1,#fff);padding:25px 27px;margin-bottom:16px;position:relative;overflow:hidden;}
.sd-deck-hero::before{content:"";position:absolute;inset:0 0 auto 0;height:3px;background:linear-gradient(90deg,#2f7cf6,#7c6cf2,#16b981);}
.sd-deck-hero h1{font-size:25px;line-height:1.3;letter-spacing:-.03em;margin:0 0 8px;max-width:800px;}
.sd-title-line{display:flex;align-items:flex-start;gap:8px;margin-bottom:8px;}
.sd-title-line h1{margin:0;flex:1;min-width:0;}
.sd-title-line .sd-btn{opacity:.55;flex:0 0 auto;margin-top:2px;}
.sd-title-line:hover .sd-btn,.sd-title-line .sd-btn:focus-visible{opacity:1;}
.sd-title-edit{display:flex;align-items:center;gap:7px;margin-bottom:9px;max-width:760px;flex-wrap:wrap;}
.sd-title-edit .sd-input{font-size:18px;font-weight:650;letter-spacing:-.02em;flex:1;min-width:220px;}
.sd-deck-hero .sd-meta-line{display:flex;align-items:center;gap:7px;flex-wrap:wrap;font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-deck-hero .sd-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:18px;}
.sd-detail-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:16px;align-items:start;}
.sd-mode-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;}
.sd-mode-card{appearance:none;text-align:left;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);background:var(--dsw-alias-bg-base,#fff);border-radius:13px;padding:15px;cursor:pointer;font:inherit;color:inherit;transition:border-color .15s,background .15s;}
.sd-mode-card:hover,.sd-mode-card.active{border-color:var(--dsw-alias-brand-primary,#2f7cf6);background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 5%,var(--dsw-alias-bg-base,#fff));}
.sd-mode-card strong{display:flex;align-items:center;gap:7px;font-size:13px;}
.sd-mode-card span{display:block;font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);margin-top:5px;line-height:1.5;}
.sd-mode-icon{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 9%,transparent);color:var(--dsw-alias-brand-primary,#2f7cf6);flex:0 0 auto;}
.sd-quiz-list{display:flex;flex-direction:column;gap:1px;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:14px;overflow:hidden;background:var(--dsw-alias-border-l1,#e3e6ee);}
.sd-quiz-row{background:var(--dsw-alias-bg-layer-1,#fff);padding:13px 15px;display:flex;gap:12px;align-items:flex-start;}
.sd-quiz-action{margin-left:auto;flex:0 0 auto;padding-top:1px;}
.sd-quiz-num{font-size:10.5px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary,#697386);min-width:22px;padding-top:3px;}
.sd-quiz-stem{font-size:12.8px;line-height:1.7;}
.sd-quiz-meta{font-size:10.5px;color:var(--dsw-alias-label-secondary,#697386);margin-top:4px;}
.sd-blank{display:inline-flex;align-items:center;justify-content:center;min-width:58px;height:24px;line-height:1;padding:0 7px;margin:0 3px;border-radius:6px;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 8%,transparent);border-bottom:1.5px solid color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 42%,transparent);font-size:11.5px;font-weight:600;color:var(--dsw-alias-brand-primary,#2f7cf6);vertical-align:baseline;position:relative;outline:none;}
.sd-blank.hover{cursor:help;background:var(--dsw-alias-bg-layer-2,#eef1f6);color:var(--dsw-alias-label-secondary,#697386);border-bottom-color:var(--dsw-alias-border-l2,#cfd5e2);}
.sd-blank.hover::after{content:attr(data-answer);position:absolute;left:50%;bottom:calc(100% + 7px);transform:translate(-50%,3px);background:var(--dsw-alias-bg-overlay,#1e2433);color:#fff;font-size:11.5px;font-weight:500;line-height:1.4;padding:6px 9px;border-radius:7px;max-width:260px;width:max-content;white-space:normal;opacity:0;pointer-events:none;transition:opacity .12s,transform .12s;z-index:60;box-shadow:0 8px 24px rgba(10,15,30,.22);}
.sd-blank.hover:hover::after,.sd-blank.hover:focus-visible::after{opacity:1;transform:translate(-50%,0);}
.sd-blank.hover:focus-visible{box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 20%,transparent);}
.sd-blank.correct{background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 11%,transparent);color:var(--dsw-alias-state-success-primary,#168a5b);border-bottom-color:var(--dsw-alias-state-success-primary,#168a5b);}
.sd-blank.bad{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 10%,transparent);color:var(--dsw-alias-state-error-primary,#c43a3a);border-bottom-color:var(--dsw-alias-state-error-primary,#c43a3a);}
.sd-side-card{border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:14px;background:var(--dsw-alias-bg-layer-1,#fff);padding:16px;}
.sd-side-card + .sd-side-card{margin-top:12px;}
.sd-side-card h3{font-size:12px;margin:0 0 10px;color:var(--dsw-alias-label-secondary,#697386);font-weight:600;}
.sd-kv{display:flex;align-items:baseline;justify-content:space-between;gap:10px;font-size:12px;padding:5px 0;}
.sd-kv span{color:var(--dsw-alias-label-secondary,#697386);}
.sd-kv strong{font-size:13px;font-weight:650;}
.sd-test-wrap{max-width:780px;margin:0 auto;}
.sd-test-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:13px;}
.sd-test-top .sd-test-info{font-size:12px;color:var(--dsw-alias-label-secondary,#697386);display:flex;align-items:center;gap:9px;}
.sd-mini-bar{width:120px;height:4px;border-radius:99px;background:var(--dsw-alias-bg-layer-2,#eef1f6);overflow:hidden;}
.sd-mini-bar i{display:block;height:100%;background:var(--dsw-alias-brand-primary,#2f7cf6);border-radius:99px;transition:width .3s;}
.sd-quiz-card{border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:20px;background:var(--dsw-alias-bg-layer-1,#fff);padding:30px 32px 26px;box-shadow:0 12px 34px rgba(30,41,80,.06);}
.sd-quiz-kicker{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--dsw-alias-label-secondary,#697386);margin-bottom:17px;letter-spacing:.02em;}
.sd-question{font-size:17px;line-height:1.9;letter-spacing:-.005em;font-weight:520;color:var(--dsw-alias-label-primary,#1c2230);}
.sd-question .sd-blank{min-width:74px;height:29px;font-size:12.5px;padding:0 9px;}
.sd-input-blank{border:0;border-bottom:1.6px solid color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 45%,transparent);background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 6%,transparent);border-radius:6px 6px 0 0;color:var(--dsw-alias-label-primary,#1c2230);font:inherit;font-size:14px;font-weight:550;padding:2px 8px;margin:0 3px;height:30px;min-width:92px;text-align:center;outline:none;transition:background .14s,border-color .14s,box-shadow .14s;vertical-align:baseline;}
.sd-input-blank:focus{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 9%,transparent);border-bottom-color:var(--dsw-alias-brand-primary,#2f7cf6);box-shadow:0 3px 0 color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 15%,transparent);}
.sd-input-blank.correct{background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 10%,transparent);border-bottom-color:var(--dsw-alias-state-success-primary,#168a5b);color:var(--dsw-alias-state-success-primary,#168a5b);}
.sd-input-blank.bad{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 9%,transparent);border-bottom-color:var(--dsw-alias-state-error-primary,#c43a3a);color:var(--dsw-alias-state-error-primary,#c43a3a);text-decoration:line-through;}
.sd-answer-groups{display:flex;flex-direction:column;gap:14px;margin-top:22px;}
.sd-answer-group{border-top:1px solid var(--dsw-alias-border-l1,#e3e6ee);padding-top:12px;}
.sd-answer-label{font-size:10.5px;font-weight:650;letter-spacing:.05em;text-transform:uppercase;color:var(--dsw-alias-label-secondary,#697386);margin-bottom:7px;}
.sd-options{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
.sd-option{appearance:none;text-align:left;border:1px solid var(--dsw-alias-border-l1,#e0e4ed);background:var(--dsw-alias-bg-base,#fff);border-radius:10px;padding:9px 11px;display:flex;align-items:center;gap:9px;font:inherit;font-size:12.5px;color:var(--dsw-alias-label-primary,#1c2230);cursor:pointer;transition:border-color .14s,background .14s;line-height:1.45;}
.sd-option:hover:not(:disabled){border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 45%,var(--dsw-alias-border-l1,#e0e4ed));background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 3%,var(--dsw-alias-bg-base,#fff));}
.sd-option.selected{border-color:var(--dsw-alias-brand-primary,#2f7cf6);background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 7%,var(--dsw-alias-bg-base,#fff));}
.sd-option.correct{border-color:var(--dsw-alias-state-success-primary,#168a5b);background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 8%,var(--dsw-alias-bg-base,#fff));}
.sd-option.bad{border-color:var(--dsw-alias-state-error-primary,#c43a3a);background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 7%,var(--dsw-alias-bg-base,#fff));}
.sd-option-key{width:20px;height:20px;border-radius:5px;display:grid;place-items:center;font-size:10px;font-weight:700;background:var(--dsw-alias-bg-layer-2,#f1f3f8);color:var(--dsw-alias-label-secondary,#697386);flex:0 0 auto;}
.sd-option.selected .sd-option-key{background:var(--dsw-alias-brand-primary,#2f7cf6);color:#fff;}
.sd-option.correct .sd-option-key{background:var(--dsw-alias-state-success-primary,#168a5b);color:#fff;}
.sd-option.bad .sd-option-key{background:var(--dsw-alias-state-error-primary,#c43a3a);color:#fff;}
.sd-test-actions{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:24px;padding-top:18px;border-top:1px solid var(--dsw-alias-border-l1,#e3e6ee);}
.sd-test-actions .sd-left{display:flex;gap:8px;align-items:center;}
.sd-test-actions .sd-right{display:flex;gap:8px;align-items:center;}
.sd-feedback{margin-top:22px;border-radius:13px;border:1px solid;padding:15px 16px;animation:sd-rise .22s ease-out;}
@keyframes sd-rise{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
.sd-feedback.good{border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 25%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 7%,var(--dsw-alias-bg-layer-1,#fff));}
.sd-feedback.bad{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 23%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 5%,var(--dsw-alias-bg-layer-1,#fff));}
.sd-feedback-head{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:680;}
.sd-feedback.good .sd-feedback-head{color:var(--dsw-alias-state-success-primary,#168a5b);}
.sd-feedback.bad .sd-feedback-head{color:var(--dsw-alias-state-error-primary,#c43a3a);}
.sd-feedback-body{font-size:12.5px;color:var(--dsw-alias-label-primary,#1c2230);margin-top:8px;line-height:1.65;}
.sd-feedback-body p{margin:0 0 8px;}
.sd-feedback-body p:last-child{margin:0;}
.sd-fb-label{font-weight:650;color:var(--dsw-alias-label-secondary,#697386);margin-right:6px;}
.sd-answer-pill{display:inline-block;margin:2px 4px 2px 0;padding:1px 7px;border-radius:5px;background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 10%,transparent);color:var(--dsw-alias-state-success-primary,#168a5b);font-size:12px;font-weight:600;}
.sd-summary{max-width:680px;margin:0 auto;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:20px;background:var(--dsw-alias-bg-layer-1,#fff);padding:32px;text-align:center;box-shadow:0 12px 34px rgba(30,41,80,.06);}
.sd-summary-icon{width:58px;height:58px;border-radius:18px;margin:0 auto 14px;display:grid;place-items:center;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 9%,transparent);color:var(--dsw-alias-brand-primary,#2f7cf6);}
.sd-summary h2{font-size:21px;margin:0 0 5px;letter-spacing:-.02em;}
.sd-summary p{font-size:12.5px;color:var(--dsw-alias-label-secondary,#697386);margin:0;}
.sd-summary .sd-summary-grid{text-align:left;}
.sd-summary-actions{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:20px;}
.sd-filter-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:16px 0 12px;}
.sd-filter{appearance:none;border:1px solid var(--dsw-alias-border-l1,#e3e6ee);background:var(--dsw-alias-bg-layer-1,#fff);border-radius:8px;padding:5px 10px;font:inherit;font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);cursor:pointer;}
.sd-filter.active{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 8%,var(--dsw-alias-bg-layer-1,#fff));border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 25%,transparent);color:var(--dsw-alias-brand-primary,#2f7cf6);font-weight:600;}
.sd-wrong-list{display:flex;flex-direction:column;gap:9px;}
.sd-wrong-row{border:1px solid var(--dsw-alias-border-l1,#e3e6ee);background:var(--dsw-alias-bg-layer-1,#fff);border-radius:13px;padding:14px 15px;display:flex;gap:12px;align-items:flex-start;transition:border-color .15s;}
.sd-wrong-row:hover{border-color:var(--dsw-alias-border-l2,#cfd5e2);}
.sd-wrong-main{flex:1;min-width:0;}
.sd-wrong-top{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:6px;}
.sd-badge{display:inline-flex;align-items:center;gap:4px;font-size:10px;line-height:1;padding:4px 6px;border-radius:5px;background:var(--dsw-alias-bg-layer-2,#f1f3f8);color:var(--dsw-alias-label-secondary,#697386);}
.sd-badge.bad{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#c43a3a) 9%,transparent);color:var(--dsw-alias-state-error-primary,#c43a3a);}
.sd-badge.warn{background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#a9660b) 9%,transparent);color:var(--dsw-alias-state-warn-primary,#a9660b);}
.sd-badge.good{background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 9%,transparent);color:var(--dsw-alias-state-success-primary,#168a5b);}
.sd-wrong-stem{font-size:12.8px;line-height:1.8;}
.sd-wrong-meta{font-size:10.5px;color:var(--dsw-alias-label-secondary,#697386);margin-top:6px;display:flex;gap:10px;flex-wrap:wrap;}
.sd-wrong-actions{display:flex;flex-direction:column;gap:5px;align-items:stretch;min-width:88px;}
.sd-review-wrap{max-width:760px;margin:0 auto;}
.sd-review-card{border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:18px;background:var(--dsw-alias-bg-layer-1,#fff);padding:28px 30px;}
.sd-review-card .sd-question{font-size:16px;line-height:2;}
.sd-review-meta{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px;font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-review-answerbox{margin-top:18px;border-top:1px solid var(--dsw-alias-border-l1,#e3e6ee);padding-top:13px;font-size:12.5px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-review-answerbox strong{color:var(--dsw-alias-label-primary,#1c2230);}
.sd-review-answerbox svg{vertical-align:-2px;}
.sd-toast{position:sticky;bottom:18px;margin:18px auto 0;width:max-content;max-width:90%;background:var(--dsw-alias-bg-overlay,#1e2433);color:#fff;font-size:12px;border-radius:9px;padding:8px 13px;box-shadow:0 10px 25px rgba(10,15,30,.2);animation:sd-rise .2s ease-out;z-index:80;}
.sd-blank.editable{cursor:pointer;}
.sd-blank.editable:hover{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#2f7cf6) 14%,transparent);}
.sd-choice-step{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:22px;padding-top:13px;border-top:1px solid var(--dsw-alias-border-l1,#e3e6ee);font-size:11.5px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-choice-step strong{color:var(--dsw-alias-label-primary,#1c2230);font-size:12px;}
.sd-choice-step .sd-choice-dots{display:flex;gap:5px;align-items:center;}
.sd-choice-dot{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-bg-layer-2,#eef1f6);border:1px solid var(--dsw-alias-border-l1,#e3e6ee);}
.sd-choice-dot.active{background:var(--dsw-alias-brand-primary,#2f7cf6);border-color:var(--dsw-alias-brand-primary,#2f7cf6);}
.sd-choice-dot.done{background:var(--dsw-alias-state-success-primary,#168a5b);border-color:var(--dsw-alias-state-success-primary,#168a5b);}
.sd-choice-review{margin-top:22px;border-top:1px solid var(--dsw-alias-border-l1,#e3e6ee);padding-top:14px;}
.sd-choice-review-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;}
.sd-choice-review-head strong{font-size:12px;}
.sd-choice-list{display:flex;flex-direction:column;gap:6px;}
.sd-choice-line{display:flex;align-items:center;gap:8px;font-size:12.5px;padding:7px 9px;border-radius:8px;background:var(--dsw-alias-bg-layer-2,#f7f8fb);}
.sd-choice-line span{flex:1;min-width:0;}
.sd-choice-line small{font-size:10.5px;color:var(--dsw-alias-label-secondary,#697386);white-space:nowrap;}
.sd-modal-backdrop{position:fixed;inset:0;background:rgba(14,20,38,.46);display:flex;align-items:center;justify-content:center;padding:20px;z-index:120;animation:sd-fade .16s ease-out;}
@keyframes sd-fade{from{opacity:0}to{opacity:1}}
.sd-modal{width:min(760px,100%);max-height:min(86vh,900px);overflow-y:auto;background:var(--dsw-alias-bg-layer-1,#fff);border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:18px;box-shadow:0 24px 70px rgba(10,15,30,.28);padding:22px 23px;animation:sd-rise .2s ease-out;}
.sd-modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:4px;}
.sd-modal-head h2{font-size:17px;margin:0 0 4px;letter-spacing:-.02em;}
.sd-modal-head p{margin:0;font-size:12px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-modal-section{border:1px solid var(--dsw-alias-border-l1,#e3e6ee);border-radius:12px;padding:12px 13px;margin-top:13px;background:var(--dsw-alias-bg-layer-2,#f7f8fb);}
.sd-modal-section h3{font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:var(--dsw-alias-label-secondary,#697386);margin:0 0 8px;font-weight:650;}
.sd-modal-quiz{font-size:13px;line-height:1.8;}
.sd-modal-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap;margin-top:16px;padding-top:13px;border-top:1px solid var(--dsw-alias-border-l1,#e3e6ee);}
.sd-modal-actions .sd-hint{margin-right:auto;font-size:11px;color:var(--dsw-alias-label-secondary,#697386);}
.sd-revise-answer-list{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;}
.sd-revise-answer-list span{font-size:11px;padding:3px 7px;border-radius:5px;background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#168a5b) 9%,transparent);color:var(--dsw-alias-state-success-primary,#168a5b);}
.sd-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
@media (max-width:900px){.sd-detail-grid{grid-template-columns:1fr}.sd-side-card + .sd-side-card{margin-top:12px}}
@media (max-width:720px){.sd-shell{padding:22px 18px 48px}.sd-hero{padding:26px 22px}.sd-hero h1{font-size:24px}.sd-stat-row{grid-template-columns:repeat(2,1fr)}.sd-top{align-items:flex-start}.sd-quiz-card{padding:22px 19px}.sd-options{grid-template-columns:1fr}.sd-deck-hero h1{font-size:21px}.sd-panel{padding:18px}.sd-mode-grid{grid-template-columns:1fr}.sd-wrong-row{flex-wrap:wrap}.sd-wrong-actions{flex-direction:row;width:100%;min-width:0}.sd-wrong-actions .sd-btn{flex:1}.sd-review-card{padding:21px 18px}.sd-test-top .sd-test-info{flex-wrap:wrap}.sd-summary{padding:24px 18px}}
`

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

