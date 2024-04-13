import { createContext, useContext } from "react"


import { StpStore } from "../Context/StpStore"
import { FiltersParams, StpTypeProps } from "../Interfaces/Types"
import { FilterStore } from "../Context/Stores/FiltrationStore"




export type AContext = {
    StpStore: StpStore

    selectedItems?: number[]
    select?: React.Dispatch<React.SetStateAction<number[]>>
    filteredItemsCount?: number
    setFcount?: React.Dispatch<React.SetStateAction<number>>
    query?: string
    setQuery?: React.Dispatch<React.SetStateAction<string>>
    _type?: StpTypeProps,
    setType?: React.Dispatch<React.SetStateAction<StpTypeProps>>
    selectedTags?: string[],
    setTags?: React.Dispatch<React.SetStateAction<string[]>>
    filterParams?: Partial<FiltersParams>
    filterFn?: React.Dispatch<React.SetStateAction<Partial<FiltersParams>>>
}
export const AppContext = createContext<AContext | null>(null)

export const useAppContext = () => {
    const stores = useContext(AppContext)
    if (!stores) {
        throw new Error("Хук используется вне провайдера контекста!")
    }
    return { ...stores } as const
}

