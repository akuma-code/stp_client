import React, { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"
import { AppHeaderBreadcrump, AppToolbarHeader } from "./AppBar"

type RootProps = object & PropsWithChildren

export const Root: React.FC<RootProps> = () => {
    // const [tab, save] = useLs<{ version: string }>('tab_vers')


    return (
        <div className="max-w-full">

            {/* <AppHeaderBreadcrump /> */ }
            <AppToolbarHeader />
            <Outlet />
        </div>
    )
}