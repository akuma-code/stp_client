import { Box, Divider, Icon, IconButton, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useAppContext } from '../../Hooks/useStoresContext';
import { TagSelector } from './StpFilterForm';
import { MdOutlineCancel } from "react-icons/md";
import { SelectedTagList } from './SelectedTagList';
interface TableToolbarProps {
    numSelected: number;
    numFiltered: number
}
type FilterVariant = 'search' | 'tags' | 'none' | null
export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {
    const { setQuery, query, setTags, select, selectedTags } = useAppContext()

    const [filterView, setFilterView] = useState<FilterVariant>(null)

    function handleChangeView(e: React.MouseEvent<HTMLElement, MouseEvent>, v: FilterVariant): void {

        setFilterView(prev => v)
        switch (v) {
            case 'tags': {
                setQuery(prev => "")
                select([])
                break
            }
            case 'search': {
                setTags([])
                select([])
                break
            }
            case 'none': {
                setQuery(prev => "")
                select([])
                setTags([])
                break
            }

        }

    }

    return (
        <Toolbar component={ Stack }
            sx={ {
                display: 'flex',
                flexDirection: 'row',
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
            <Box width={ '33%' } margin={ 'auto' } component={ Stack } direction={ 'row' } alignItems={ 'center' }>
                { filterView === 'search' &&
                    <Box
                        columnGap={ 2 }
                        component={ Stack }
                        direction={ 'row' }
                        alignItems={ 'normal' }>

                        <TextField
                            name='search_query'
                            helperText='Начните вводить название....'
                            placeholder='формула стеклопакета'
                            autoFocus
                            size='small'
                            variant='filled'
                            inputMode='text'
                            margin='normal'
                            sx={ { width: 300, mx: 2, textAlign: 'center', color: 'black', } }
                            onChange={ (e) => setQuery(prev => e.target.value) }
                            value={ query }

                        />
                        <IconButton color='error' sx={ { pointerEvents: 'all' } } size='large' onClick={ () => setQuery("") }>
                            <MdOutlineCancel />
                        </IconButton>
                    </Box>
                }
                {
                    filterView === 'tags' &&
                    <Box component={ Stack } direction={ 'row' } justifyContent={ 'space-between' } gap={ 3 }>
                        <TagSelector filteredCount={ numFiltered } />
                        <SelectedTagList tags={ selectedTags } />
                    </Box>

                }
            </Box>


            <Divider orientation='vertical' flexItem />


            <Box width={ '33%' } paddingLeft={ { lg: 10, sm: 2 } }>
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











{/* <Box>

                    <StpTagsForm open={ showTags } />

                    <Button variant='contained' color='success'
                        endIcon={ showTags
                            ? <FaAnglesRight />
                            : <FaAnglesLeft />
                        }
                        onClick={ handleTagsClick }
                        sx={ {
                            // bgcolor: (theme) => theme.palette.success.main,
                            // borderRadius: 5,
                            // bgcolor: (theme) => alpha(theme.palette.success.main, theme.palette.action.activatedOpacity + .5),
                            color: 'white',
                            [`& :hover`]: {
                                opacity: .5,
                                // bgcolor: 'Background' 
                            }
                        } }>
                        { toggledText }

                    </Button>
                </Box> */}