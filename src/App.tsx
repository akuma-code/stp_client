import React from "react";
import { AppContext } from "./Hooks/useStoresContext";
import { StpContext } from "./Context/StpContext";
import { StpItems } from "./Components/StpTable/TableObjects";


const stores = { StpContext: new StpContext(StpItems) }


function App() {




  return (
    <AppContext.Provider value={ {
      ...stores
    } }>

      <div className="mx-5">
        <ol>

          { stores.StpContext.table.map(stp =>
            <li className="bg-red-500"
              key={ stp.name }>{ stp.name } { "=>" } { stp.cams } камера</li>
          ) }
        </ol>
      </div>
    </AppContext.Provider>
  );
}

export default App;
