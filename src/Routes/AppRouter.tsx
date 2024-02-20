import { RouteObject, createBrowserRouter } from "react-router-dom";
import { ComparePage } from "./Pages/ComparePage";
import { ErrorPage } from "./Pages/ErrorPage";
import { OverView } from "./Pages/OverView";
import { Root } from "./Pages/Root";
import { routePaths } from "./routePath";

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
            }
        ]
    }
]


export const router = createBrowserRouter(appRoutes)