import React, { PropsWithChildren } from "react"
import { AppHeaderBreadcrump } from "./AppBar"
import { Outlet } from "react-router-dom"
import { Container, Paper } from "@mui/material"

type RootProps = object & PropsWithChildren

export const Root: React.FC<RootProps> = () => {



    return (
        <div className="max-w-full">

            <AppHeaderBreadcrump />

            <Outlet />
        </div>
    )
}