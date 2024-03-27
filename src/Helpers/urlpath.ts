import { compile } from 'path-to-regexp';

export const _pathToUrl = (path: string, params: object = {}) =>
    compile(path)(params);