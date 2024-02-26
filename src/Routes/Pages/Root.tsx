import React, { PropsWithChildren } from "react"
import { AppHeaderBreadcrump } from "./AppBar"
import { Outlet } from "react-router-dom"
import { Container, Paper } from "@mui/material"
import { useLocalStorage, useLs } from "../../Hooks/useLocalStorage"
import { _log } from "../../Helpers/helpersFns"

type RootProps = object & PropsWithChildren

export const Root: React.FC<RootProps> = () => {
    // const [tab, save] = useLs<{ version: string }>('tab_vers')


    return (
        <div className="max-w-full">

            <AppHeaderBreadcrump />

            <Outlet />
        </div>
    )
}