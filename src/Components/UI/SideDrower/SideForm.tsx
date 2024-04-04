import { Avatar, AvatarGroup, Box, Button, Divider, FormControl, FormControlLabel, InputLabel, Paper, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useFilterContext } from '../../../Hooks/useFilterContext'
import { useEffect } from 'react'
import { _log } from '../../../Helpers/helpersFns'
import { FiltersParams } from '../../../Interfaces/Types'
import { StpTag, isTag } from '../../StpTable/TableObjects'
import { AvatarS2, AvatarS3, CamAvatar } from '../CamsAvatars'
import { Form, useFetcher } from 'react-router-dom'
import { TbFilterCheck } from 'react-icons/tb'
import { URL } from 'url'
import { routePaths } from '../../../Routes/routePath'
import { TagAvatarIcon } from '../TagAvatars'
import { Stp_Tags } from '../../../Interfaces/Enums'
import { toJS } from 'mobx'
import { CamsSpeedDial } from './QuickFilters'
import { AcSearch } from '../../StpTableView/AcSearch'
import Toaster from '../Toaster/Toaster'
import { SelectTags } from './SelectTags'
import { SelectDepth } from './SelectDepth'
import { SelectCams } from './SelectCams'
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


export const camsAvatarGroup = (selected: number[]) => {

    return (
        <AvatarGroup spacing={ 1 } sx={ { justifyContent: 'space-between', h: '2em' } }>
            { selected.map(s => {
                if (s !== 1 && s !== 2) return null
                return <CamAvatar cam_count={ s } key={ s } wh={ '1.5em' } />
            }
            ) }
        </AvatarGroup>)

}

export const tagsAvatarGroup = (selected: StpTag[]) => {
    return (
        <Box display={ 'flex' } flexDirection={ 'row' } gap={ 1 } flexWrap={ 'nowrap' } margin={ 0 }>
            {
                selected?.map(s =>
                    <Avatar key={ s } sx={ { height: 24, width: 24, fontSize: 15, bgcolor: '#3d9fe0' } } variant='rounded'>
                        { TagAvatarIcon[s as StpTag] }
                    </Avatar>
                ) }
        </Box>
    )
}


const SideForm = observer(({ onClose }: { onClose?: () => void }) => {
    const { filters } = useFilterContext()
    const fetcher = useFetcher()
    const handleChange: FiltrationChangeHandler = (selector) => (e, child) => {
        const { value } = e.target
        if (typeof value === 'string') return _log(value)
        switch (selector) {
            case 'tags': {
                const tags = e.target.value as StpTag[]
                filters.setTags(tags)
                break
            }
            case 'depth': {
                const { value } = e.target
                filters.setDepth(value as number[])
                break
            }
            case 'cams': {
                const { value } = e.target
                filters.setCams(value as number[])
                break
            }
        }

    }
    const handleSubmit = async () => {
        const { cams, tags, depth } = filters
        const fd = new FormData()

        fd.set('filters', JSON.stringify({ cams, tags, depth }))

        await fetcher.submit(fd)
        onClose && onClose()


    }






    return (
        <Paper elevation={ 3 } sx={ { width: 290, p: 2 } } >
            <Typography variant='h5' fontSize={ 19 } textAlign={ 'center' } py={ 1 }>Отфильтровать данные</Typography>
            <Divider flexItem sx={ { my: 1 } } />
            <AcSearch />
            <fetcher.Form
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
                            cams={ filters.cams }
                            handleChange={ handleChange('cams') }
                        />
                        {/* <CamsSpeedDial /> */ }
                    </>
                    <>
                        <InputLabel id="depth-label" >Толщина ст-та</InputLabel>
                        <SelectDepth
                            depths={ filters.depth }
                            handleChange={ handleChange('depth') }
                        />
                    </>
                    <>
                        <InputLabel id="multitag-label">Свойства ст-та</InputLabel>
                        <SelectTags
                            tags={ filters.tags }
                            handleChange={ handleChange('tags') }
                        />
                    </>
                    <Button
                        color='success'
                        variant='contained'
                        fullWidth
                        onClick={ () => filters.clearFilter() }
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
            </fetcher.Form>
        </Paper>
    )
})
SideForm.displayName = "__SideForm"
export default SideForm





