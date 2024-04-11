import { Box, Paper } from '@mui/material';
import { forwardRef } from 'react';
import { FilteredItemsProps, StpCompareItems } from './StpCompareItems';


export const ItemsToPrint = forwardRef<HTMLDivElement, FilteredItemsProps>((props, ref) => {

    return (
        <Box ref={ ref } component={ Paper } elevation={ 0 } displayPrint={ 'block' } bgcolor={ 'whitesmoke' }>


            <StpCompareItems items={ props.items } />
        </Box>
    );
});
