import { createContext, useContext } from "react";
import { FilterStore } from "../Context/Stores/FiltrationStore";


export type FilterContextProps = {
    filters: FilterStore

}
export const FilterContext = createContext<FilterContextProps | null>(null);
export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("Хук используется вне провайдера контекста!");
    }
    return { ...context } as const;
};
