import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { table_data_preset } from "./Components/StpTable/FullTable";
import { StpStore } from "./Context/StpStore";
import { AppContext } from "./Hooks/useStoresContext";
import { StpTagsList, StpTypeProps } from "./Interfaces/Types";
import { router } from "./Routes/AppRouter";

type CheckboxGroup = StpTypeProps
const stores = { StpStore: new StpStore(table_data_preset) }


function App() {
  const [selected, setSelected] = useState<number[]>([])
  const [fcount, setFc] = useState<number>(0)
  const [tags, setTags] = useState<string[]>([])
  const [selectedType, selectType] = useState<CheckboxGroup>({
    energy: false,
    hitproof: false,
    multi: false,
    simple: false,
    solarproof: false,
    soundproof: false
  })
  const [querySearch, setQuery] = useState("")

  return (
    <AppContext.Provider value={ {
      ...stores,
      selectedItems: selected,
      select: setSelected,
      _type: selectedType,
      setType: selectType,
      filteredItemsCount: fcount,
      setFcount: setFc,
      query: querySearch,
      setQuery: setQuery,
      selectedTags: tags, setTags
    } }>

      <RouterProvider
        router={ router }
        fallbackElement={
          <div className="text-4xl text-center">
            <strong>App loading.... Be patient</strong>
          </div>
        }

      />


    </AppContext.Provider>
  );
}

export default App;
