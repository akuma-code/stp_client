import { RouteObject, createBrowserRouter } from "react-router-dom";
import { LazyStpData } from "../Components/StpTable/FullTable";
import { StpData, StpDataTable } from "../Components/StpTableView/StpDataTable";
import { ComparePage } from "./Pages/ComparePage";
import { ErrorPage } from "./Pages/ErrorPage";
import { OverView } from "./Pages/OverView";
import { PrintPage } from "./Pages/PrintPage";
import { Root } from "./Pages/Root";
import { StpInfoPage } from "./Pages/StpInfoPage";
import { routePaths } from "./routePath";
import { TabPage } from "./Pages/Tabs/TabPage";




export type StpDataLoad = Omit<StpData, 'id'>



export const appRoutes: RouteObject[] = [
    {
        path: routePaths.root,
        element: <Root />,
        id: 'root',
        errorElement: <ErrorPage />,

        children: [
            {
                path: routePaths.root,
                // index: true,
                element: <TabPage />,
                loader: async ({ request, params }) => {
                    const lazy_data = await LazyStpData()
                    const data = lazy_data.map((item, idx) => ({ ...item, id: idx + 1 }))
                    console.count("Data load: ")
                    console.log(data.length)
                    return JSON.stringify(data)
                },
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: routePaths.table,

                    },
                    {
                        path: routePaths.compare,
                        element: <ComparePage />
                    },
                ]


            },

            {
                path: routePaths.tabs,
                element: <TabPage />,
                children: [

                ],
            },

            {
                path: routePaths.compare,
                element: <ComparePage />,

            },
            {
                path: routePaths.export,
                element: <PrintPage />
            },
            {
                path: routePaths.stp_info,
                element: <StpInfoPage />

            }
        ],

    },

]


export const router = createBrowserRouter(appRoutes)