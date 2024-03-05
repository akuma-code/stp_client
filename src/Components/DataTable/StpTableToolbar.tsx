import { Box, Divider, Stack } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useAppContext } from '../../Hooks/useStoresContext';
import { AcSearch } from './AcSearch';
import { PropertySelector } from './PropertySelector';
import { SelectedTagList } from './SelectedTagList';
interface TableToolbarProps {
    numSelected: number;
    numFiltered: number
}

type FilterVariant = 'search' | 'tags' | 'none' | null

export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {
    const { setQuery, setTags, select, selectedTags, filterParams, filterFn } = useAppContext()

    const [value, setValue] = useState<string | null>("");
    // const [inputValue, setInputValue] = useState('');
    const [filterView, setFilterView] = useState<FilterVariant>(null)

    function handleChangeView(e: React.MouseEvent<HTMLElement, MouseEvent>, v: FilterVariant): void {

        setFilterView(prev => v)
        switch (v) {
            case 'tags': {
                setQuery(prev => "")
                filterFn(prev => ({ ...prev, query: "" }))
                select([])
                break
            }
            case 'search': {
                setTags([])
                select([])
                break
            }
            case 'none': {
                filterFn(prev => ({ ...prev, query: "" }))
                setQuery(prev => "")
                select([])
                setTags([])
                break
            }

        }

    }

    return (
        <Toolbar component={ Stack } direction={ 'row' }
            sx={ {
                // display: 'flex',
                // flexDirection: 'row',
                height: 100,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            } }
        >


            <Box width={ '25%' }>
                { numSelected > 0 ?

                    <Typography
                        // sx={ { flex: '1 1 33%' } }
                        textAlign={ 'left' }
                        color="inherit"
                        variant="body1"
                        component="div"
                        id="tableTitle"

                    >
                        { numSelected > 0 ? `${numSelected} выбрано` : `Выбрать стеклопакет для сравнения (не более 5!)` }
                    </Typography>
                    :
                    <AcSearch />
                }
            </Box>
            <Divider orientation='vertical' flexItem />
            <Stack direction={ 'row' } gap={ 3 } justifyContent={ 'space-between' } flexGrow={ 1 }>

                <PropertySelector filteredCount={ numFiltered } />
                <SelectedTagList { ...filterParams } />
            </Stack>


        </Toolbar>
    );
}









