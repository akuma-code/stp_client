import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, useMediaQuery, useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

import { Suspense, lazy } from 'react';
import { AcSearch } from './AcSearch';
import { PropertySelector } from './PropertySelector';
import { SuspenseLoad } from '../UI/SuspenseLoad';
import { useQuerySelectedIdsLoader } from '../../Hooks/QueryHooks/useQueryFiltersLoader';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useFilterContext } from '../../Hooks/useFilterContext';
interface TableToolbarProps {
    numSelected?: number;
    numFiltered: number
}

const AttikLogo = lazy(() => import('../UI/Svg/Attik'))

export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {
    const { filters: { ids } } = useFilterContext();
    const theme = useTheme();
    const showToolbar = useMediaQuery(theme.breakpoints.up('md'));

    return (
        showToolbar &&
        // <Suspense fallback={ <div>Load toolbar</div> }>
        <Toolbar
            component={ Stack }
            direction={ 'row' }

            pt={ 2 }
            columnGap={ 6 }
            sx={ {
                height: { md: 100, lg: 120, sm: 70 },
                pl: { sm: 1 },
                pr: { xs: 1, sm: 1 },
            } }
        >


            <SelectedRowsList selected={ ids } />


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
                    <Box
                        maxWidth={ 350 }

                    >
                        <AcSearch />
                    </Box>
                    <PropertySelector filteredCount={ numFiltered } />
                    <AttikLogo />
                </SuspenseLoad>
            </Box>
        </Toolbar>
        // </Suspense>
    );
}


type SelectedRowsListProps = {
    selected: number[]
}



const SelectedRowsList: React.FC<SelectedRowsListProps> = ({ selected }) => {
    const { filters } = useFilterContext();

    const q = useQuerySelectedIdsLoader({ selectedIds: selected })
    return (

        <List dense disablePadding
            sx={ {
                height: 100,
                flexGrow: 1,
                maxWidth: 580,
                zIndex: 20,
                flexWrap: 'wrap',
                display: 'flex',
                flexDirection: 'column',
                rowGap: .5,
                columnGap: 3,
                // justifyContent: 'right',
                mx: 3,
                [`& .MuiListItem-root`]: { maxHeight: 30 },
            } }
        >
            { q.isSuccess &&
                q.data.map(item =>


                    // <ListItem key={ item.name } disablePadding >

                    <Box
                        key={ item.name }
                        component={ ListItem }
                        disablePadding
                        borderRadius={ 2 }
                        divider
                        dense
                        maxWidth={ 250 }
                        border={ '1px solid black' }
                        sx={ { display: 'flex', justifyContent: 'space-between' } }
                    >
                        <ListItemText
                            sx={ { flexGrow: 1 } }
                            primary={ item.name }
                            primaryTypographyProps={ {
                                fontSize: 12, pl: 2, fontWeight: 'bold',

                            } }
                        />

                        <IconButton
                            onClick={ () => filters.selectId(item.id) }
                            sx={ { mr: 1 } }
                            color='error' >
                            <IoMdCloseCircleOutline />
                        </IconButton>

                    </Box>

                    // </ListItem>
                )
            }
        </List >

    );
}




