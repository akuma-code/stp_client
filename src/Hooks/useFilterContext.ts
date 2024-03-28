import { createContext, useContext } from "react";
import { FilterStore } from "../Context/Stores/FiltrationStore";
import { FiltersParams } from "../Interfaces/Types";


export const FilterContext = createContext<{ filters: FilterStore } | null>(null);
export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("Хук используется вне провайдера контекста!");
    }
    return { ...context } as const;
};
