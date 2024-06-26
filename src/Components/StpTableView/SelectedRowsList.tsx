import { Box, IconButton, List, ListItem, ListItemText, alpha } from '@mui/material';
import { useQuerySelectedIdsLoader } from '../../Hooks/QueryHooks/useQueryFiltersLoader';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useFilterContext } from '../../Hooks/useFilterContext';
import React from 'react'

type SelectedRowsListProps = {
    selected: number[];
};
export const SelectedRowsList: React.FC<SelectedRowsListProps> = ({ selected }) => {
    const { filters } = useFilterContext();

    const q = useQuerySelectedIdsLoader({ selectedIds: selected });
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
                rowGap: 0.5,
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
                        divider
                        dense
                        borderRadius={ 2 }
                        maxWidth={ 250 }
                        border={ '1px solid black' }
                        sx={ { display: 'flex', justifyContent: 'space-between' } }
                    >
                        <ListItemText
                            sx={ { flexGrow: 1 } }
                            primary={ item.name }
                            primaryTypographyProps={ {
                                fontSize: 12, pl: 2, fontWeight: 'bold',
                            } } />

                        <IconButton
                            onClick={ () => filters.selectId(item.id) }
                            sx={ { mr: 1 } }
                            color='error'>
                            <IoMdCloseCircleOutline />
                        </IconButton>

                    </Box>
                    // </ListItem>

                ) }
        </List>

    );
};



