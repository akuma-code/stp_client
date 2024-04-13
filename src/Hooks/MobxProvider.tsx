import React from "react";
import { FilterContextProps, FilterContext } from "./useFilterContext";


export function MobxProvider({ stores, children }: { stores: FilterContextProps; children?: React.ReactNode; }) {
    const memedStores = React.useMemo(() => {
        const { auth, filters, search } = stores;

        return {
            auth,
            filters,
            search
        };
    }, [stores]);
    return (
        <FilterContext.Provider value={ memedStores }>
            { children }
        </FilterContext.Provider>

    );
}
