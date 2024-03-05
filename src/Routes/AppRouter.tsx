import { RouteObject, createBrowserRouter } from "react-router-dom";
import { ComparePage } from "./Pages/ComparePage";
import { ErrorPage } from "./Pages/ErrorPage";
import { OverView } from "./Pages/OverView";
import { Root } from "./Pages/Root";
import { routePaths } from "./routePath";
import { PrintPage } from "./Pages/PrintPage";
import { table_data_preset } from "../Components/StpTable/FullTable";
import { StpData } from "../Components/DataTable/StpDataTable";

export type StpDataLoad = Omit<StpData, 'id'>



function stp_loader({ request }: { request: Request, params: Record<string, string> }) {
    const data: StpDataLoad[] = table_data_preset
    console.count("Data load: ")
    console.log(data.length)
    const res = new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json; utf-8",
        },
    });
    return new Promise<StpDataLoad[]>(() => res)
}
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
                loader: ({ request, params }) => {
                    const data: StpData[] = table_data_preset.map((item, idx) => ({ ...item, id: idx + 1 }))

                    console.count("Data load: ")
                    console.log(data.length)
                    // const res = new Response(JSON.stringify(data), {
                    //     status: 200,
                    //     headers: {
                    //         "Content-Type": "application/json; utf-8",
                    //     },
                    // });
                    const resp = JSON.stringify(data)
                    // console.log('data', { data })
                    return resp
                },

            },
            {
                path: routePaths.compare,
                element: <ComparePage />
            },
            {
                path: routePaths.export,
                element: <PrintPage />
            }
        ]
    }
]


export const router = createBrowserRouter(appRoutes)