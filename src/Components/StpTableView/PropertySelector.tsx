import { Avatar, Box, FormHelperText, IconButton, Stack, } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { lazy, useCallback, useState } from 'react';
import { MdFilterListOff } from "react-icons/md";
import { useAppContext } from '../../Hooks/useStoresContext';
import { Stp_Tags } from '../../Interfaces/Enums';
import { StpTag } from '../StpTable/TableObjects';
// import MemoAvaS2 from '../UI/Svg/AvaS2';
// import MemoAvaS3  from '../UI/Svg/AvaS3';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TagAvatarIcon } from '../UI/TagAvatars';
import { useFilterContext } from '../../Hooks/useFilterContext';
import { _isArr } from '../../Helpers/helpersFns';
import { SelectCams } from '../UI/SideDrower/SelectCams';
import { observer } from 'mobx-react-lite';
const Cam1 = lazy(() => import('../UI/Svg/AvaS2'))
const Cam2 = lazy(() => import('../UI/Svg/AvaS3'))





const ITEM_HEIGHT = 45;
export const TagsMenuProps = {
    PaperProps: {
        style: {
            height: ITEM_HEIGHT * 8 + 14,
            width: 280,
        },
    },
};
const DepthMenuProps = {
    PaperProps: {
        style: {
            height: ITEM_HEIGHT * 8 + 12,
            width: 140,
        },
    },
};
const CamsMenuProps = {
    PaperProps: {
        style: {
            height: ITEM_HEIGHT * 3 + 4,
            width: 130,
        },
    },
};
const depthArray = [
    24, 28, 32, 36, 38, 40, 52
];
const camsArray = [1, 2];
export const tagsArray: StpTag[] = [
    'standart',
    'simple',
    'energy',
    'hitproof',
    'multi',
    'solarproof',
    'soundproof',
] as const;

// export const CamsIcon = {
//     '1': <MemoAvaS2 />,
//     '2': <MemoAvaS3 />
// }

export type SelectorProps = {

    tags: StpTag[];
    cams: number[];
    depth: number[];

};


