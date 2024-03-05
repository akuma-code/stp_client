import React from 'react';
import { Stp_Tags } from '../../Interfaces/Enums';
import { Stack } from '@mui/material';



export function SelectedTagList({ tags, cams, depth }: { tags: string[], cams: number[], depth: number[] }) {
    return (
        // <div className=' max-h-[110px] flex flex-row  py-4 flex-grow'>
        <ul className=' lg:text-sm sm:text-xs '>
            <Stack direction={ 'column' }
                maxHeight={ 110 }
                maxWidth={ 'max-content' }
                p={ 2 }
                flexGrow={ 1 }
                flexWrap={ 'wrap' }
                columnGap={ 4 }
            >

                { tags.map(t =>
                    <li
                        key={ t }
                        className='list-disc list-outside list-item'
                    >
                        { Stp_Tags[t as keyof typeof Stp_Tags] }
                    </li>
                ) }
            </Stack>
        </ul>


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
