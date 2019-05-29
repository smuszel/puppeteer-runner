declare type Browser = import('puppeteer').Browser
declare type BrowserContext = import('puppeteer').BrowserContext
declare type Page = import('puppeteer').Page
declare type MessageType = keyof typeof import('./src/constants').MessageType
declare type VerbosityLevel = keyof typeof import('./src/constants').VerbosityLevel
declare type BrowserMode = keyof typeof import('./src/constants').BrowserMode

declare type Dict<K, T> = { [k in K]: T }
declare type OptDict<K, T> = { [k in K]?: T }
declare type Defined = string | number | boolean | object

interface NodeRequire {
    (id: PathTestGenerator): Test<{ data: any, context?: BrowserContext}>
}

declare type ArgVars = {
    verbosity: VerbosityLevel
    browser: BrowserMode
    threads: number | boolean
    cwd: string
    data: any
    path: string
}

declare type Message = {
    type: MessageType
    value?: any
}

declare type Job = {
    data: any
    path: PathTestGenerator
    name: string
}

declare type Progress = {
    job: Job
    failed: boolean
    reason: any
    finished: boolean
    started: boolean
    step: string[]
    limit?: number
}

declare type Selector<T> = (done: Message[], diff: Message[]) => T
declare type Test<T> = (init: T) => AsyncIterableIterator<string | boolean>
declare type UnitTest<T> = Test<{ data: T}>
declare type E2ETest<T> = Test<{ context: BrowserContext, data: T }>
declare interface PathTestGenerator { }
declare type Chanel = (msg: Message) => void
declare type JobExecution = (chanel: Chanel, job: Job) => Promise<void>
declare type VPlugin = (done: Message[], diff: Message[]) => Message[]
declare type VPluginFactory = (argv: ArgVars) => VPlugin
declare type Split = <T>(f: (x: T) => T | undefined, xs: T[]) => [T[], T[]]
