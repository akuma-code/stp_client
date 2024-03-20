import { _log } from "../../../Helpers/helpersFns"
import { parseStpName, triplexRegExp } from "../FormulaParser"
import { TStandartNames, TagsTypeList } from "../StpTagsMaker"
import { StpItem, StpTag } from "../TableObjects"
export const NumbersWoOne = /\d+(?<!\.1)/g
export interface StpExemplar {
    name: string
    cams: number
    tags: StpTag[]
    depth: number
    params?: StpParams
}
export interface StpParams {
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

}
export type TParams = readonly [
    Ro: number,
    Rw: number,
    Lt: number,
    Lr: number,
    Ra: number,
    Det: number,
    Er: number,
    Ea: number,
    Sf: number,
    S: number,
    weight: number,
]


export class STP implements StpExemplar {
    name: string
    cams: number
    depth: number
    tags: StpTag[] = []
    secure: "P2A" | "нет" | "CM2" | "CM3"
    params?: StpParams
    constructor(formula: string) {
        this.name = formula
        this.depth = computeDepth(formula)
        this.tags = initTags(formula)
        this.cams = computeCams(formula)
        this.secure = computeSecure(formula)

    }

    public initParams(...init: TParams) {
        const [Ra, Det, Ea, Er, Lr, Lt, Ro, Rw, S, Sf, weight] = init
        this.params = {
            Ra, Det, Ea, Er, Lr, Lt, Ro, Rw, S, Sf, weight
        }
    }
    public get stpItem(): StpItem {
        if (!this.params) throw new Error("stp params not found!!")
        const { cams, depth, name, tags, secure } = this
        const stp_item: StpItem = { cams, depth, name, tags, secure, ...this.params }
        return stp_item
    }

}









function computeCams(name: string) {
    const splitName = name.split('-')
    const camCount = splitName.length === 3 ? 1 : splitName.length === 5 ? 2 : 0
    if (camCount < 1) throw new Error(`Error with stp formula - ${name}`)
    return camCount
}
function computeSecure(name: string) {
    if (/4\./g.test(name)) return "CM3"
    else if (/3\./g.test(name)) return "CM2"
    return 'нет'
}
function computeDepth(formula: string) {
    const numbers = formula.match(NumbersWoOne)
    const numbarr = numbers?.map(n => parseInt(n))

    const depth = numbarr?.reduce((acc, n) => acc = acc + n)
    return depth ? depth : 0
}

const initTags = (stp_name: string, options = { showConsole: false }) => {
    const parsedArr = parseStpName(stp_name)
    const isStandart = TStandartNames.includes(stp_name)

    const glasses = parsedArr.map((res) => {
        const [g,] = res
        return g
    }).filter((s, i) => i % 2 === 0)

    const props = parsedArr.map((res) => {
        const [, ...rest] = res
        return rest

    }).filter((s, i) => i % 2 === 0 && s.length > 0).flat(1)
    const isDiffGlass = glasses.includes('4') && glasses.includes('6') && glasses.length > 1

    const tags = [...tagRecognizer(props), ...tagRecognizer(glasses)]



    //__soundproof    
    if (isDiffGlass === true && !tags.includes('soundproof')) tags.push("soundproof")
    //__standart  
    if (isStandart) tags.push('standart')
    if (tags.length === 0) tags.push('simple')

    if (options.showConsole === true) {
        console.log('props', props)
        console.log('glasses', glasses)
        console.log('tags', tags)
    }



    return tags
}

const tagRecognizer = (reg_glasses: string[], taglist = TagsTypeList) => {
    const resultTags: StpTag[] = []
    taglist.forEach(tt => {
        const _glslowerCase = tt.g_prop.map(g => g.toLowerCase())
        if (reg_glasses.some(g => _glslowerCase.includes(g.toLowerCase()))) resultTags.push(tt.tag)
    })

    return resultTags
}


