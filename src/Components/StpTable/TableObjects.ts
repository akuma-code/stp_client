
export type StpTag =
    | "multi"
    | "simple"
    | "energy"
    | "soundproof"
    | "hitproof"
    | "solarproof"
    | "standart"
export type StpItem = {

    cams: number
    depth: number
    Ro: number
    Rw: number
    Lt: number
    Lr: number
    Ra: number
    Det: number
    Er: number
    Ea: number
    Sf: number
    S: number
    weight: number
    secure: "P2A" | "нет" | "CM2" | "CM3"
    name: string
    tags: StpTag[]
}


export type StpNameProperties =
    | 'topn'
    | 'ar'
    | 'fhcl'
    | 'fhbr'
    | 'fhgr'
    | 'эл'
    | 'tgi'
    | 'tgiar'
    | 'сбр'
    | 'зак'
    | 'ч'
    | 'с'
    | 'mfn'
    | "cbr"
    | "sgr"
    | "cei"
    | "lhsbr"
    | "пр"


export function isTag<T = unknown>(item: T): item is T {
    const tags = ["multi", "simple", "energy", "soundproof", "hitproof", "solarproof", "standart"]
    if (typeof item === 'string') {
        return tags.includes(item)
    }
    else return false
}





























