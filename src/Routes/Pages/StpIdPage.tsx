import React from 'react'
import { useLoaderData } from 'react-router-dom'

type Props = {}

export const StpIdPage = (props: Props) => {
    const { id } = useLoaderData() as { id: number }
    return (
        <div>StpIdPage { id }</div>
    )
}