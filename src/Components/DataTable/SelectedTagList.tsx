import React from 'react';
import { Stp_Tags } from '../../Interfaces/Enums';



export function SelectedTagList({ tags }: { tags: string[]; }) {
    return (
        <div className='w-fit'>

            <ul className='h-fit lg:text-sm sm:text-xs flex flex-wrap gap-x-6'>
                { tags.map(t =>
                    <li
                        key={ t }
                        className='list-disc list-outside w-max'
                    >
                        { Stp_Tags[t as keyof typeof Stp_Tags] }
                    </li>
                ) }
            </ul>
        </div>
    );
}
