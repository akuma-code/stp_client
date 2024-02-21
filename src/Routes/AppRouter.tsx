import { RouteObject, createBrowserRouter } from "react-router-dom";
import { ComparePage } from "./Pages/ComparePage";
import { ErrorPage } from "./Pages/ErrorPage";
import { OverView } from "./Pages/OverView";
import { Root } from "./Pages/Root";
import { routePaths } from "./routePath";
import { PrintPage } from "./Pages/PrintPage";

export const appRoutes: RouteObject[] = [
    {
        path: routePaths.root,
        element: <Root />,
        id: 'root',
        errorElement: <ErrorPage />,
        children: [
            {
                element: <OverView />,
                index: true
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