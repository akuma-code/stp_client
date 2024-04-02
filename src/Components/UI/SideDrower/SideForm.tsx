import { Avatar, AvatarGroup, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useFilterContext } from '../../../Hooks/useFilterContext'
import { useEffect } from 'react'
import { _log } from '../../../Helpers/helpersFns'
import { FiltersParams } from '../../../Interfaces/Types'
import { StpTag, isTag } from '../../StpTable/TableObjects'
import { AvatarS2, AvatarS3, CamAvatar } from '../CamsAvatars'
import { Form, useFetcher } from 'react-router-dom'
import { TbFilterCheck } from 'react-icons/tb'
import { _pathToUrl } from '../../../Helpers/urlpath'
import { URL } from 'url'
import { routePaths } from '../../../Routes/routePath'
import { FilterStore } from '../../../Context/Stores/FiltrationStore'
import { TagAvatarIcon } from '../TagAvatars'
import { Stp_Tags } from '../../../Interfaces/Enums'
import { toJS } from 'mobx'
import { CamsSpeedDial } from './QuickFilters'
import { AcSearch } from '../../StpTableView/AcSearch'
const depthArray = [
    24, 28, 32, 36, 40, 52
] as const
const camsArray = [1, 2] as const
export const tagsArray: (keyof typeof Stp_Tags)[] = [
    'standart',
    'simple',
    'energy',
    'hitproof',
    'multi',
    'solarproof',
    'soundproof',
] as const;
type FiltrationChangeHandler = (filter_type: keyof FiltersParams) => (event: SelectChangeEvent<FiltersParams[typeof filter_type]>, child: React.ReactNode) => void
const isNumb = (item: string | number) => typeof item === 'string' ? false : typeof item === 'number' ? true : false


const camsAvatarGroup = (selected: number[]) => {

    return (
        <AvatarGroup spacing={ 1 } sx={ { justifyContent: 'space-between', h: '2em' } }>
            { selected.map(s => {
                if (s !== 1 && s !== 2) return null
                return <CamAvatar cam_count={ s } key={ s } wh={ '1.5em' } />
            }
            ) }
        </AvatarGroup>)

}

const tagsAvatarGroup = (selected: StpTag[]) => {
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


const SideForm = observer(() => {
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
        const selected_filters = ([cams, depth, tags] as const).filter(f => f.length > 0)
        const _selected = [
            cams, tags, depth
        ]
        // _selected.filter(i => i.length > 0)
        // .sort((a, b) => b.toLocaleString().localeCompare(a.toLocaleString()))
        // .map(i => i.join("-"))

        // _log(_selected)
        await fd.set('filters', JSON.stringify(filters))

        return fd


    }






    return (
        <Paper elevation={ 3 } sx={ { width: 290, p: 2 } } >
            <Typography variant='h5' fontSize={ 19 } textAlign={ 'center' } py={ 1 }>Отфильтровать данные</Typography>
            <Divider flexItem sx={ { my: 1 } } />
            <AcSearch />
            <fetcher.Form
                id='ff'
                name='ff'
                method='post'
                // target='tabs'
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
                            handleChange={ handleChange }
                        />
                        <CamsSpeedDial />
                    </>
                    <>
                        <InputLabel id="depth-label" >Толщина ст-та</InputLabel>
                        <SelectDepth
                            depths={ filters.depth }
                            handleChange={ handleChange }
                        />
                    </>
                    <>
                        <InputLabel id="multitag-label">Свойства ст-та</InputLabel>
                        <SelectTags
                            tags={ filters.tags }
                            handleChange={ handleChange }
                        />
                    </>
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




function SelectTags({ tags, handleChange }: { tags: FilterStore['tags'], handleChange: FiltrationChangeHandler }) {
    return <Select

        variant='filled'
        multiple
        labelId="multitag-label"
        id="multitag"
        name='tags'
        value={ tags }
        onChange={ handleChange('tags') }
        input={ <OutlinedInput sx={ { fontSize: 12 } } /> }
        renderValue={ tagsAvatarGroup }
    >

        { tagsArray.map((tag) => (
            <MenuItem key={ tag } value={ tag } divider dense>
                <Checkbox checked={ tags?.includes(tag) } name={ tag + '_check' } />
                <ListItemText primary={ Stp_Tags[tag] } />
                <Avatar sx={ { height: 24, width: 24, fontSize: 15, bgcolor: '#3d9fe0' } } variant='rounded'>
                    { TagAvatarIcon[tag as StpTag] }
                </Avatar>
            </MenuItem>
        )) }
    </Select>
}

function SelectDepth({ depths, handleChange }: { depths: FilterStore['depth'], handleChange: FiltrationChangeHandler }) {
    return <Select

        multiple
        labelId="depth-label"
        name='depth'
        value={ depths }
        onChange={ handleChange('depth') }
        input={ <OutlinedInput sx={ { fontSize: 12 } } /> }
        renderValue={ (selected) => selected?.map(s => `${s} мм`).join(', ') || '' }
    >

        { depthArray.map((depth) => (
            <MenuItem key={ depth } value={ depth } divider dense>
                <Checkbox checked={ depths.includes(depth) } name={ depth + '_checkDepth' } />
                <ListItemText primary={ `${depth} мм` } />
            </MenuItem>

        )) }

    </Select>
}

function SelectCams({ cams, handleChange }: { cams: number[], handleChange: FiltrationChangeHandler }) {

    return <Select
        title='Камеры'
        multiple
        fullWidth
        labelId="cams-label"

        name='cams'
        value={ cams }
        onChange={ handleChange('cams') }
        input={ <OutlinedInput id='multitag2' sx={ { fontSize: 12 } } /> }
        MenuProps={ {
            PaperProps: {
                style: {
                    height: 130,
                    width: 130,
                },
                variant: 'outlined',
                elevation: 0,
            },
        } }
        SelectDisplayProps={ {
            style: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }
        } }
        renderValue={ camsAvatarGroup }
    >

        { camsArray.map((cam) => (
            <MenuItem key={ cam } value={ cam } divider dense>
                <Checkbox checked={ cams.includes(cam) } name={ _pathToUrl('cams_' + cam) } />
                <ListItemText primary={ `${cam + 1} стекла` } />
                <CamAvatar cam_count={ cam } wh={ '1.3em' } />
            </MenuItem>

        )) }

    </Select>
}


