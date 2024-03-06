import { Box, Stack, SvgIcon } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import { AcSearch } from './AcSearch';
import { PropertySelector } from './PropertySelector';
import { MemoAttikSvgLogo } from '../UI/Svg/Attik';
interface TableToolbarProps {
    numSelected: number;
    numFiltered: number
}



export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {


    return (
        <Toolbar component={ Stack } direction={ 'row' } justifyContent={ 'space-between' } columnGap={ 2 }
            sx={ {
                height: 100,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            } }
        >


            <Box component={ Stack }
                flexGrow={ 0 }
                maxWidth={ '30%' }
                pt={ 1 }

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
                {/* <SelectedTagList { ...filterParams } /> */ }

                <MemoAttikSvgLogo />
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

