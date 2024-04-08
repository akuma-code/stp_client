import React, { PropsWithChildren, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Bounce, ToastContainer, toast } from "react-toastify"
import { routePaths } from "../../routePath"
import { AppbarV2 } from "./AppBarV2"



type RootProps = PropsWithChildren


export const RootV2: React.FC<RootProps> = () => {
    const nav = useNavigate()

    useEffect(() => {
        nav(routePaths.table, { replace: true, })

    }, [])
    return (
        <>
            <AppbarV2 />
            <Outlet />
        </>
    )
}

