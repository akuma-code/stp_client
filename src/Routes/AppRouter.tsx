import { RouteObject, createBrowserRouter } from "react-router-dom";
import { ComparePage } from "./Pages/ComparePage";
import { ErrorPage } from "./Pages/ErrorPage";
import { OverView } from "./Pages/OverView";
import { Root } from "./Pages/Root";
import { routePaths } from "./routePath";
import { PrintPage } from "./Pages/PrintPage";
import { GetStpData, table_data_all } from "../Components/StpTable/FullTable";
import { StpData } from "../Components/DataTable/StpDataTable";
import { StpIdPage } from "./Pages/StpIdPage";
import { StpInfoPage } from "./Pages/StpInfoPage";

export type StpDataLoad = Omit<StpData, 'id'>




export const appRoutes: RouteObject[] = [
    {
        path: routePaths.root,
        element: <Root />,
        id: 'root',
        errorElement: <ErrorPage />,

        children: [
            {
                index: true,
                element: <OverView />,
                loader: async ({ request, params }) => {
                    const fetch_data = GetStpData()
                    // const data: StpData[] = table_data_all.map((item, idx) => ({ ...item, id: idx + 1 }))
                    const data = fetch_data.map((item, idx) => ({ ...item, id: idx + 1 }))

                    console.count("Data load: ")
                    console.log(data.length)

                    return JSON.stringify(data)
                },
                errorElement: <ErrorPage />,

            },
            {
                path: routePaths.stp_id,
                element: <StpIdPage />,
                loader: ({ request, params }) => {
                    // console.log('request', request)
                    const id = params.id ? +params.id : -1
                    // const item =
                    // console.log('params', { id })
                    return { id }
                },
                // lazy () {
                //     const { table_data_preset } = await import('./../Components/StpTable/FullTable')
                //     return PrintPage
                // },
            },
            {
                path: routePaths.compare,
                element: <ComparePage />
            },
            {
                path: routePaths.export,
                element: <PrintPage />
            },
            {
                path: routePaths.stp_info,
                element: <StpInfoPage />

            }
        ]
    }
]


export const router = createBrowserRouter(appRoutes)