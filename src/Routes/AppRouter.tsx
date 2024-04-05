import { RouteObject, createBrowserRouter, json } from "react-router-dom";
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
import TabContainer from "./Pages/Tabs/TabContainer";
import { _log } from "../Helpers/helpersFns";
import { StpTag } from "../Components/StpTable/TableObjects";
import MRT_Container from "../Components/StpTable/MRT/MRT_Container";
import MRTDataPage from "./Pages/Tabs/MRT_DataPage";





export type StpDataLoad = Omit<StpData, 'id'>



export const appRoutes: RouteObject[] = [
    {
        path: routePaths.root,
        element: <Root />,
        id: 'root',
        errorElement: <ErrorPage />,

        children: [


            // {
            //     path: routePaths.tabs,
            //     element: <TabPage />,
            //     children: [

            //     ],
            // },

            {
                path: routePaths.compare,
                element: <ComparePage />,

            },
            // {
            //     path: routePaths.export,
            //     element: <PrintPage />
            // },
            {
                path: routePaths.stp_info,
                element: <StpInfoPage />

            }
        ],
    },
    {
        path: routePaths.tabs,
        element: <TabPage initTab={ 0 } />,
        loader: async ({ request, params }) => {
            const url = new URL(request.url)


            const lazy_data = await LazyStpData()
            const data = lazy_data.map((item, idx) => ({ ...item, id: idx + 1 }))
            console.count("Data load: ")
            console.log(data.length)
            return data
        },
        action: async ({ request, params, context }) => {
            const fd = await request.formData()
            // _log(request)


            const o = Object.fromEntries(fd)

            return o
        },
        errorElement: <ErrorPage />,
        children: [
            {
                path: routePaths.table,
                element: <TabContainer />,

            },
            {
                path: routePaths.compare,
                element: <ComparePage />
            },
        ]


    },
    {
        path: routePaths.v2,
        element: <TabPage initTab={ 3 } />,
        children: [
            {
                path: routePaths.table,
                element: <MRTDataPage />,

            },
            {
                path: routePaths.compare,
                element: <ComparePage />
            },
        ]

    }

]


export const router = createBrowserRouter(appRoutes)