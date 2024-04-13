import { Button, Divider, InputLabel, Paper, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { TbFilterCheck } from 'react-icons/tb'
import { Form, useFetcher, useSubmit } from 'react-router-dom'
import { _log } from '../../../Helpers/helpersFns'
import { useFilterContext } from '../../../Hooks/useFilterContext'
import { Stp_Tags } from '../../../Interfaces/Enums'
import { FiltersParams } from '../../../Interfaces/Types'
import { StpTag } from '../../StpTable/TableObjects'
import { AcSearch } from '../../StpTableView/AcSearch'
import { SelectCams } from './SelectCams'
import { SelectDepth } from './SelectDepth'
import { SelectTags } from './SelectTags'
import { useState } from 'react'
export const depthArray = [
    24, 28, 32, 36, 38, 40, 52
] as const
export const camsArray = [1, 2] as const
export const tagsArray: (keyof typeof Stp_Tags)[] = [
    'standart',
    'simple',
    'energy',
    'hitproof',
    'multi',
    'solarproof',
    'soundproof',
] as const;
export type FiltrationChangeHandler = (filter_type: keyof FiltersParams) => (event: SelectChangeEvent<FiltersParams[typeof filter_type]>, child: React.ReactNode) => void
const isNumb = (item: string | number) => typeof item === 'string' ? false : typeof item === 'number' ? true : false


const SideForm = observer(({ onClose }: { onClose?: () => void }) => {
    const { filters } = useFilterContext()
    const [defFilters, setFilters] = useState({ cams: filters.cams, depth: filters.depth, tags: filters.tags })
    const submit = useSubmit()

    const handleChange: FiltrationChangeHandler = (selector) => (e, child) => {
        const { value } = e.target
        if (typeof value === 'string') return _log(value)
        switch (selector) {
            case 'tags': {
                const tags = e.target.value as StpTag[]
                // filters.setTags(tags)
                setFilters(prev => ({ ...prev, tags: tags }))
                break
            }
            case 'depth': {
                const { value } = e.target
                // filters.setDepth(value as number[])
                setFilters(prev => ({ ...prev, depth: value as number[] }))
                break
            }
            case 'cams': {
                const { value } = e.target
                // filters.setCams(value as number[])
                setFilters(prev => ({ ...prev, cams: value as number[] }))
                break
            }
        }

    }
    const handleSubmit = async () => {
        // const { cams, tags, depth } = filters
        filters.setCams(defFilters.cams)
        filters.setDepth(defFilters.depth)
        filters.setTags(defFilters.tags)
        const fd = new FormData()

        fd.set('filters', JSON.stringify(defFilters))

        submit(fd)
        onClose && onClose()


    }



    const clearFilters = () => {
        filters.clearFilter()
        setFilters(prev => ({ cams: [], depth: [], tags: [] }))
    }


    return (
        <Paper elevation={ 3 } sx={ { width: 290, p: 2 } } >
            <Typography variant='h5' fontSize={ 19 } textAlign={ 'center' } py={ 1 }>Отфильтровать данные</Typography>
            <Divider flexItem sx={ { my: 1 } } />
            <AcSearch />
            <Form
                id='ff'
                name='ff'

                target='form'
                onSubmit={ handleSubmit }
            >
                <Stack direction={ 'column' }
                    spacing={ 2 }
                    divider={ <Divider flexItem sx={ { my: 1 } } /> }
                >
                    <>
                        <InputLabel id='cams-label'>Кол-во стекол</InputLabel>
                        <SelectCams
                            cams={ defFilters.cams }
                            handleChange={ handleChange('cams') }
                        />
                        {/* <CamsSpeedDial /> */ }
                    </>
                    <>
                        <InputLabel id="depth-label" >Толщина ст-та</InputLabel>
                        {/* <SelectDepth
                            depths={ defFilters.depth }
                            handleChange={ handleChange('depth') }
                            handleReset={ () => filters.clearFilter('depth') }
                        /> */}
                    </>
                    <>
                        <InputLabel id="multitag-label">Свойства ст-та</InputLabel>
                        {/* <SelectTags
                            tags={ defFilters.tags }
                            handleChange={ handleChange('tags') }
                            handleReset={ () => filters.clearFilter('tags') }
                        /> */}
                    </>
                    <Button
                        color='success'
                        variant='contained'
                        fullWidth
                        onClick={ clearFilters }
                        startIcon={ <TbFilterCheck /> }
                    >
                        Сбросить
                    </Button>
                    <Button
                        color='warning'
                        variant='contained'
                        fullWidth
                        type='submit'
                        startIcon={ <TbFilterCheck /> }

                    >
                        Применить
                    </Button>
                </Stack>
                <Divider />
            </Form>
        </Paper>
    )
})
SideForm.displayName = "__SideForm"
export default SideForm





