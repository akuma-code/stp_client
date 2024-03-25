import React, { PropsWithChildren, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { AppHeaderBreadcrump, AppToolbarHeader } from "./AppBar"
import { useQuery } from "react-query"
import { apiRoute, proxyRoute } from "../routePath"
import { LazyStpData } from "../../Components/StpTable/FullTable"
import { Bounce, ToastContainer, toast } from "react-toastify"
import { Box } from "@mui/system"
import { AppBar, BottomNavigation, Container, Paper, Toolbar } from "@mui/material"

type RootProps = PropsWithChildren


function FooterText() {
    return (<strong className="text-center my-auto">Sticky footer</strong>);
}


export const Root: React.FC<RootProps> = () => {

    const { data, isLoadingError, error, isError, isSuccess } = useQuery('saved_stp_data', LazyStpData)
    // const [tab, save] = useLs<{ version: string }>('tab_vers')
    useEffect(() => {
        const notify = () => toast.success<string>(`Данные загружены успешно, элементов: ${data?.length}`, {
            // position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        if (isSuccess) notify()
    }, [data?.length, isSuccess])
    return (


        <>
            <AppToolbarHeader />



            <Outlet />
            {/* <AppBar position="fixed" sx={ { bottom: 10, top: 'auto', height: 40 } } >
                <Toolbar>
                    <FooterText />
                </Toolbar>
            </AppBar>
            <Toolbar /> */}
            <ToastContainer
                position="top-left"
                autoClose={ 3000 }
                hideProgressBar={ false }
                newestOnTop
                closeOnClick
                rtl={ false }
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={ Bounce } />
        </>
    )
}

//TODO: переделать маршрутизацию на табы
//TODO: настроить инфинит квери