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


    const handleReset = () => {
        // filterFn(prev => ({ ...prev, cams: [], depth: [], tags: [] }))
        // setSelector(prev => ({ ...prev, cams: [], depth: [], tags: [] }))
        filters.clearFilter()

    }
    const resetDepth = () => {
        filters.clearFilter('depth')
    }

    return (
        <Stack
            direction={ 'row' }
            alignContent={ 'center' }
            columnGap={ 5 }
        >
            <AcSearch />
            <FormControl sx={ { width: 180 } }>

                <InputLabel id="depth-label" >Толщина ст-та</InputLabel>
                <SelectDepth
                    handleChange={ handleSelectorChange('depth') }
                    handleReset={ resetDepth }
                    depths={ filters.depth }
                />
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

            <FormControl sx={ { minWidth: 200, position: 'relative' } }>
                {
                    //__Tags
                }
                <InputLabel id="multitag-label">Свойства ст-та</InputLabel>
                <SelectTags
                    tags={ filters.tags }
                    handleChange={ handleSelectorChange('tags') }
                    handleReset={ () => filters.clearFilter('tags') }
                />

                { fullscreen && <FormHelperText>Выберете нужные свойства</FormHelperText> }
            </FormControl>



            {/* <IconButton
                title='Сбросить фильтры'
                disabled={ isFilterOff }
                color='error'
                sx={ { maxHeight: '3rem', maxWidth: '3rem', my: 1.5, border: `2px solid ${!isFilterOff ? 'red' : 'inherit'} ` } }

                onClick={ handleReset }
            ><MdFilterListOff />
            </IconButton> */}
            {/* </SuspenseLoad> */ }
        </Stack>
    )
}
)

PropertySelector.displayName = '__Property Selector'

