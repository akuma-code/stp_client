
import { Paper } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import { MemoStpTable, StpData } from '../../Components/StpTableView/StpDataTable'
import { SuspenseLoad } from '../../Components/UI/SuspenseLoad'
import { useStpFilter } from '../../Hooks/useCompare'
import { useIdSelector } from '../../Hooks/useIdSelector'
import { useAppContext } from '../../Hooks/useStoresContext'



const isJson = (i: any) => JSON.parse(i) ? true : false
export const OverView = () => {
    const { StpStore, query, filterParams, select } = useAppContext()
    const [selected, action] = useIdSelector()
    const string_data = useLoaderData() as string

    // const { error, isError, isLoading, stp } = useQueryFetch(proxyRoute(apiRoute.stp_db))

    // const ssd = stp.map((item, idx) => ({ ...item, id: idx + 1, uid: _ID() }))
    // console.log('ss', ss)


    const memodata = useMemo(() => {
        // const ssdata = ss.stp.map((item, idx) => ({ ...item, id: idx + 1, uid: _ID() }))

        const res: StpData[] = isJson(string_data) ? JSON.parse(string_data) : []

        StpStore.loadTable(res)


        return res
    }, [StpStore, string_data])

    const filtered = useStpFilter(memodata, query, filterParams)
    useEffect(() => {
        select(selected)
    }, [select, selected])
    return (
        <Paper sx={ { pb: 0, m: 1, bgcolor: 'beige', height: '100%' } } elevation={ 4 }>

            {
                // isLoading
                //     ?
                //     <Loading text='Данные загружаются...' />
                //     :
                // isError
                //     ?

                //     <MemoStpTable preload_data={ memodata } />
                //     :
                <>

                    <SuspenseLoad loadText='Данные по стеклопакетам загружаются...'>
                        <MemoStpTable
                            items={ filtered }
                            selectedItems={ selected }
                            selectorActions={ action }
                        />

                    </SuspenseLoad>
                </>
            }
        </Paper>
    )
}















const onRender = (
    id: string,
    phase: 'mount' | 'update' | "nested-update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: Set<{ id: number; name: string; timestamp: number }>
) => {
    console.log('Profiler:', {
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
    })
}