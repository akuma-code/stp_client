import { _log } from "../../Helpers/helpersFns"
import { StpNameProperties } from "./TableObjects"
import { GlassDescription, StpNamePropertyDescription } from "./TerminsDesc"

console.clear()
// const regGls = /\d\.\d\.\d|\d+|\w+\b/gu
export const StpRegExp = /\d\.\d\.\d|\d+|\p{L}+/gu
const regRam = /\d+|\w+$/g
export const triplexRegExp = /\d\.\d\.\d/g
export type Tformula = RegExpMatchArray


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



export const findTags = (formula: string, tags: StpNameProperties[]) => {

    return tags.filter(tag => formula.includes(tag))
}



export const formulaDescriptor = (name_parts: Tformula[]) => {
    const splitted = name_parts.map((p, idx) => {
        const [width, prop] = p
        const glstxt = GlassDescription.gls(width)
        const ramtxt = GlassDescription.ramka(width)
        const propTxt = prop ? StpNamePropertyDescription[prop as StpNameProperties] : ""
        if (idx % 2 === 0) {
            return `${glstxt} ${propTxt}`
        }
        else return `${ramtxt}${propTxt === "" ? "заполненная воздухом" : propTxt}`
    })

    return splitted

}


