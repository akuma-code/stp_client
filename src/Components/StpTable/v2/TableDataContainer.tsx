import { QueryClient, queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { observer } from 'mobx-react-lite'
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { useFilterContext } from '../../../Hooks/useFilterContext'
import { getTableDataWithQuerySearch, useLoadDataQuery } from '../../../Hooks/useLoadAllData'
import { StpDataTable } from '../../StpTableView/StpDataTable'
import { Loading, LoadingProgres, SuspenseLoad } from '../../UI/SuspenseLoad'
import { useDeferredValue } from 'react'
import { CircularProgress } from '@mui/material'
import { useQueryFiltersLoader } from '../../../Hooks/QueryHooks/useQueryFiltersLoader'


const qkey = (search?: string) => queryOptions({
    queryKey: ['stp_data_old', 'container', search ?? 'all'],
    queryFn: () => getTableDataWithQuerySearch(search),
    staleTime: 10 * 1000,
    gcTime: 10000,
})

export const loader = (qc: QueryClient) => async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const s = url.searchParams.get('s') ?? ''
    await qc.prefetchQuery(qkey())
    await qc.ensureQueryData(qkey(s))

    return qc
}


const TableDataContainer = observer(() => {

    const ld = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    // const { filters, search } = useFilterContext();
    // const def = useDeferredValue(search.query)
    const query = useQueryFiltersLoader()



    if (query.isLoading) return <LoadingProgres text='Данные загружаются ... ' />
    return (
        <>

            {
                // query.isLoading ?
                //     <LoadingProgres text='Данные загружаются ... ' />
                //     :
                query.isSuccess &&

                <StpDataTable items={ query.data } />

            }
        </>

    )
})
TableDataContainer.displayName = '__TableDataContainer'



export default TableDataContainer
