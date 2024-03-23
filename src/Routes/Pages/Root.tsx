import React, { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"
import { AppHeaderBreadcrump, AppToolbarHeader } from "./AppBar"
import { useQuery } from "react-query"
import { apiRoute, proxyRoute } from "../routePath"
import { LazyStpData } from "../../Components/StpTable/FullTable"
import { Bounce, ToastContainer } from "react-toastify"

type RootProps = PropsWithChildren

export const Root: React.FC<RootProps> = () => {

    const { data, isLoadingError, error, isError } = useQuery('saved_stp_data', LazyStpData)
    // const [tab, save] = useLs<{ version: string }>('tab_vers')


    return (
        <div className="max-w-full">


            <AppToolbarHeader />
            <ToastContainer position="top-center"
                autoClose={ 5000 }
                hideProgressBar={ false }
                newestOnTop
                closeOnClick
                rtl={ false }
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={ Bounce } />
            <Outlet />
        </div>
    )
}

//TODO: переделать маршрутизацию на табы
//TODO: настроить инфинит квери