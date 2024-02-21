import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { StpItems } from "./Components/StpTable/TableObjects";
import { StpStore } from "./Context/StpStore";
import { AppContext } from "./Hooks/useStoresContext";
import { router } from "./Routes/AppRouter";
import { StpTypeProps } from "./Interfaces/Types";
import { table_data_preset } from "./Components/StpTable/FullTable";

type CheckboxGroup = StpTypeProps
const stores = { StpStore: new StpStore(table_data_preset) }


function App() {
  const [selected, setSelected] = useState<number[]>([])
  const [fcount, setFc] = useState<number>(0)
  const [selectedType, selectType] = useState<CheckboxGroup>({
    energy: false,
    hitproof: false,
    multi: false,
    simple: false,
    solarproof: false,
    soundproof: false
  })


  return (
    <AppContext.Provider value={ {
      ...stores,
      selectedItems: selected,
      select: setSelected,
      _type: selectedType,
      setType: selectType,
      filteredItemsCount: fcount,
      setFcount: setFc

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
