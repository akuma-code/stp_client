import React, { PropsWithChildren, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Bounce, ToastContainer, toast } from "react-toastify"
import { routePaths } from "../routePath"
import { MuiLink } from "./MuiLink"
import { AppToolbarHeader } from "./AppBar"

type RootProps = PropsWithChildren


export const Root: React.FC<RootProps> = () => {
    const nav = useNavigate()
    // const { data, isLoadingError, error, isError, isSuccess } = useQuery('saved_stp_data', LazyStpData)
    // const [tab, save] = useLs<{ version: string }>('tab_vers')
    // useEffect(() => {
    //     const notify = () => toast.success<string>(`Redirect to /v2`, {
    //         // position: "bottom-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         transition: Bounce,
    //     });
    //     //     if (isSuccess) notify()
    //     notify()
    // }, []
    // )
    useEffect(() => {
        // nav(routePaths.v2,)

    }, [])
    return (


        <>
            <AppToolbarHeader />



            <Outlet />
            {/* <MuiLink to={ routePaths.v2 } >go to { routePaths.v2 }</MuiLink> */ }
            {/* <AppBar position="fixed" sx={ { bottom: 10, top: 'auto', height: 40 } } >
                <Toolbar>
                    <FooterText />
                </Toolbar>
            </AppBar>
            <Toolbar /> */}

        </>
    )
}

