import { Chip, Fade, Stack } from '@mui/material';
import { useQuerySelectedIdsLoader } from '../../Hooks/QueryHooks/useQueryFiltersLoader';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useFilterContext } from '../../Hooks/useFilterContext';
import React, { FC } from 'react';
import { CamAvatar } from '../UI/CamsAvatars';
import { TransitionGroup } from 'react-transition-group';
import { useToggle } from '../../Hooks/useToggle';

interface ItemChipListProps {
    selected?: number[];
}

export const ItemChipList: FC<ItemChipListProps> = () => {
    const { filters } = useFilterContext();
    const [show, { on, off }] = useToggle(true);

    const { data, isSuccess } = useQuerySelectedIdsLoader({ selectedIds: filters.ids });
    return (
        <Fade in={ show } >

            <Stack
                direction={ 'column' }
                flexWrap={ 'wrap' }
                maxWidth={ 600 }
                height={ 110 }
                gap={ 0.5 }
                flexGrow={ 1 }

            >

                { isSuccess &&
                    // <TransitionGroup >
                    data.map(item =>
                        // <Fade in={ !!data } key={ item.id } timeout={ { enter: 1000, exit: 500 } }>

                        <Chip key={ item.id }
                            label={ item.name }
                            // color='inherit'

                            onDelete={ () => filters.selectId(item.id) }
                            deleteIcon={ <IoMdCloseCircleOutline color='red' /> }
                            icon={ <CamAvatar cam_count={ item.cams as 1 | 2 } variant='circular' show_tooltip='' /> }
                            variant='filled'

                            sx={ {
                                color: 'white',
                                bgcolor: '#92c9e2',
                                justifyContent: 'space-between',
                                pl: 1,
                                flexGrow: 0,
                                // maxWidth: '45%'
                            } } />
                        // </Fade>

                    )
                    // </TransitionGroup>
                }
            </Stack>

        </Fade>
    );
};
