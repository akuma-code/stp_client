import { NumericStpPropFields } from "./Enums"

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




export type STP = {
    id: number
    name: string
    numericProps?: Record<keyof typeof NumericStpPropFields, number>
    stp_type?: StpTypeProps
}

