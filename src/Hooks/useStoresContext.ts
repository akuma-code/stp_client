import { createContext } from "react"

import { useContext } from "react"



export const StoresContext = createContext({})

export const useStoresContext = () => {
    const stores = useContext(StoresContext)
    if (!stores) {
        throw new Error("Хук используется вне провайдера контекста!")
    }
    return { ...stores } as const
}