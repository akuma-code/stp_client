import { CircularProgress, Paper } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import { MemoStpTable, StpData, StpDataTable } from '../../Components/StpTableView/StpDataTable'
import { Loading, SuspenseLoad } from '../../Components/UI/SuspenseLoad'
import { useAppContext } from '../../Hooks/useStoresContext'
import { useQueryFetch } from '../../Hooks/useQueryFetch'
import { _ID } from '../../Helpers/helpersFns'
import { useStpFilter } from '../../Hooks/useCompare'

type OverviewProps = object
const isJson = (i: any) => JSON.parse(i) ? true : false
export const OverView = (props: OverviewProps) => {

    const data = useLoaderData() as string
    const { error, isError, isLoading, stp } = useQueryFetch()
    const ssd = stp.map((item, idx) => ({ ...item, id: idx + 1, uid: _ID() }))
    // console.log('ss', ss)
    const { StpStore, query, filterParams } = useAppContext()


    const memodata = useMemo(() => {
        // const ssdata = ss.stp.map((item, idx) => ({ ...item, id: idx + 1, uid: _ID() }))

        const res: StpData[] = isJson(data) ? JSON.parse(data) : []
        StpStore.loadTable(res)
        return StpStore.table
    }, [StpStore, data])
    // useEffect(() => {
    //     if (ss.isError) alert("Data fetching error, loaded backuped data")
    // }, [ss.isError])
    const filtered = useStpFilter(memodata, query, filterParams)

    return (
        <Paper sx={ { pb: 0, m: 1, bgcolor: 'beige', height: '100%' } } elevation={ 4 }>

            {
                isLoading
                    ?
                    <Loading text='Данные загружаются...' />
                    :
                    isError
                        ?

                        <MemoStpTable preload_data={ memodata } />
                        :
                        <MemoStpTable preload_data={ filtered } />
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