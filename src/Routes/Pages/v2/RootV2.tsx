import React, { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"
import { AppbarV2 } from "./AppBarV2"



type RootProps = PropsWithChildren


export const RootV2: React.FC<RootProps> = () => {



    return (
        <>
            <AppbarV2 />

            <Outlet />
        </>
    )
}

