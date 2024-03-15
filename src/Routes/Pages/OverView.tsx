import { Paper } from '@mui/material'
import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import { StpData, StpDataTable, isJson } from '../../Components/DataTable/StpDataTable'
import { SuspenseLoad } from '../../Components/UI/SuspenseLoad'
import { useAppContext } from '../../Hooks/useStoresContext'

type OverviewProps = object

export const OverView = (props: OverviewProps) => {
    const { StpStore } = useAppContext()
    const data = useLoaderData() as string
    const memodata = useMemo(() => {
        const res: StpData[] = isJson(data) ? JSON.parse(data) : []
        StpStore.loadTable(res)
        return res
    }, [StpStore, data])

    return (
        <Paper sx={ { pb: 0, m: 1, bgcolor: 'beige', height: '100%' } } elevation={ 4 }>
            <SuspenseLoad             >

                {/* <Profiler id='table' onRender={ onRender }> */ }

                {/* <MemoStpTable preload_data={ memodata } /> */ }
                {/* </Profiler> */ }
                <StpDataTable preload_data={ memodata } />
            </SuspenseLoad>
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