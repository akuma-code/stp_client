import { createContext } from "react"

import { useContext } from "react"
import { StpStore } from "../Context/StpStore"
import { StpTypeProps } from "../Interfaces/Types"
import { FiltersParams } from "./useFiltration"



export type AContext = {
    StpStore: StpStore
    selectedItems: number[]
    select: React.Dispatch<React.SetStateAction<number[]>>
    filteredItemsCount: number
    setFcount: React.Dispatch<React.SetStateAction<number>>
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
    _type?: StpTypeProps,
    setType?: React.Dispatch<React.SetStateAction<StpTypeProps>>
    selectedTags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>
    filterParams: Partial<FiltersParams>
    filterFn: React.Dispatch<React.SetStateAction<Partial<FiltersParams>>>
}
export const AppContext = createContext<AContext | null>(null)

export const useAppContext = () => {
    const stores = useContext(AppContext)
    if (!stores) {
        throw new Error("Хук используется вне провайдера контекста!")
    }
    return { ...stores } as const
}