import { _log } from "../../Helpers/helpersFns"
const hasTriplex = (parts: string[]) => parts.some(name => [`3.3.1`, `4.4.1`].includes(name))
console.clear()
const regNumbers = /\d[.]\d[.]\d|\d+|\w+/g
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
    const strs = name_parts.map(i => i.match(regNumbers))
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

