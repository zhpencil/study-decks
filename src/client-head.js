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
