import React, { PropsWithChildren, useRef } from "react"
import { Outlet, useLocation, useOutlet } from "react-router-dom"
import { AppbarV2 } from "./AppBarV2"
import { childrenRoutes } from "../../AppRouter"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import '../v2/styles/transition.css'
import { useIsFetching } from "@tanstack/react-query"


type RootProps = PropsWithChildren


export const RootV2: React.FC<RootProps> = () => {

    const CurrentOutlet = useOutlet()
    const location = useLocation()
    const { nodeRef } = childrenRoutes.find(route => route.path === location.pathname) ?? {}
    const cssRef = useRef<HTMLDivElement | null>(null)
    return (
        <>
            <AppbarV2 />
            <SwitchTransition>


                <CSSTransition
                    key={ location.pathname }
                    nodeRef={ nodeRef }
                    timeout={ 300 }
                    classNames={ "page" }
                    unmountOnExit
                >
                    {
                        (state) => {

                            return (<div ref={ cssRef } className="page">
                                { CurrentOutlet }
                            </div>)
                        }
                    }

                    {/* <Outlet /> */ }
                </CSSTransition>
            </SwitchTransition>
        </>
    )
}

