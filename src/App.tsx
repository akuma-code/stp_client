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
import { queryClient } from ".";
import { v2_router } from "./Routes/AppRouter";



configure({
  useProxies: "always",
  enforceActions: 'observed'
});
const stores = { StpStore: new StpStore(table_data_base) }
// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//       refetchOnWindowFocus: false,
//     },
//   },
// })
const filterStores = {
  filters: new FilterStore({ selectMax: 6 }),
  search: new SearchQueryStore(),
  auth: new AuthStore(['root'])
}

// const v2_router = createBrowserRouter(appRoutes_v2)
function App() {



  return (

    <QueryClientProvider client={ queryClient }>


      <AppContext.Provider value={ {
        ...stores,

      } }
      >

        <FilterContext.Provider value={ { ...filterStores } }>

          <RouterProvider
            router={ v2_router }
            fallbackElement={
              <div className="text-4xl text-center mt-6">
                <strong>App loading.... Be patient</strong>
              </div>
            }

          />

          <ReactQueryDevtools initialIsOpen={ false } position="bottom" />
        </FilterContext.Provider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
