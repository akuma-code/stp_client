import { RouteObject, createBrowserRouter } from "react-router-dom";

import { StpInfoPage } from "./Pages/StpInfoPage";
import MRTDataPage from "./Pages/Tabs/MRT_DataPage";
import GoogleApiPage, { loader as ss_loader } from "./Pages/v2/GoogleApiPage";
import { RootV2 } from "./Pages/v2/RootV2";
import { apiRoute, routePaths } from "./routePath";

import TableDataContainer, { loader as tableLoader } from "../Components/StpTable/v2/TableDataContainer";
import ErrorPageV2 from "./Pages/v2/ErrorPage.v2";

import { QueryClient } from "@tanstack/react-query";
import { createRef } from "react";






export const qClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: true,
            staleTime: 10000,
            gcTime: 1000 * 60 * 5,
        },
    },
})

type RefRoute = RouteObject & { nodeRef: React.RefObject<HTMLDivElement> }
export const childrenRoutes: RefRoute[] = [
    {
        // path: routePaths.old,
        index: true,
        element: <TableDataContainer />,
        loader: tableLoader(qClient),
        errorElement: <ErrorPageV2 />,
        nodeRef: createRef<HTMLDivElement>(),
    },
    {

        path: routePaths.table,
        element: <MRTDataPage />,
        errorElement: <ErrorPageV2 />,
        nodeRef: createRef<HTMLDivElement>(),
    },
    {
        path: routePaths.info,
        element: <StpInfoPage />,
        nodeRef: createRef<HTMLDivElement>(),
    },
]
export const appRoutes_v2: RouteObject[] = [

    {
        path: routePaths.root,
        element: <RootV2 />,
        errorElement: <ErrorPageV2 />,
        children: childrenRoutes.map(route => ({
            index: route.index || route.path === '/',
            path: route.path,
            element: route.element
        }))
        //  [
        //     {
        //         // path: routePaths.old,
        //         index: true,
        //         element: <TableDataContainer />,
        //         loader: tableLoader(qClient),
        //         errorElement: <ErrorPageV2 />,

        //     },
        //     {

        //         path: routePaths.table,
        //         element: <MRTDataPage />,
        //         errorElement: <ErrorPageV2 />,
        //     },
        //     {
        //         path: routePaths.info,

        //         element: <StpInfoPage />

        //     },

        // ]
    },
    {
        path: '/' + apiRoute.api,
        errorElement: <ErrorPageV2 />,
        element: <GoogleApiPage />,
        loader: ss_loader(qClient),
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