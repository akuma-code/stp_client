import { Outlet, RouteObject, createBrowserRouter, json, redirect } from "react-router-dom";
import { LazyStpData } from "../Components/StpTable/FullTable";
import { StpData, StpDataTable } from "../Components/StpTableView/StpDataTable";
import { ComparePage } from "./Pages/ComparePage";
import { ErrorPage } from "./Pages/ErrorPage";
import { OverView } from "./Pages/OverView";
import { PrintPage } from "./Pages/PrintPage";
import { Root } from "./Pages/Root";
import { StpInfoPage } from "./Pages/StpInfoPage";
import { apiRoute, routePaths } from "./routePath";
import { TabPage } from "./Pages/Tabs/TabPage";
import TabContainer from "./Pages/Tabs/TabContainer";
import { _log } from "../Helpers/helpersFns";
import { StpTag } from "../Components/StpTable/TableObjects";
import MRT_Container from "../Components/StpTable/MRT/MRT_Container";
import MRTDataPage from "./Pages/Tabs/MRT_DataPage";
import Example from "./Pages/Example";
import { RootV2 } from "./Pages/v2/RootV2";









export const appRoutes: RouteObject[] = [
    {
        path: routePaths.root,
        element: <Root />,
        id: 'root',
        errorElement: <ErrorPage />,

        children: [
            {
                path: routePaths.v1,
                // loader: () => redirect(routePaths.tabs, 200),
                element: <TabPage initTab={ 0 } />,
                children: [


                    // {
                    //     path: routePaths.tabs,
                    //     // index: true,
                    //     element: <TabPage initTab={ 0 } />,

                    // },

                    {
                        path: routePaths.compare,
                        element: <ComparePage />,

                    },
                    // {
                    //     path: routePaths.export,
                    //     element: <PrintPage />
                    // },
                ],
            },
        ],
    },
    {
        path: routePaths.stp_info,
        element: <StpInfoPage />

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
        element: <RootV2 />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: routePaths.table,
                element: <MRTDataPage />,

            },
            {
                path: routePaths.compare,
                element: <ComparePage />
            },
            {
                path: routePaths.info,

                element: <StpInfoPage />

            },
            {
                path: apiRoute.api,
                children: [
                    {
                        path: apiRoute.auth
                    },
                    {
                        path: apiRoute.login
                    },
                    {
                        path: apiRoute.register
                    }

                ]
            },
        ]

    },
    {
        path: 'ex',
        element: <Example />
    }
]



const appRoutes_v2: RouteObject[] = [
    {
        path: routePaths.root,
        element: <Root />,
        id: 'root',
        errorElement: <ErrorPage />,
        children: [
            {
                path: routePaths.v1,
                element: <TabPage initTab={ 0 } />,
                children: [
                    {
                        path: routePaths.compare,
                        element: <ComparePage />,

                    },
                ],
            },
            {
                path: routePaths.stp_info,
                element: <StpInfoPage />

            },
        ],
    },
    {
        path: routePaths.v2,
        element: <RootV2 />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: routePaths.table,
                element: <MRTDataPage />,

            },
            {
                path: routePaths.compare,
                element: <ComparePage />
            },
            {
                path: routePaths.info,

                element: <StpInfoPage />

            },

        ]
    },
    {
        path: apiRoute.api,
        errorElement: <ErrorPage />,
        children: [
            {
                path: apiRoute.auth
            },
            {
                path: apiRoute.login,
                action: async ({ request }) => {
                    const form = await request.formData()
                    const res = Object.fromEntries(form)
                    console.log('%cresponse: ', 'color: red; background-color: beige; font-size: 1.5em', res)
                    return res
                },
            },
            {
                path: apiRoute.register
            }

        ]
    },
]

export const router = createBrowserRouter(appRoutes)
export const v2_router = createBrowserRouter(appRoutes_v2)