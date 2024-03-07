import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { table_data_all } from "./Components/StpTable/FullTable";
import { StpStore } from "./Context/StpStore";
import { FiltersParams } from "./Hooks/useFiltration";
import { AppContext } from "./Hooks/useStoresContext";
import { StpTypeProps } from "./Interfaces/Types";
import { router } from "./Routes/AppRouter";


const stores = { StpStore: new StpStore(table_data_all) }


function App() {
  const [selected, setSelected] = useState<number[]>([])
  const [fcount, setFc] = useState<number>(0)
  const [tags, setTags] = useState<string[]>([])

  const [querySearch, setQuery] = useState("")

  const [filters, setFilters] = useState<Partial<FiltersParams>>({ cams: [], depth: [], tags: [] })
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
      filterParams: filters, filterFn: setFilters
    } }>

      <RouterProvider
        router={ router }
        fallbackElement={
          <div className="text-4xl text-center mt-6">
            <strong>App loading.... Be patient</strong>
          </div>
        }

      />


    </AppContext.Provider>
  );
}

export default App;
