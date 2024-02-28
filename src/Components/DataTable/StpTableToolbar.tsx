import { Box, ButtonGroup, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useAppContext } from '../../Hooks/useStoresContext';
import { useToggle } from '../../Hooks/useToggle';
import TagSelector from './StpFilterForm';
import { useState } from 'react';
interface TableToolbarProps {
    numSelected: number;
    numFiltered: number
}
type FilterVariant = 'search' | 'tags' | 'none' | null
export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {
    const { setQuery, query, setTags } = useAppContext()

    const [filterView, setFilterView] = useState<FilterVariant>(null)

    function handleChangeView(e: React.MouseEvent<HTMLElement, MouseEvent>, v: FilterVariant): void {

        setFilterView(prev => v)
        switch (v) {
            case 'tags': {
                setQuery(prev => "")
                break
            }
            case 'search': {
                setTags([])
                break
            }
            case 'none': {
                setQuery(prev => "")
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
                // justifyContent: 'space-between',
                height: 100,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            } }
        >

            {/* <Stack
                direction={ 'row' }
                // flex={ '1 1 33%' }
                alignItems={ 'center' }
                justifyContent={ 'space-between' }
                flexWrap={ 'nowrap' }
            > */}
            <Box width={ '33%' }>
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

            <Box width={ '33%' } margin={ 'auto' }>
                { filterView === 'search' &&
                    <TextField
                        name='search_query'
                        helperText='Начните вводить название....'
                        placeholder='формула стеклопакета'
                        size='small'
                        variant='standard'
                        inputMode='text'
                        margin='normal'
                        sx={ { maxWidth: 200, mx: 2, textAlign: 'center', color: 'black', } }
                        onChange={ (e) => setQuery(prev => e.target.value) }
                        value={ query }
                    />
                }
                {
                    filterView === 'tags' &&

                    <TagSelector filteredCount={ numFiltered } />
                }
            </Box>
            {/* </Stack> */ }


            <Box width={ '33%' } margin={ 'auto' }>
                <ToggleButtonGroup
                    exclusive
                    value={ filterView }
                    onChange={ handleChangeView }
                    size='small'


                >
                    <ToggleButton
                        value={ 'search' }
                        // onChange={ handleChangeView }
                        selected={ filterView === 'search' }
                    >Поиск по названию
                    </ToggleButton>
                    <ToggleButton
                        value={ 'tags' }
                        // onChange={ handleChangeView }
                        selected={ filterView === 'tags' }
                    >Поиск по свойствам
                    </ToggleButton>
                    <ToggleButton
                        value={ 'none' }
                        // onChange={ handleChangeView }
                        selected={ filterView === 'none' }
                    >X
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