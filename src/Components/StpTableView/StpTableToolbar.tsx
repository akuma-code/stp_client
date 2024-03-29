import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

import { Suspense, lazy } from 'react';
import { AcSearch } from './AcSearch';
import { PropertySelector } from './PropertySelector';
import { SuspenseLoad } from '../UI/SuspenseLoad';
interface TableToolbarProps {
    numSelected?: number;
    numFiltered: number
}

const AttikLogo = lazy(() => import('../UI/Svg/Attik'))

export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {

    const theme = useTheme();
    const showToolbar = useMediaQuery(theme.breakpoints.up('md'));

    return (
        showToolbar &&
        // <Suspense fallback={ <div>Load toolbar</div> }>
        <Toolbar component={ Stack } direction={ 'row' } justifyContent={ 'space-between' } pt={ 2 } spacing={ 4 }
            sx={ {
                height: { md: 100, lg: 120, sm: 70 },
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                // ...(numSelected > 0 && {
                //     bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                // }),
            } }
        >




            <Box
                component={ Stack }
                flexGrow={ 0 }
                flexShrink={ 1 }
                maxWidth={ 350 }

                pt={ 0 }

            >    <AcSearch />

            </Box>
            <Box component={ Stack }
                direction={ 'row' }
                flexGrow={ 2 }
                justifyContent={ 'space-between' }
                alignItems={ 'center' }
                pr={ 3 }
            >

                <SuspenseLoad loadText='tooltip loading'>

                    <PropertySelector filteredCount={ numFiltered } />

                    <AttikLogo />
                </SuspenseLoad>
            </Box>
        </Toolbar>
        // </Suspense>
    );
}





