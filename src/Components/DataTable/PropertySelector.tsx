import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppContext } from '../../Hooks/useStoresContext';
import { Stp_Tags } from '../../Interfaces/Enums';
import { ListSubheader, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Filters, FiltersParams } from '../../Hooks/useFiltration';
import { StpTags } from '../StpTable/TableObjects';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
export const TagsMenuProps = {
    PaperProps: {
        style: {
            height: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
            width: 240,
        },
    },
};
const DepthMenuProps = {
    PaperProps: {
        style: {
            height: ITEM_HEIGHT * 12 + 5,
            width: 140,
        },
    },
};
const CamsMenuProps = {
    PaperProps: {
        style: {
            height: ITEM_HEIGHT * 3 - 10,
            width: 140,
        },
    },
};
const depthArray = [
    24, 28, 36, 40, 52
];
const camsArray = [1, 2];
export const tagsArray: (keyof typeof Stp_Tags)[] = [
    'energy',
    'hitproof',
    'multi',
    'simple',
    'solarproof',
    'soundproof'
] as const;



export type SelectorProps = {

    tags: StpTags[];
    cams: number[];
    depth: number[];
    order?: (keyof SelectorProps)[]
};

export function PropertySelector({ filteredCount }: { filteredCount: number; }) {
    const [selectors, setSelector] = useState<SelectorProps>({ tags: [], depth: [], cams: [] });
    const { filterFn } = useAppContext();

    const handleSelectorChange = (selectorType: keyof SelectorProps) => (event: SelectChangeEvent<SelectorProps[keyof SelectorProps]>) => {

        switch (selectorType) {
            case 'tags': {
                const { value } = event.target;
                setSelector(prev => ({ ...prev, tags: value as StpTags[] }))
                filterFn(prev => ({ ...prev, tags: value as StpTags[] }))
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
    };

    // useEffect(() => {
    //     filterFn(prev => ({ ...prev, ...selectors }) as FiltersParams)
    //     return () => reset()
    // }, [filterFn, selectors])
    const camTxt = (num: number) => num === 1 ? `1 камера` : num === 2 ? `2 камеры` : '';
    return (
        <Stack direction={ 'row' } alignContent={ 'baseline' } py={ 1 } >

            <FormControl sx={ { m: 1, width: 200 } }>
                <InputLabel id="multitag-label">Свойства ст-та</InputLabel>
                <Select

                    multiple
                    labelId="multitag-label"
                    id="multitag"
                    name='tags-select'
                    value={ selectors.tags }
                    onChange={ handleSelectorChange('tags') }
                    input={ <OutlinedInput label="Свойства ст-та_____" sx={ { fontSize: 12 } } /> }
                    renderValue={ () => `Найдено: ${filteredCount}` }
                    // renderValue={ (selected) => selected.map(s => Stp_Tags[s as keyof typeof Stp_Tags]).join(' | ') }
                    MenuProps={ TagsMenuProps }

                >

                    { tagsArray.map((tag) => (
                        <MenuItem key={ tag } value={ tag } divider dense>
                            <Checkbox checked={ selectors.tags.indexOf(tag) > -1 } name={ tag + '_check' } />
                            <ListItemText primary={ Stp_Tags[tag] } />
                        </MenuItem>
                    )) }
                </Select>
            </FormControl>

            <FormControl sx={ { m: 1, width: 150 } }>
                <InputLabel id="depth-label" >Толщина ст-та</InputLabel>
                <Select
                    multiple
                    labelId="depth-label"
                    name='depth-selector'
                    value={ selectors.depth }
                    onChange={ handleSelectorChange('depth') }
                    input={ <OutlinedInput label="Толщина ст-та____" id='multitag2' sx={ { fontSize: 12 } } /> }
                    renderValue={ () => `Найдено: ${filteredCount}` }
                    MenuProps={ DepthMenuProps }

                >

                    <ListSubheader> depth </ListSubheader>
                    { depthArray.map((depth) => (
                        <MenuItem key={ depth } value={ depth } divider dense>
                            <Checkbox checked={ selectors.depth.indexOf(depth) > -1 } name={ depth + '_checkDepth' } />
                            <ListItemText primary={ `${depth} мм` } />
                        </MenuItem>

                    )) }
                    {/* <ListSubheader> cams </ListSubheader>
                    { camsArray.map((cam) => (
                        <MenuItem key={ cam } value={ cam } divider dense>
                            <Checkbox checked={ selectors.cams.indexOf(cam) > -1 } name={ cam + '_checkCam' } />
                            <ListItemText primary={ camTxt(cam) } />
                        </MenuItem>
                    )) } */}

                </Select>

            </FormControl>

            <FormControl sx={ { m: 1, width: 150 } }>
                <InputLabel id="cams-label">Кол-во камер</InputLabel>
                <Select
                    multiple
                    labelId="cams-label"
                    name="cams-selector"
                    value={ selectors.cams }
                    onChange={ handleSelectorChange('cams') }
                    input={ <OutlinedInput label="Кол-во камер____" sx={ { fontSize: 12 } } /> }
                    renderValue={ () => `Найдено: ${filteredCount}` }
                    // renderValue={ (selected) => selected.map(s => Stp_Tags[s as keyof typeof Stp_Tags]).join(' | ') }
                    MenuProps={ CamsMenuProps }

                >

                    { camsArray.map((cam) => (
                        <MenuItem key={ cam } value={ cam } divider dense>
                            <Checkbox checked={ selectors.cams.indexOf(cam) > -1 } name={ cam + '_checkCam' } />
                            <ListItemText primary={ camTxt(cam) } />
                        </MenuItem>
                    )) }


                </Select>

            </FormControl>

        </Stack>
    );
}
