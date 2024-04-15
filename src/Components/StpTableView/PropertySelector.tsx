import { Alert, Fade, FormHelperText, Snackbar, Stack, useTheme } from '@mui/material';
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
import { VoidFn } from '../../Interfaces/Types';
import { useToggle } from '../../Hooks/useToggle';
import { useSearchParams } from 'react-router-dom';






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
    const [openAlert, show] = useToggle(false)
    const { filters } = useFilterContext();
    const [tempFilter, setTemp] = useState({ cams: filters.cams, depth: filters.depth, tags: filters.tags });
    const [search, setSearch] = useSearchParams()
    const apply = useCallback(() => {
        filters.setTags(tempFilter.tags)
        filters.setCams(tempFilter.cams)
        filters.setDepth(tempFilter.depth)
        show.on()
        const { cams, depth, tags } = filters

    }, [filters, show, tempFilter])
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


    const handleReset = useCallback((key: 'depth' | 'tags' | 'cams') => () => {
        setTemp(prev => ({ ...prev, [key]: [] }))
        filters.clearFilter(key)
        show.toggle()
        setSearch("")
    }, [filters, show])


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
                    cams={ tempFilter.cams }
                    handleChange={ handleSelectorChange('cams') }
                    handleReset={ handleReset('cams') }
                    handleApply={ apply }
                />


                { fullscreen && <FormHelperText>Сколько стекол?</FormHelperText> }

            </FormControl>
            <AlertToast
                open={ openAlert }
                onClose={ show.off }
                text='Фильтры успешно применены'
            />
        </Stack>
    )
}
)

const AlertToast = ({ open, onClose, text }: { open: boolean, onClose: VoidFn, text?: string }) => {

    return (
        <Snackbar
            open={ open }
            autoHideDuration={ 4000 }
            onClose={ onClose }
            anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
            TransitionComponent={ Fade }
        >
            <Alert
                onClose={ onClose }
                severity="success"
                variant="outlined"
                sx={ { width: '100%' } }

            >
                { text || "No Text" }
            </Alert>
        </Snackbar>
    )
}


PropertySelector.displayName = '__Property Selector'

