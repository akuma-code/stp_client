import { RouteObject, createBrowserRouter } from "react-router-dom";

import { StpInfoPage } from "./Pages/StpInfoPage";
import MRTDataPage from "./Pages/Tabs/MRT_DataPage";
import GoogleApiPage, { loader as ss_loader } from "./Pages/v2/GoogleApiPage";
import { RootV2 } from "./Pages/v2/RootV2";
import { apiRoute, routePaths } from "./routePath";

import TableDataContainer, { loader as tableLoader } from "../Components/StpTable/v2/TableDataContainer";
import ErrorPageV2 from "./Pages/v2/ErrorPage.v2";

import { QueryClient } from "@tanstack/react-query";






export const qClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 10000,
        },
    },
})



export const appRoutes_v2: RouteObject[] = [

    {
        path: routePaths.root,
        element: <RootV2 />,
        errorElement: <ErrorPageV2 />,
        children: [
            {
                // path: routePaths.old,
                index: true,
                element: <TableDataContainer />,
                loader: tableLoader(qClient),
                errorElement: <ErrorPageV2 />
            },
            {

                path: routePaths.table,
                element: <MRTDataPage />,
                errorElement: <ErrorPageV2 />,
            },
            {
                path: routePaths.info,

                element: <StpInfoPage />

            },

        ]
    },
    {
        path: apiRoute.api,
        errorElement: <ErrorPageV2 />,
        children: [

            {
                path: 'ss' as const,
                loader: ss_loader(qClient),
                element: <GoogleApiPage />
            }

        ]
    },
]


export const v2_router = createBrowserRouter(appRoutes_v2)