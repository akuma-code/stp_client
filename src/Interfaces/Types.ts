
export type IGlassPropsFields =
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
export type StpTypeProps = Partial<Record<IGlassPropsFields, boolean>>


