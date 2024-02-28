import { createContext } from "react"

import { useContext } from "react"
import { StpItem } from "../Components/StpTable/TableObjects"
import { StpStore } from "../Context/StpStore"
import { StpTagsList, StpTypeProps } from "../Interfaces/Types"
import { Stp_Tags } from "../Interfaces/Enums"



export type AContext = {
    StpStore: StpStore
    selectedItems: number[]
    select: React.Dispatch<React.SetStateAction<number[]>>
    filteredItemsCount: number
    setFcount: React.Dispatch<React.SetStateAction<number>>
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
    _type: StpTypeProps,
    setType: React.Dispatch<React.SetStateAction<StpTypeProps>>
    selectedTags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}
export const AppContext = createContext<AContext | null>(null)

export const useAppContext = () => {
    const stores = useContext(AppContext)
    if (!stores) {
        throw new Error("Хук используется вне провайдера контекста!")
    }
    return { ...stores } as const
}