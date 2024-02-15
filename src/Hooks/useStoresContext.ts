import { createContext } from "react"

import { useContext } from "react"
import { StpItem } from "../Components/StpTable/TableObjects"
import { StpContext } from "../Context/StpContext"



export type AContext = {
    StpContext: StpContext
}
export const AppContext = createContext<AContext | null>(null)

export const useAppContext = () => {
    const stores = useContext(AppContext)
    if (!stores) {
        throw new Error("Хук используется вне провайдера контекста!")
    }
    return { ...stores } as const
}