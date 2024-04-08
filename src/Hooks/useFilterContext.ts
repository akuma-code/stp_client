import { createContext, useContext } from "react";
import { FilterStore } from "../Context/Stores/FiltrationStore";
import { SearchQueryStore } from "../Context/Stores/SearchQueryStore";
import { AuthStore } from "../Context/Stores/AuthStore";


export type FilterContextProps = {
    filters: FilterStore
    search: SearchQueryStore
    auth: AuthStore
}
export const FilterContext = createContext<FilterContextProps | null>(null);
export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("Хук используется вне провайдера контекста!");
    }
    return { ...context } as const;
};
