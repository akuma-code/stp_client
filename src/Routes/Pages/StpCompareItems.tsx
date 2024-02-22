import { Divider, Stack } from '@mui/material';
import { _EnFieldsStp } from '../../Interfaces/Enums';
import { StpData } from '../../Components/DataTable/StpDataTable';
import { useRef } from 'react';

type FilteredItemsProps = {
    items: StpData[]
    ref?: React.RefObject<any> | null
};
export function StpCompareItems({ items, ref }: FilteredItemsProps) {

    const itemFieldLabel = items.map(Object.entries)
    console.log('itemFieldLabel', itemFieldLabel)
    return <Stack direction={ 'row' } gap={ 1 } m={ 3 } ref={ ref }>

        {
            items.map(item =>
                <Stack
                    direction={ 'column' }
                    key={ item.id }
                    flexGrow={ 1 }
                    alignItems={ 'stretch' }
                    gap={ 1 }
                    rowGap={ 1 }
                    sx={ { [`& div`]: { borderBottom: '1px solid black', textAlign: 'end', minHeight: 32 } } }
                >

                    <div className='min-w-fit min-h-max'>
                        <strong className='text-nowrap'> { item.name } </strong>
                    </div>
                    <div>{ item.depth } мм</div>
                    <div>{ item.cams }</div>
                    <div>{ item.weight }</div>
                    <div>{ item.Det }</div>
                    <div>{ item.Ea }</div>
                    <div>{ item.Er }</div>
                    <div>{ item.Lr }</div>
                    <div>{ item.Lt }</div>
                    <div>{ item.Ra }</div>
                    <div>{ item.Ro }</div>
                    <div>{ item.Rw }</div>
                    <div>{ item.S }</div>
                    <div>{ item.Sc }</div>
                    <div>{ item.Sf }</div>
                </Stack>
            )
        }
        <Divider orientation='vertical' flexItem sx={ { borderWidth: 2 } } />

        <Stack
            direction={ 'column' }
            flexGrow={ 5 }
            gap={ 1 } rowGap={ 1 }
            sx={ { [`& div`]: { textAlign: 'start', minHeight: 32 } } }
        >
            <div>{ _EnFieldsStp.formula }</div>
            <div>{ _EnFieldsStp.depth }</div>
            <div>{ _EnFieldsStp.cams }</div>
            <div>{ _EnFieldsStp.Weight }</div>
            <div>{ _EnFieldsStp.DET }</div>
            <div>{ _EnFieldsStp.EA }</div>
            <div>{ _EnFieldsStp.ER }</div>
            <div>{ _EnFieldsStp.LR }</div>
            <div>{ _EnFieldsStp.LT }</div>
            <div>{ _EnFieldsStp.Ra }</div>
            <div>{ _EnFieldsStp.Ro }</div>
            <div>{ _EnFieldsStp.Rw }</div>
            <div>{ _EnFieldsStp.S }</div>
            <div>{ _EnFieldsStp.SC }</div>
            <div>{ _EnFieldsStp.SF }</div>
        </Stack>



    </Stack>;
}
