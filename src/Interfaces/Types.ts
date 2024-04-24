import { StpTag } from "../Components/StpTable/TableObjects"

export type StpTypeProps = Partial<Record<StpTag, boolean>>


export type AnyObj = Record<string, any>
export type VoidFn = (...args: any) => void
export type FiltersParams = {
    tags: StpTag[],
    depth: number[],
    cams: number[],
    ids: number[]
}

export type CursorRespone<T, C = number> = {
    data: T
    prevCursor?: C
    nextCursor?: C
}