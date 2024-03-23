import React, { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"
import { AppHeaderBreadcrump, AppToolbarHeader } from "./AppBar"
import { useQuery } from "react-query"
import { apiRoute, proxyRoute } from "../routePath"
import { LazyStpData } from "../../Components/StpTable/FullTable"
import { Bounce, ToastContainer } from "react-toastify"
import { Box } from "@mui/system"
import { AppBar, BottomNavigation, Paper, Toolbar } from "@mui/material"

type RootProps = PropsWithChildren


function FooterText() {
    return (<strong className="text-center my-auto">Sticky footer</strong>);
}


export const Root: React.FC<RootProps> = () => {

    const { data, isLoadingError, error, isError } = useQuery('saved_stp_data', LazyStpData)
    // const [tab, save] = useLs<{ version: string }>('tab_vers')


    return (
        <div className="pb-0">


            <AppToolbarHeader />

            <Outlet />
            <>
                <AppBar position="fixed" sx={ { bottom: 10, top: 'auto', height: 40 } } >
                    <Toolbar>
                        <FooterText />
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </>
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
        </div>
    )
}

//TODO: переделать маршрутизацию на табы
//TODO: настроить инфинит квери