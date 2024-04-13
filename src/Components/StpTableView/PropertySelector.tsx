import { FormHelperText, Stack, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { SelectChangeEvent } from '@mui/material/Select';
import useMediaQuery from '@mui/material/useMediaQuery';
import { observer } from 'mobx-react-lite';
import { useFilterContext } from '../../Hooks/useFilterContext';
import { StpTag } from '../StpTable/TableObjects';
import { SelectCams } from '../UI/SideDrower/SelectCams';
import { SelectDepth } from '../UI/SideDrower/SelectDepth';
import { SelectTags } from '../UI/SideDrower/SelectTags';
import { AcSearch } from './AcSearch';
import { useCallback, useState } from 'react';






const ITEM_HEIGHT = 45;
export const TagsMenuProps = {
    PaperProps: {
        style: {
            height: ITEM_HEIGHT * 8 + 14,
            width: 280,
        },
    },
};

export const tagsArray: StpTag[] = [
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

};


type HandleSelectProps = <T extends keyof SelectorProps>(selector: T) => (e: SelectChangeEvent<SelectorProps[T]>) => void

export const PropertySelector = observer(() => {

    const { filters } = useFilterContext();
    const [tempFilter, setTemp] = useState({ cams: filters.cams, depth: filters.depth, tags: filters.tags });

    const apply = useCallback(() => {
        filters.setTags(tempFilter.tags)
        filters.setCams(tempFilter.cams)
        filters.setDepth(tempFilter.depth)
    }, [filters, tempFilter.cams, tempFilter.depth, tempFilter.tags])
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleSelectorChange: HandleSelectProps =
        (selectorType) =>
            (event) => {

                switch (selectorType) {
                    case 'tags': {
                        const { value } = event.target;
                        setTemp(prev => ({ ...prev, tags: value as StpTag[] }))
                        // filters.setTags(value as StpTag[])
                        break
                    }
                    case 'cams': {
                        const { value } = event.target;
                        setTemp(prev => ({ ...prev, cams: value as number[] }))
                        // filters.setCams(value as number[])
                        break
                    }
                    case 'depth': {
                        const { target: { value } } = event;
                        setTemp(prev => ({ ...prev, depth: value as number[] }))
                        // filters.setDepth(value as number[])
                        break
                    }
                }
            }


    const handleReset = useCallback((key: 'depth' | 'tags') => () => {
        setTemp(prev => ({ ...prev, [key]: [] }))
        filters.clearFilter(key)

    }, [filters])


    return (
        <Stack
            direction={ 'row' }
            alignContent={ 'center' }
            columnGap={ 6 }
        >
            <AcSearch />
            <FormControl sx={ { width: 180 } }>

                <InputLabel id="depth-label" >Толщина ст-та</InputLabel>
                <SelectDepth
                    handleChange={ handleSelectorChange('depth') }
                    handleReset={ handleReset('depth') }
                    handleApply={ apply }
                    depths={ tempFilter.depth }
                />
                { fullscreen && <FormHelperText>Выберете толщину</FormHelperText> }
            </FormControl>

            {
                //__Cams
            }


            <FormControl sx={ { minWidth: 200, position: 'relative' } }>
                {
                    //__Tags
                }
                <InputLabel id="multitag-label">Свойства ст-та</InputLabel>
                <SelectTags
                    tags={ tempFilter.tags }
                    handleChange={ handleSelectorChange('tags') }
                    handleApply={ apply }
                    handleReset={ handleReset('tags') }
                />

                { fullscreen && <FormHelperText>Выберете нужные свойства</FormHelperText> }
            </FormControl>
            <FormControl>
                <InputLabel>Камеры</InputLabel>
                <SelectCams
                    cams={ filters.cams }
                    handleChange={ handleSelectorChange('cams') }
                />


                { fullscreen && <FormHelperText>Сколько стекол?</FormHelperText> }

            </FormControl>

        </Stack>
    )
}
)

PropertySelector.displayName = '__Property Selector'

