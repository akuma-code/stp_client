
export type StpTagsList =
    | "multi"
    | "simple"
    | "energy"
    | "soundproof"
    | "hitproof"
    | "solarproof"
export type IFormulaProps = {
    id?: number
    formula: string,
    glassPropId?: number,
}
export type StpTypeProps = Partial<Record<StpTagsList, boolean>>


export type AnyObj = { [key: string]: any }