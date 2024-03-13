import { parseStpName } from "./FormulaParser"
import { StpItem, StpTag } from "./TableObjects"

type TagType = {
    tag: StpTag
    g_prop: string[]
}

const TEnergy: TagType = {
    tag: 'energy',
    g_prop: ['TopN']
}
const TSolarProof: TagType = {
    tag: 'solarproof',
    g_prop: ['FhCl', 'FhBr', 'FhGr', 'Эл', 'Сбр',]
}
const THitProof: TagType = {
    tag: 'hitproof',
    g_prop: ['3.3.1', '4.4.1', "зак"]
}
const TSoundProof: TagType = {
    tag: 'soundproof',
    g_prop: ['3.3.1', '4.4.1']
}
const TMulti: TagType = {
    tag: 'multi',
    g_prop: ['Эл', "Сбр"]
}
const TSimple: TagType = {
    tag: 'simple',
    g_prop: []
}

export const TagsTypeList = [
    TSolarProof, TEnergy, THitProof, TMulti, TSimple, TSoundProof,
]


const tagRecognizer = (reg_glasses: string[], taglist = TagsTypeList) => {
    const resultTags: StpTag[] = []
    taglist.forEach(tt => {
        const _glslowerCase = tt.g_prop.map(g => g.toLowerCase())
        if (reg_glasses.some(g => _glslowerCase.includes(g.toLowerCase()))) resultTags.push(tt.tag)
    })

    return resultTags
}

export const setupTags = (stp_name: string, options = { showConsole: false }) => {
    const parsedArr = parseStpName(stp_name)


    const glasses = parsedArr.map((res) => {
        if (!res) return ""
        const [g, ...rest] = res
        return g
    }).filter((s, i) => i % 2 === 0)

    const props = parsedArr.map((res) => {
        if (!res) return []
        const [g, ...rest] = res
        return rest

    }).filter((s, i) => i % 2 === 0 && s.length > 0).flat(1)
    const isDiffGlass = glasses.includes('4') && glasses.includes('6') && glasses.length > 1

    const tags = [...tagRecognizer(props), ...tagRecognizer(glasses)]
    if (isDiffGlass === true) {

        tags.push("soundproof")
    }
    if (options.showConsole === true) {
        console.log('props', props)
        console.log('glasses', glasses)

        console.log('tags', tags)
    }
    return tags
}

export const updateTags = (item: StpItem) => {

    const { name } = item
    const new_tags = setupTags(name)
    item.tags = new_tags.length === 0 ? ['simple'] : new_tags
    return item

}


function getStpNameContent(stp_name: string) {
    const reArray = parseStpName(stp_name)

}

function splitEven<T>(args: T[]) {

    return args.reduce((acc, current, idx) => {
        const index = idx % 2
        acc[index] = [...acc[index], current]
        return acc
    }, [] as T[][])
}