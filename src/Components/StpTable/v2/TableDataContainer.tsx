import { QueryClient, queryOptions } from '@tanstack/react-query'
import { observer } from 'mobx-react-lite'
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { useQueryFiltersLoader } from '../../../Hooks/QueryHooks/useQueryFiltersLoader'
import { getAllTableData, getTableDataWithQuerySearch } from '../../../Hooks/useLoadAllData'
import { StpDataTable } from '../../StpTableView/StpDataTable'
import { Loading } from '../../UI/SuspenseLoad'


const qkey = (search?: string) => queryOptions({
    queryKey: ['stp_data', 'prefetch', search ?? 'all'],
    queryFn: () => getTableDataWithQuerySearch(search),
    staleTime: 10 * 1000,
    gcTime: 10000,
})

export const loader = (qc: QueryClient) => async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const s = url.searchParams.get('s') ?? ''
    await qc.prefetchQuery({
        queryKey: ['stp_data', 'prefetch'],
        queryFn: getAllTableData,
    })

    await qc.ensureQueryData({
        queryKey: ['stp_data', 'prefetch'],
        queryFn: getAllTableData,
    })
    const data = qc.getQueryData(['stp_data', 'prefetch'])
    return data
}


const TableDataContainer = observer(() => {

    const ld = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    // const { filters, search } = useFilterContext();
    // const def = useDeferredValue(search.query)
    const query = useQueryFiltersLoader()



    if (query.isPending) return <Loading text='Данные загружаются ... ' />
    return (
        <>

            {

                query.isSuccess ?

                    <StpDataTable items={ query.data } />
                    :
                    <Loading text='Данные загружаются ... ' />
            }
        </>

    )
})
TableDataContainer.displayName = '__TableDataContainer'



export default TableDataContainer
