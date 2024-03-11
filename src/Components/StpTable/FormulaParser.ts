import { _log } from "../../Helpers/helpersFns"
const hasTriplex = (parts: string[]) => parts.some(name => [`3.3.1`, `4.4.1`].includes(name))


const triplex = [`3.3.1`, `4.4.1`]
const glasses = [
    'TopN',
    'Эл',
    'Сбр',
    'FhCl',
    'FhBr',
    'FhGr',
    '(зак)',
    `3.3.1`,
    `4.4.1`,
    'Ar',
    'TGI',
    '(Ч)',
] as const
const ramki = [
    'Ar',
    'TGI',
    '(Ч)',
]
const tagCondition = (tags: typeof glasses[number][]) => {
    if (tags.some(t => t === 'TopN')) _log('energy')

}

export const parse_name = (stp_name: string) => {
    console.clear()
    tagCondition(['Ar',])
    const tags = glasses.filter(f => stp_name.includes(f))
    const name_parts = stp_name.split('-').filter(p => triplex.indexOf(p) < 0)
    const gls = name_parts.filter((n, i) => i % 2 === 0)
    const numbs = name_parts.map(i => Number(i.match(/\d+/g)))
    const strs = name_parts.map(i => i.match(/\D\w+/g))
    _log('numbs: ', ...numbs)
    _log('strs: ', ...strs)
    _log('tags: ', tags)
}

