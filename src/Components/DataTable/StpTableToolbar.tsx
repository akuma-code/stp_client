import { Box, Button, Divider, Icon, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { useAppContext } from '../../Hooks/useStoresContext';
import { PropertySelector } from './PropertySelector';
import { SelectedTagList } from './SelectedTagList';
interface TableToolbarProps {
    numSelected: number;
    numFiltered: number
}
type FilterVariant = 'search' | 'tags' | 'none' | null
export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {
    const { setQuery, query, setTags, select, selectedTags, filterParams, filterFn } = useAppContext()

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
            </Box>
            <Divider orientation='vertical' flexItem />
            <Box width={ '25%' } component={ Stack } direction={ 'row' } alignItems={ 'center' } flexGrow={ 1 } justifyContent={ 'space-between' }>
                { filterView === 'search' &&
                    <Box
                        columnGap={ 2 }
                        component={ Stack }
                        direction={ 'row' }
                        alignItems={ 'baseline' }>

                        <TextField
                            name='search_query'
                            helperText='Начните вводить формулу стеклопакета....'
                            placeholder='формула стеклопакета'
                            autoFocus
                            size='medium'
                            variant='outlined'
                            inputMode='search'
                            margin='normal'
                            sx={ { width: 300, mx: 2, textAlign: 'center', color: 'black', } }
                            onChange={ (e) => filterFn(prev => ({ ...prev, query: e.target.value })) }
                            value={ query }


                        />
                        <Button
                            color='error'
                            onClick={ () => filterFn(prev => ({ ...prev, query: "" })) }
                            startIcon={ <MdOutlineCancel /> }
                        >
                            очистить
                        </Button>

                    </Box>
                }
                {
                    filterView === 'tags' &&
                    <Stack direction={ 'row' } gap={ 3 } justifyContent={ 'space-between' } flexGrow={ 1 }>

                        <SelectedTagList tags={ selectedTags } />
                        <PropertySelector filteredCount={ numFiltered } />
                    </Stack>

                }
            </Box>


            <Divider orientation='vertical' flexItem />


            <Box width={ '25%' } paddingLeft={ { lg: 10, sm: 2 } }>
                <ToggleButtonGroup
                    exclusive
                    value={ filterView }
                    onChange={ handleChangeView }
                    size='small'
                    sx={ {
                        [`& .MuiToggleButton-root`]: { bgcolor: 'green', color: 'white' },
                        [`& .MuiToggleButton-root.MuiToggleButtonGroup-middleButton`]: { borderLeft: '1px solid black', borderRight: '2px solid black' },
                        [`& .MuiToggleButton-root:hover`]: { bgcolor: '#a6f5a6', color: 'black' },
                    } }

                >
                    <ToggleButton
                        value={ 'search' }
                        // onChange={ handleChangeView }
                        selected={ filterView === 'search' }
                    >фильтрация по названию
                    </ToggleButton>
                    <ToggleButton
                        value={ 'tags' }
                        // onChange={ handleChangeView }
                        selected={ filterView === 'tags' }
                    >Фильтрация по свойствам
                    </ToggleButton>
                    <ToggleButton
                        value={ 'none' }
                        // onChange={ handleChangeView }
                        defaultChecked
                        selected={ filterView === 'none' }
                    >
                        <Icon color='error'>
                            <MdOutlineCancel />
                        </Icon>
                    </ToggleButton>

                </ToggleButtonGroup>
            </Box>












        </Toolbar>
    );
}









