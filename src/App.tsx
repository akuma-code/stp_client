import { RouterProvider } from "react-router-dom";
import { table_data_base } from "./Components/StpTable/Data/data_base";
import { StpStore } from "./Context/StpStore";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { configure } from "mobx";
import { AuthStore } from "./Context/Stores/AuthStore";
import { FilterStore } from "./Context/Stores/FiltrationStore";
import { SearchQueryStore } from "./Context/Stores/SearchQueryStore";
import { FilterContext } from "./Hooks/useFilterContext";
import { AppContext } from "./Hooks/useStoresContext";

import { QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { indexQueryClient } from ".";
import { v2_router } from "./Routes/AppRouter";


//  --max_old_space_size=4096
configure({
  useProxies: "always",
  enforceActions: 'observed'
});
const stores = { StpStore: new StpStore(table_data_base) }

const filterStores = {
  filters: new FilterStore({ selectMax: 6 }),
  search: new SearchQueryStore(),
  auth: new AuthStore(['root'])
}

// const v2_router = createBrowserRouter(appRoutes_v2)
function App() {
  const memedStores = useMemo(() => {
    const { auth, filters, search, stp_store } = {
      filters: new FilterStore({ selectMax: 6 }),
      search: new SearchQueryStore(),
      auth: new AuthStore(['root']),
      stp_store: new StpStore(table_data_base)
    }
    return {
      auth, filters, search, stp_store
    }
  }, [])


  return (

    <QueryClientProvider client={ indexQueryClient }>


      <AppContext.Provider value={ {
        StpStore: memedStores.stp_store
      } }
      >

        <FilterContext.Provider value={ { ...memedStores } }>
          {/* <MobxProvider stores={ { ...filterStores } }> */ }

          <RouterProvider
            router={ v2_router }
            fallbackElement={
              <div className="text-4xl text-center mt-6">
                <strong>App loading.... Be patient</strong>
              </div>
            }

          />

          <ReactQueryDevtools initialIsOpen={ false } position="bottom" />
          {/* </MobxProvider> */ }
        </FilterContext.Provider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
