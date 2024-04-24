import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React, { useRef } from 'react'
import { useToggle } from '../../Hooks/useToggle';

import { StpData } from './StpDataTable';
import { useReactToPrint } from 'react-to-print';
import { ItemsToPrint } from '../../Routes/Pages/ItemsToPrint';
import { useQuerySelectedIdsLoader } from '../../Hooks/QueryHooks/useQueryFiltersLoader';
import { VoidFn } from '../../Interfaces/Types';
import CloseIcon from '@mui/icons-material/Close';
interface SelectedItemsDialogProps {
    open: boolean
    selected: number[]
    onClose: VoidFn
    onOpen: VoidFn
}

const SelectedItemsDialog: React.FC<SelectedItemsDialogProps> = ({ open, selected, onClose, onOpen }) => {
    const q = useQuerySelectedIdsLoader({ selectedIds: selected });




    const printRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    })

    return (
        <Dialog open={ open } onClose={ onClose } fullScreen>
            {
                q.isSuccess ?
                    <>
                        <DialogTitle sx={ { display: 'flex' } }>
                            <Typography textAlign={ 'center' } fontSize={ 25 } fontWeight={ 'bolder' } flexGrow={ 1 }>
                                Сравнительная таблица
                            </Typography>
                            <IconButton
                                edge="start"
                                color="error"
                                sx={ { bgcolor: 'grey', mx: 5 } }
                                onClick={ onClose }
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent >
                            <ItemsToPrint
                                items={ q.data }
                                ref={ printRef }
                            />
                        </DialogContent>
                        <DialogActions >
                            <Box mb={ 2 } width={ '100%' } flexDirection={ 'row' } display={ 'flex' } columnGap={ 5 }>

                                <Button variant='contained' fullWidth color='success'
                                    onClick={ handlePrint }
                                >
                                    Распечатать
                                </Button>
                                <Button variant='contained' fullWidth color='warning'
                                    onClick={ onClose }>
                                    Закрыть
                                </Button>
                            </Box>
                        </DialogActions>

                    </>
                    :
                    <DialogTitle>
                        Items Loading
                    </DialogTitle>
            }
        </Dialog>

    );
}

export default SelectedItemsDialog;
