import { Box, Button, ButtonGroup, Fade, ListItemButton, ListItemIcon, Paper, Stack, useMediaQuery, useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

import { Suspense, lazy } from 'react';
import { AcSearch } from './AcSearch';
import { PropertySelector } from './PropertySelector';
import { SuspenseLoad } from '../UI/SuspenseLoad';
import { useFilterContext } from '../../Hooks/useFilterContext';
import { SelectedRowsList } from './SelectedRowsList';
import { useToggle } from '../../Hooks/useToggle';
import SelectedItemsDialog from './SelectedItemsDialog';
import { ItemChipList } from './ItemChipList';
interface TableToolbarProps {
    numSelected?: number;
    numFiltered: number
}

const AttikLogo = lazy(() => import('../UI/Svg/Attik'))

export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {
    const { filters } = useFilterContext();
    const [open, { on, off }] = useToggle()
    const theme = useTheme();
    const showToolbar = useMediaQuery(theme.breakpoints.up('md'));

    return (
        showToolbar &&
        <>
            <Toolbar
                component={ Stack }
                direction={ 'row' }
                pt={ 2 }
                columnGap={ 6 }
                sx={ {
                    height: { md: 100, lg: 120, sm: 70 },
                    pl: { sm: 1 },
                    pr: { xs: 1, sm: 1 },
                    pb: 1
                } }
            >

                { filters.ids.length > 0 &&
                    <Fade in={ !!filters.ids.length }>

                        <Stack direction={ 'row' } flexGrow={ 1 } gap={ 2 }
                            justifyContent={ 'space-between' }
                            alignItems={ 'center' }
                        >

                            <ButtonGroup orientation='vertical' size='large'>

                                <Button onClick={ on } variant='contained' sx={ { maxWidth: 150, maxHeight: 45, fontSize: 12 } } color='info'
                                >
                                    Сравнить выбранные
                                </Button>
                                <Button onClick={ () => filters.clearFilter('id') } variant='contained' sx={ { maxWidth: 150, maxHeight: 40, fontSize: 11 } } color='error'
                                >
                                    Очистить
                                </Button>
                            </ButtonGroup>
                            {/* <SelectedRowsList selected={ filters.ids } /> */ }
                            <ItemChipList />
                        </Stack>
                    </Fade>
                }
                <Box
                    component={ Stack }
                    direction={ 'row' }
                    flexGrow={ 1 }
                    justifyContent={ 'right' }
                    alignItems={ 'center' }
                    pr={ 3 }
                    ml={ 0 }
                    pl={ 0 }
                >
                    <SuspenseLoad loadText='фильтры загружаются...'>
                        <Box maxWidth={ 350 }                    >
                            <AcSearch />
                        </Box>
                        <PropertySelector filteredCount={ numFiltered } />
                        {/* <AttikLogo /> */ }
                    </SuspenseLoad>
                </Box>
            </Toolbar>
            <SelectedItemsDialog selected={ filters.ids } open={ open } onClose={ off } onOpen={ on } />
        </>
    );
}


