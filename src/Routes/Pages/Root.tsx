import React, { PropsWithChildren, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Bounce, ToastContainer, toast } from "react-toastify"
import { routePaths } from "../routePath"
import { MuiLink } from "./MuiLink"

type RootProps = PropsWithChildren


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

    }, [nav])
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

        </>
    )
}

