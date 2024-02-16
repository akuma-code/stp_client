import React from "react";
import { AppContext } from "./Hooks/useStoresContext";
import { StpContext } from "./Context/StpContext";
import { StpItems } from "./Components/StpTable/TableObjects";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/AppRouter";
import { AppHeaderBreadcrump } from "./Routes/Pages/AppBar";


const stores = { StpContext: new StpContext(StpItems) }


function App() {




  return (
    <AppContext.Provider value={ {
      ...stores
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
