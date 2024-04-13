import { RouteObject, type LoaderFunctionArgs } from "react-router-dom";
import { LazyStpData } from "../Components/StpTable/FullTable";
import { ComparePage } from "./Pages/ComparePage";
import { ErrorPage } from "./Pages/ErrorPage";
import Example from "./Pages/Example";
import { Root } from "./Pages/Root";
import { StpInfoPage } from "./Pages/StpInfoPage";
import MRTDataPage from "./Pages/Tabs/MRT_DataPage";
import TabContainer from "./Pages/Tabs/TabContainer";
import { TabPage } from "./Pages/Tabs/TabPage";
import { RootV2 } from "./Pages/v2/RootV2";
import { apiRoute, routePaths } from "./routePath";




export const appRoutes_v1: RouteObject[] = [
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
        loader: async ({ request, params }: LoaderFunctionArgs) => {
            const url = new URL(request.url);


            const lazy_data = await LazyStpData();
            const data = lazy_data.map((item, idx) => ({ ...item, id: idx + 1 }));
            console.count("Data load: ");
            console.log(data.length);
            return data;
        },
        action: async ({ request, params, context }) => {
            const fd = await request.formData();
            // _log(request)
            const o = Object.fromEntries(fd);

            return o;
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
];
