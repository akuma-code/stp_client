import { Chip, Fade, Stack } from '@mui/material';
import { useQuerySelectedIdsLoader } from '../../Hooks/QueryHooks/useQueryFiltersLoader';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useFilterContext } from '../../Hooks/useFilterContext';
import React, { FC, useRef } from 'react';
import { CamAvatar } from '../UI/CamsAvatars';
import { TransitionGroup } from 'react-transition-group';
import { useToggle } from '../../Hooks/useToggle';
import { StpData } from './StpDataTable';
import { VoidFn } from '../../Interfaces/Types';

interface ItemChipListProps {
    selected?: number[];
}

export const ItemChipList: FC<ItemChipListProps> = () => {
    const { filters } = useFilterContext();


    const { data, isSuccess } = useQuerySelectedIdsLoader({ selectedIds: filters.ids });

    return (


        <Stack
            direction={ 'column' }
            flexWrap={ 'wrap' }
            width={ 600 }
            height={ 110 }
            gap={ 0.5 }
            flexGrow={ 1 }
            px={ .5 }
            sx={ {
                borderWidth: 1,
                '& .MuiChip-deletable': { width: '50%', transform: 'scale(.9)' },

            } }

        >

            { isSuccess &&

                data.map(item =>

                    <FadingChip
                        key={ item.name }
                        stp={ item }
                        handleClose={ () => filters.selectId(item.id) }
                    />


                )

            }
        </Stack>


    );
};


const FadingChip = ({ stp, handleClose }: { stp: StpData, handleClose: VoidFn }) => {

    const chipref = useRef(null);
    return (
        <Fade in={ !!stp } timeout={ 1000 }>

            <Chip key={ stp.id }
                label={ stp.name }
                ref={ chipref }
                // color='inherit'

                onDelete={ handleClose }
                deleteIcon={ <IoMdCloseCircleOutline color='red' /> }
                icon={ <CamAvatar cam_count={ stp.cams as 1 | 2 } variant='circular' show_tooltip='' /> }
                variant='filled'

                sx={ {
                    color: 'white',
                    bgcolor: '#92c9e2',
                    justifyContent: 'space-between',
                    pl: 2,
                    flexGrow: 0,

                } } />
        </Fade>
    )
}