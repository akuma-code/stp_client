import { Box, Button, ButtonGroup, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

import { useFilterContext } from '../../Hooks/useFilterContext';
import { useToggle } from '../../Hooks/useToggle';
import { Loading, SuspenseLoad } from '../UI/SuspenseLoad';
import { AcSearch } from './AcSearch';
import { ItemChipList } from './ItemChipList';
import { PropertySelector } from './PropertySelector';
import SelectedItemsDialog from './SelectedItemsDialog';
import { Suspense, memo } from 'react';
interface TableToolbarProps {
    numSelected?: number;
    numFiltered?: number
}



export function StpTableToolbar({ numSelected, numFiltered }: TableToolbarProps) {
    const { filters } = useFilterContext();
    const [open, { on, off }] = useToggle()
    const [trans, control] = useToggle()
    const theme = useTheme();
    const showToolbar = useMediaQuery(theme.breakpoints.up('md'));
    const handleOpen = () => {
        on()
        control.on()
    }

    const handleClose = () => {
        filters.clearFilter('ids')
        off()
        control.off()
    }
    return (
        showToolbar &&
        <>
            <Toolbar
                component={ Stack }
                direction={ 'row' }
                bgcolor={ 'beige' }
                columnGap={ 6 }
                sx={ {
                    height: { md: 100, lg: 120, sm: 70 },
                    pl: { sm: 1 },
                    pr: { xs: 1, sm: 1 },
                    pb: 1
                } }
            >



                <Stack
                    direction={ 'row' }
                    flexGrow={ 1 }
                    columnGap={ 2 }
                    justifyContent={ 'space-between' }
                    alignItems={ 'center' }

                >

                    { filters.ids.length > 0 ?
                        <>
                            <ButtonGroup
                                orientation='vertical'
                                size='large'
                                variant='contained'>
                                <Button
                                    onClick={ on }
                                    sx={ { maxWidth: 150, fontSize: 12 } }
                                    color='info'
                                >
                                    Сравнить выбранные
                                </Button>
                                <Button
                                    onClick={ handleClose }
                                    sx={ { maxWidth: 150, fontSize: 11 } }
                                    color='error'
                                >
                                    Очистить
                                </Button>
                            </ButtonGroup>


                            <ItemChipList />

                        </>
                        :
                        <InfoText />
                    }
                </Stack>

                <Suspense fallback={ <Loading /> }>

                    <PropertySelector />
                </Suspense>
            </Toolbar>
            <SelectedItemsDialog selected={ filters.ids } open={ open } onClose={ off } onOpen={ on } />
        </>
    );
}


const InfoText = () => {
    return (
        <Box
            m={ 2 }
        >
            <Typography variant='button' fontWeight={ 'bold' }>
                Данные таблицы получены из калькулятора, предоставленного компанией РСК
            </Typography>
            <br />
            <Typography variant='body1' >
                Для сравнения или печати стеклопакетов выберите нужные (максимум 6)

            </Typography>
        </Box>
    )
}
InfoText.displayName = 'InfoText'