type HandleSelectProps = <T extends keyof SelectorProps>(selector: T) => (e: SelectChangeEvent<SelectorProps[T]>) => void
type FilterHandleFn = <K extends keyof SelectorProps, V extends SelectorProps[K]>(args: { prop: K, value: V }) => void
export const PropertySelector = observer(({ filteredCount }: { filteredCount: number; }) => {

    const { filters } = useFilterContext();


    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleSelectorChange: HandleSelectProps =
        (selectorType) =>
            (event) => {

                switch (selectorType) {
                    case 'tags': {
                        const { value } = event.target;
                        filters.setTags(value as StpTag[])
                        break
                    }
                    case 'cams': {
                        const { value } = event.target;
                        filters.setCams(value as number[])
                        break
                    }
                    case 'depth': {
                        const { target: { value } } = event;
                        filters.setDepth(value as number[])
                        break
                    }
                }
            }

    const camTxt = (num: number) => num === 1 ? `1 камера` : num === 2 ? `2 камеры` : '';
    const handleReset = () => {
        // filterFn(prev => ({ ...prev, cams: [], depth: [], tags: [] }))
        // setSelector(prev => ({ ...prev, cams: [], depth: [], tags: [] }))
        filters.clearFilter()

    }
    const isFilterOff = filters.cams?.length !== 1 && filters.depth?.length === 0 && filters.tags?.length === 0
    return (
        <Stack
            direction={ 'row' }
            alignContent={ 'center' }
            // py={ 1 }
            justifyContent={ 'space-around' }
            useFlexGap
            spacing={ 2 }
        // columnGap={ 2.5 }
        >
            {/* <SuspenseLoad> */ }
            {
                //*Depths
            }
            <FormControl sx={ { width: 180 } }>

                <InputLabel id="depth-label" >Толщина ст-та</InputLabel>
                <Select

                    multiple
                    labelId="depth-label"
                    name='depth-selector'
                    value={ filters.depth }
                    // onChange={ (e, v) => setDepth([+e.target.value]) }
                    onChange={ handleSelectorChange('depth' as const) }
                    input={ <OutlinedInput label="Толщина ст-та____" id='multitag2' sx={ { fontSize: 12 } } /> }
                    renderValue={ (selected) => selected?.map(s => `${s} мм`).join(', ') || '' }
                    MenuProps={ DepthMenuProps }

                >

                    { depthArray.map((d) => (
                        <MenuItem key={ d } value={ d } divider dense>
                            <Checkbox checked={ filters.depth.includes(d) } name={ d + '_checkDepth' } />
                            <ListItemText primary={ `${d} мм` } />
                        </MenuItem>

                    )) }

                </Select>
                { fullscreen && <FormHelperText>Выберете толщину</FormHelperText> }
            </FormControl>

            {
                //__Cams
            }
            <FormControl>
                <SelectCams
                    cams={ filters.cams }
                    handleChange={ handleSelectorChange('cams') }
                />


                { fullscreen && <FormHelperText>Сколько стекол?</FormHelperText> }

            </FormControl>

            <FormControl sx={ { minWidth: 200, minHeight: 90 } }>
                {                //__Tags
                }
                <InputLabel id="multitag-label">Свойства ст-та</InputLabel>
                <Select variant='outlined'
                    multiple
                    labelId="multitag-label"
                    id="multitag"
                    name='tags-select'
                    value={ filters.tags }
                    onChange={ handleSelectorChange('tags') }

                    input={ <OutlinedInput label="Свойства ст-та_____" sx={ { fontSize: 12 } } /> }
                    // renderValue={ () => `Найдено: ${filteredCount}` }
                    renderValue={ (selected) => {

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
                    } }
                    MenuProps={ TagsMenuProps }

                >

                    { tagsArray.map((tag) => (
                        <MenuItem key={ tag } value={ tag } divider dense>
                            <Checkbox checked={ filters.tags?.includes(tag) } name={ tag + '_check' } />
                            <ListItemText primary={ Stp_Tags[tag] } />
                            <Avatar sx={ { height: 24, width: 24, fontSize: 15, bgcolor: '#3d9fe0' } } variant='rounded'>
                                { TagAvatarIcon[tag as StpTag] }
                            </Avatar>
                        </MenuItem>
                    )) }
                </Select>
                { fullscreen && <FormHelperText>Выберете нужные свойства</FormHelperText> }
            </FormControl>



            <IconButton
                title='Сбросить фильтры'
                disabled={ isFilterOff }
                color='error'
                sx={ { maxHeight: '3rem', maxWidth: '3rem', my: 1.5, border: `2px solid ${!isFilterOff ? 'red' : 'inherit'} ` } }

                onClick={ handleReset }
            ><MdFilterListOff />
            </IconButton>
            {/* </SuspenseLoad> */ }
        </Stack>
    );
}
)

// const t =<InputLabel id="cams-label">Кол-во камер</InputLabel>
//                 <Select
//                     multiple
//                     labelId="cams-label"
//                     name="cams-selector"
//                     value={ filters.cams }
//                     onChange={ handleSelectorChange('cams') }
//                     input={ <OutlinedInput label="Кол-во камер____" sx={ { fontSize: 12, } } /> }
//                     renderValue={ (selected) => {
//                         return (
//                             <Box display={ 'flex' } flexDirection={ 'row' } gap={ 1 } flexWrap={ 'nowrap' } justifyContent={ 'center' }>
//                                 {                                    selected?.map(s =>
//                                         <Avatar key={ s } sx={ { height: 30, width: 30, bgcolor: '#3d9fe0' } } variant='rounded'>
//                                             { s === 1 && <Cam1 /> }
//                                             { s === 2 && <Cam2 /> }
//                                             {/* { CamsIcon[s.toString() as keyof typeof CamsIcon] } */ }
//                                         </Avatar>
//                                     )                                }
//                             </Box>
//                         )
//                     } }
//                     MenuProps={ CamsMenuProps }
//                 >
//                     {                        camsArray.map((cam) => (
//                             <MenuItem key={ cam } value={ cam } divider dense >
//                                 <Checkbox checked={ filters.cams.includes(cam) } name={ cam + '_checkCam' } />
//                                 <ListItemText primary={ camTxt(cam) } />
//                             </MenuItem>
//                         ))                    }
//                 </Select>