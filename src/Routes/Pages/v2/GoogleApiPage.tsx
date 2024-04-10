import React from 'react'
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { TStpData } from '../../../Hooks/useQueryFetch'
import { _ID } from '../../../Helpers/helpersFns'
import { QueryClient } from '@tanstack/react-query'
import { api } from '../../../HTTP/mainApi'
import { apiRoute, proxyRoute, routePaths } from '../../routePath'
import { Button } from '@mui/material'
import { MuiLink } from '../MuiLink'



export const loader = (queryClient: QueryClient) => async ({ request }: LoaderFunctionArgs) => {
    const context = await queryClient.ensureQueryData({
        queryKey: ['google_api'],
        queryFn: async () => api.get<{ stps: TStpData[], fields: string[] }>(proxyRoute(apiRoute.stp_db))
    })
    return context

}

export default function GoogleApiPage() {
    const { data } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>


    return (
        <div>
            <Button variant='text' ><MuiLink to={ routePaths.v2 }>Back to v2</MuiLink></Button>
            <p className='p-2'>

                Data:
                { data?.stps?.map(s =>
                    <li key={ _ID() }>{ s.join("-") }</li>
                ) }
            </p>
        </div>
    )
}
