import { _log } from "../../Helpers/helpersFns"
const hasTriplex = (parts: string[]) => parts.some(name => [`3.3.1`, `4.4.1`].includes(name))
const glasses = [
    'TopN',
    'Эл',
    'Сбр',
    'FhCl',
    'FhBr',
    'FhGr',
    '(зак)',
]
const ramki = [
    'Ar',
    'TGI',
    '(Ч)',
]
const triplex = [`3.3.1`, `4.4.1`]
export const parse_name = (stp_name: string) => {
    console.clear()
    if (triplex.some(t => stp_name.includes(t))) {

    }
    const name_parts = stp_name.split('-').filter(p => triplex.indexOf(p) < 0)
    const gls = name_parts.filter((n, i) => i % 2 === 0)
    const numbs = name_parts.map(i => Number(i.match(/\d+/g)))
    const strs = name_parts.map(i => i.match(/\D\w+/g))
    _log('numbs: ', ...numbs)
    _log('strs: ', ...strs)
}

const tagCondition = {
    simple: [],

}