import React from 'react';
import { Stp_Tags } from '../../Interfaces/Enums';
import { List, ListItem, ListItemText, Stack } from '@mui/material';



export function SelectedTagList({ tags, cams, depth }: { tags: string[], cams: number[], depth: number[] }) {
    return (
        // <div className=' max-h-[110px] flex flex-row  py-4 flex-grow'>
        // <ul className=' lg:text-sm sm:text-xs w-[50%] pl-4 max-h-[110px] flex-wrap'>

        <Stack
            maxHeight={ 110 }
            pt={ 2 }
            maxWidth={ '30%' }
            flexWrap={ 'wrap' }
            direction={ 'column' }
            flexGrow={ 1 }
            // justifyContent={ 'center' }
            alignContent={ 'center' }
        >


            { tags.map(t =>
                <ListItem key={ t } disablePadding dense
                >
                    <ListItemText primary={ Stp_Tags[t as keyof typeof Stp_Tags] } />
                </ListItem>
            ) }
        </Stack>
        // </ul>


        /* <ul className='h-fit lg:text-sm sm:text-xs flex flex-wrap gap-x-6 flex-col'>
        { depth.map(t =>
            <li
                key={ t }
                className='list-disc list-outside w-max'
            >
                { t } мм.
            </li>
        ) }
    </ul>
    <ul className='h-fit lg:text-sm sm:text-xs flex flex-wrap gap-x-6 flex-col'>
        { cams.map(t =>
            <li
                key={ t }
                className='list-disc list-outside w-max'
            >
                камер { t }
            </li>
        ) }
    </ul> */
        // </div>

    );
}
