import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { table_data_base } from "./Components/StpTable/Data/data_base";
import { StpStore } from "./Context/StpStore";
import { QueryClient, QueryClientProvider, useQuery, } from "@tanstack/react-query";

import { AppContext } from "./Hooks/useStoresContext";
import { FiltersParams, } from "./Interfaces/Types";
import { router } from "./Routes/AppRouter";
import { apiRoute, proxyRoute, routePaths } from "./Routes/routePath";
import { AppToolbarHeader } from "./Routes/Pages/AppBar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const stores = { StpStore: new StpStore(table_data_base) }
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,



    },
  },

})

function App() {
  const [selected, setSelected] = useState<number[]>([])
  const [fcount, setFc] = useState<number>(0)
  const [tags, setTags] = useState<string[]>([])
  const [querySearch, setQuery] = useState("")
  const [filters, setFilters] = useState<Partial<FiltersParams>>({ cams: [1, 2], depth: [], tags: [] })


  return (


    <AppContext.Provider value={ {
      ...stores,
      selectedItems: selected,
      select: setSelected,
      filteredItemsCount: fcount,
      setFcount: setFc,
      query: querySearch,
      setQuery: setQuery,
      selectedTags: tags, setTags,
      filterParams: filters,
      filterFn: setFilters
    } }
    >
      <QueryClientProvider client={ queryClient } >

        <RouterProvider
          router={ router }
          fallbackElement={
            <div className="text-4xl text-center mt-6">
              <strong>App loading.... Be patient</strong>
            </div>
          }

        />

        <ReactQueryDevtools initialIsOpen={ false } position="bottom" />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
