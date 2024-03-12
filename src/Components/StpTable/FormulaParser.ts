import { _log } from "../../Helpers/helpersFns"

console.clear()
// const regGls = /\d\.\d\.\d|\d+|\w+\b/gu
export const StpRegExp = /\d\.\d\.\d|\d+|\p{L}+/gu
const regRam = /\d+|\w+$/g
export type Tformula = [width: string, prop?: string]


export const parseFormula = (str: string, options = { split: false }) => {
    const arr = /-/.test(str) ? str.split('-') : str.split(" ")

    const re = arr.map((s, idx) => idx % 2 === 0
        ? s.match(StpRegExp)
        : s.match(regRam)
    )
    if (options.split === true) return re

    const parsed = arr.map(s => s.match(StpRegExp))

    return parsed
}

export const getPropsFromRegExp = (parsed_data: Tformula[][]) => {
    const glasses = parsed_data.map(p =>
        p.filter((_, idx) => idx % 2 === 0))
    // .map(([w, p]) =>            w))
    console.log('glasses', glasses)
}



const triplex = [`3.3.1`, `4.4.1`]
const gprops = [
    'TopN',
    'Эл',
    'Сбр',
    'FhCl',
    'FhBr',
    'FhGr',
    '(зак)',
    `3.3.1`,
    `4.4.1`,
    // 'Ar',
    // 'TGI',
    // '(Ч)',
] as const
const ramki = [
    'Ar',
    'TGI',
    '(Ч)',
]

type GProp = typeof gprops[number]
const tagCondition = (tags: GProp[]) => {
    if (tags.some(t => t === 'TopN')) _log('energy')

}

export const parse_name = (stp_name: string) => {


    const tags = gprops.filter(f => stp_name.includes(f))
    const name_parts = stp_name.split('-').filter(p => triplex.indexOf(p) < 0)
    const gls = name_parts.filter((n, i) => i % 2 === 0)
    const numbs = name_parts.map(i => Number(i.match(/\d+/g)))
    const strs = name_parts.map(i => i.match(StpRegExp))
    return strs
    // _log('numbs: ', ...numbs)
    // _log('strs: ', ...strs)
    // _log('tags: ', tags)
}

export const findTags = (formula: string, tags: GProp[] = [...gprops]) => {
    // _log("match: ", '4.4.1-12-4TopN-14Ar-6FHcl'.match(regNumbers))
    return tags.filter(tag => formula.includes(tag))
}

const condition = {

}

const FnamePartDescriptor = (name_part: Tformula) => {
    const [width, prop] = name_part


    const props = {
        TopN: 'energy',
        Ar: 'argon'
    }

    const result = `glass ${width} mm ${prop ? props[prop as keyof typeof props] : ""}`
    return result
}

console.log('desc:', FnamePartDescriptor(['6',]))