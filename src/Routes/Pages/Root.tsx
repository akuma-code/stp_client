import React, { PropsWithChildren, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Bounce, ToastContainer, toast } from "react-toastify"
import { routePaths } from "../routePath"
import { MuiLink } from "./MuiLink"

type RootProps = PropsWithChildren


function FooterText() {
    return (<strong className="text-center my-auto">Sticky footer</strong>);
}


export const Root: React.FC<RootProps> = () => {
    const nav = useNavigate()
    // const { data, isLoadingError, error, isError, isSuccess } = useQuery('saved_stp_data', LazyStpData)
    // const [tab, save] = useLs<{ version: string }>('tab_vers')
    useEffect(() => {
        const notify = () => toast.success<string>(`Данные загружены успешно`, {
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
        //     if (isSuccess) notify()
        // 
    }, []
    )
    useEffect(() => {
        nav(routePaths.tabs, { replace: true })

    }, [])
    return (


        <>
            {/* <AppToolbarHeader /> */ }
            <MuiLink to={ routePaths.tabs }>Table</MuiLink>


            <Outlet />
            {/* <AppBar position="fixed" sx={ { bottom: 10, top: 'auto', height: 40 } } >
                <Toolbar>
                    <FooterText />
                </Toolbar>
            </AppBar>
            <Toolbar /> */}
            <ToastContainer
                position="top-left"
                autoClose={ 1000 }
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