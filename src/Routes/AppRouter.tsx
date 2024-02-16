import { RouteObject, createBrowserRouter } from "react-router-dom";
import { routePaths } from "./routePath";
import { Root } from "./Pages/Root";
import { ErrorPage } from "./Pages/ErrorPage";
import { StpDataTable } from "../Components/DataTable/StpDataTable";
import { OverView } from "./Pages/OverView";

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
            }
        ]
    }
]


export const router = createBrowserRouter(appRoutes)