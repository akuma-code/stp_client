import React from 'react';
import { Stp_Tags } from '../../Interfaces/Enums';



export function SelectedTagList({ tags, cams, depth }: { tags: string[], cams: number[], depth: number[] }) {
    return (
        <div className='w-fit flex flex-row gap-5'>

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
            <ul className='h-fit lg:text-sm sm:text-xs flex flex-wrap gap-x-6'>
                { cams.map(t =>
                    <li
                        key={ t }
                        className='list-disc list-outside w-max'
                    >
                        камер { t }
                    </li>
                ) }
            </ul>
            <ul className='h-fit lg:text-sm sm:text-xs flex flex-wrap gap-x-6'>
                { depth.map(t =>
                    <li
                        key={ t }
                        className='list-disc list-outside w-max'
                    >
                        { t } мм.
                    </li>
                ) }
            </ul>
        </div>
    );
}
