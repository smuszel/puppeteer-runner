import { RuntimeOptions, Compare } from '../types/internal';
declare const _default: ({
    comparisonEngine,
    stackParser,
    logger,
}: RuntimeOptions) => (title: string, cb: (c: Compare) => void, total?: number) => void;
export default _default;
