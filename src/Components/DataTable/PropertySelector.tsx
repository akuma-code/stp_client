import { Avatar, Box, FormHelperText, IconButton, Stack, } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useCallback, useState } from 'react';
import { MdFilterListOff } from "react-icons/md";
import { useAppContext } from '../../Hooks/useStoresContext';
import { Stp_Tags } from '../../Interfaces/Enums';
import { StpTag } from '../StpTable/TableObjects';
import { MemoAvaS2 } from '../UI/Svg/AvaS2';
import { MemoAvaS3 } from '../UI/Svg/AvaS3';
import { TagAvatarIcon } from '../UI/TagAvatars';

import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery'

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
            height: ITEM_HEIGHT * 7 + 7,
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
    24, 28, 32, 36, 40, 52
];
const camsArray = [1, 2];
export const tagsArray: (keyof typeof Stp_Tags)[] = [
    'standart',
    'simple',
    'energy',
    'hitproof',
    'multi',
    'solarproof',
    'soundproof',
] as const;



export type SelectorProps = {

    tags: StpTag[];
    cams: number[];
    depth: number[];
    order?: (keyof SelectorProps)[]
};

export function PropertySelector({ filteredCount }: { filteredCount: number; }) {
    const { filterFn, filterParams } = useAppContext();
    const [selectors, setSelector] = useState<Partial<SelectorProps>>({ ...filterParams, cams: [1, 2] });
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.up('md'));
    const handleSelectorChange = useCallback((selectorType: keyof SelectorProps) => (event: SelectChangeEvent<SelectorProps[keyof SelectorProps]>) => {

        switch (selectorType) {
            case 'tags': {
                const { value } = event.target;
                setSelector(prev => ({ ...prev, tags: value as StpTag[] }))
                filterFn(prev => ({ ...prev, tags: value as StpTag[] }))
                break
            }
            case 'cams': {
                const { value } = event.target;

                setSelector(prev => ({ ...prev, cams: value as number[] }))
                filterFn(prev => ({ ...prev, cams: value as number[] }))
                break
            }
            case 'depth': {
                const { value } = event.target;
                setSelector(prev => ({ ...prev, depth: value as number[] }))
                filterFn(prev => ({ ...prev, depth: value as number[] }))
                break
            }
        }
    }, [filterFn]);

    const camTxt = (num: number) => num === 1 ? `1 камера` : num === 2 ? `2 камеры` : '';
    const handleReset = () => {
        filterFn(prev => ({ ...prev, cams: [], depth: [], tags: [] }))
        setSelector(prev => ({ ...prev, cams: [], depth: [], tags: [] }))

    }
    const isFilterOff = selectors.cams?.length === 0 && selectors.depth?.length === 0 && selectors.tags?.length === 0
    return (
        <Stack
            direction={ 'row' }
            alignContent={ 'center' }
            // py={ 1 }
            justifyContent={ 'space-around' }
            useFlexGap
            spacing={ 4 }
        // columnGap={ 2.5 }
        >

            {
                //*Depths
            }
            <FormControl sx={ { width: 180 } }>
                <InputLabel id="depth-label" >Толщина ст-та</InputLabel>
                <Select

                    multiple
                    labelId="depth-label"
                    name='depth-selector'
                    value={ selectors.depth }
                    onChange={ handleSelectorChange('depth') }
                    input={ <OutlinedInput label="Толщина ст-та____" id='multitag2' sx={ { fontSize: 12 } } /> }

                    renderValue={ (selected) => selected?.map(s => `${s} мм`).join(', ') || '' }
                    MenuProps={ DepthMenuProps }

                >

                    { depthArray.map((depth) => (
                        <MenuItem key={ depth } value={ depth } divider dense>
                            <Checkbox checked={ selectors.depth?.includes(depth) } name={ depth + '_checkDepth' } />
                            <ListItemText primary={ `${depth} мм` } />
                        </MenuItem>

                    )) }

                </Select>
                { fullscreen && <FormHelperText>Выберете толщину</FormHelperText> }
            </FormControl>

            {
                //*Cams
            }
            <FormControl sx={ { width: 130 } }>

                <InputLabel id="cams-label">Кол-во камер</InputLabel>
                <Select
                    multiple
                    labelId="cams-label"
                    name="cams-selector"
                    value={ selectors.cams }
                    onChange={ handleSelectorChange('cams') }
                    input={ <OutlinedInput label="Кол-во камер____" sx={ { fontSize: 12, } } /> }

                    renderValue={ (selected) => {
                        return (
                            <Box display={ 'flex' } flexDirection={ 'row' } gap={ 1 } flexWrap={ 'nowrap' } justifyContent={ 'center' }>
                                {
                                    selected?.map(s =>

                                        <Avatar key={ s } sx={ { height: 30, width: 30, bgcolor: '#3d9fe0' } } variant='rounded'>
                                            { s === 1 && <MemoAvaS2 /> }
                                            { s === 2 && <MemoAvaS3 /> }
                                        </Avatar>

                                    ) }


                            </Box>
                        )
                    } }
                    MenuProps={ CamsMenuProps }

                >

                    { camsArray.map((cam) => (
                        <MenuItem key={ cam } value={ cam } divider dense >
                            <Checkbox checked={ selectors?.cams?.includes(cam) } name={ cam + '_checkCam' } />
                            <ListItemText primary={ camTxt(cam) } />
                        </MenuItem>
                    )) }
                </Select>
                { fullscreen && <FormHelperText>Сколько камер?</FormHelperText> }

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
                    value={ selectors.tags }
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
                                            {/* <SvgIcon >                                            </SvgIcon> */ }
                                        </Avatar>

                                    ) }


                            </Box>
                        )
                    } }
                    MenuProps={ TagsMenuProps }

                >

                    { tagsArray.map((tag) => (
                        <MenuItem key={ tag } value={ tag } divider dense>
                            <Checkbox checked={ selectors?.tags?.includes(tag) } name={ tag + '_check' } />
                            <ListItemText primary={ Stp_Tags[tag] } />
                            <Avatar sx={ { height: 24, width: 24, fontSize: 15, bgcolor: '#3d9fe0' } } variant='rounded'>
                                { TagAvatarIcon[tag as StpTag] }
                                {/* <SvgIcon >                                            </SvgIcon> */ }
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
        </Stack>
    );
}
