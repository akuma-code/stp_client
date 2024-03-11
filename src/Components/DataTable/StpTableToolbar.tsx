import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import { AttikSvgLogo } from '../UI/Svg/Attik';
import { AcSearch } from './AcSearch';
import { PropertySelector } from './PropertySelector';
interface TableToolbarProps {
    numSelected: number;
    numFiltered: number
}



export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {

    const theme = useTheme();
    const showToolbar = useMediaQuery(theme.breakpoints.up('md'));

    return (
        showToolbar &&
        <Toolbar component={ Stack } direction={ 'row' } justifyContent={ 'space-between' } pt={ 2 } spacing={ 4 }
            sx={ {
                height: { md: 100, lg: 120, sm: 70 },
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
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


                <PropertySelector filteredCount={ numFiltered } />

                <AttikSvgLogo />
            </Box>

        </Toolbar>
    );
}










// numSelected > 0 ?

//     <Typography
//         // sx={ { flex: '1 1 33%' } }
//         textAlign={ 'left' }
//         color="inherit"
//         variant="body1"
//         component="div"
//         id="tableTitle"

//     >
//         { numSelected > 0 ? `${numSelected} выбрано для сравнения` : `Выбрать стеклопакет для сравнения (не более 5!)` }
//     </Typography>
//     :

