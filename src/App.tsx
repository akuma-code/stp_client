import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { StpItems } from "./Components/StpTable/TableObjects";
import { StpStore } from "./Context/StpStore";
import { AppContext } from "./Hooks/useStoresContext";
import { router } from "./Routes/AppRouter";
import { StpTypeProps } from "./Interfaces/Types";

type CheckboxGroup = StpTypeProps
const stores = { StpStore: new StpStore(StpItems) }


function App() {
  const [selected, setSelected] = useState<number[]>([])
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
      setType: selectType

    } }>

      <RouterProvider router={ router }
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
