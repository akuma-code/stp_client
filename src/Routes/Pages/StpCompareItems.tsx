import { Divider, ExtendList, ExtendListTypeMap, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListTypeMap, Stack } from '@mui/material';
import { Stp_Key, _EnFieldsStp } from '../../Interfaces/Enums';
import { StpData } from '../../Components/DataTable/StpDataTable';
import { forwardRef, useContext, useRef } from 'react';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,

    useLocation,
} from 'react-router-dom';

import { FiInfo } from "react-icons/fi";
import { IconType } from 'react-icons';
import { _ID } from '../../Helpers/helpersFns';
import { CompareContext } from './ComparePage';
type FilteredItemsProps = {
    items: StpData[]

};


const listOrder: Stp_Key[] = [
    'name',
    'depth',
    'weight',
    'cams',
    'Det',
    'Ea',
    'Er',
    'Lr',
    'Lt',
    'Ra',
    'Ro',
    'Rw',
    'S',
    'Sc',
    'Sf',
] as const

export function StpCompareItems({ items }: FilteredItemsProps) {

    const get_items = (stp_item: StpData) => listOrder.map(prop => stp_item[prop])
    const infos = listOrder.map(s => _EnFieldsStp[s])
    return <Stack
        direction={ 'row' }
        gap={ 0 }
        my={ 3 }
    >
        {
            items.map(i =>

                <StpItemList
                    key={ i.name }
                    stp_values={ get_items(i) }
                    listSx={ { flexGrow: 3 } }
                />
            )
        }
        <StpItemList
            align='start'
            stp_values={ infos }
            listSx={ { flexGrow: 1, fontWeight: 'bold', borderLeft: '1px solid black', textIndent: 20 } }
            itemIcon={ <FiInfo /> }
            isButton
        />
    </Stack >;
}

type StpItemsListProps = {
    stp_values: (string | number)[]
    align?: 'start' | 'center' | 'end'
    listSx?: { [key: string]: string | number }
    itemIcon?: React.ReactNode
    isButton?: boolean
}

export const StpItemList: React.FC<StpItemsListProps> = ({ stp_values, align, listSx, itemIcon, isButton = false }) => {
    const ctx = useContext(CompareContext)
    const fields = stp_values.map(v => typeof v === 'number' ? v.toString() : v)
    const clickHandler = (item: string, idx = (-1)) => (e: React.MouseEvent<HTMLDivElement>) => {
        ctx && ctx.selectItem(idx)
        // console.log('clicked', item)
    }
    return (
        <List
            sx={ {
                flexGrow: listSx && listSx.flexGrow ? listSx.flexGrow : 0,
                ...listSx
            } }>
            {
                fields.map((item, idx) =>
                    <ListItem alignItems='center' disablePadding divider key={ _ID() }
                        sx={ {
                            // borderBottom: '1px solid #ffa2a2',
                            textAlign: align ? align : 'center',
                            bgcolor: idx % 2 === 0 ? '#c5c5c5' : 'whitesmoke',
                            lineHeight: idx === 0 ? 2 : 'inherit',
                            alignContent: 'space-between'
                        } }
                    >
                        { isButton ?
                            <div className='flex justify-around flex-row'>
                                <ListItemText disableTypography
                                    sx={ {
                                        sm: { fontWeight: idx === 0 ? 'thin' : 'inherit', },
                                        md: { fontWeight: idx === 0 ? 'bold' : 'inherit', }
                                    } }
                                    primary={ item }

                                />
                                <ListItemButton dense sx={ { color: 'green', borderRadius: 15 } } disableRipple
                                    onClick={ clickHandler(item, idx) }
                                >
                                    { itemIcon }

                                </ListItemButton>
                            </div>
                            :
                            <ListItemText disableTypography
                                sx={ {
                                    sm: { fontWeight: idx === 0 ? 'thin' : 'inherit', },
                                    md: { fontWeight: idx === 0 ? 'bold' : 'inherit', }
                                } }
                                primary={ item }

                            />
                        }

                    </ListItem>
                )
            }
        </List >
    )


}







interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>((itemProps, ref) => <RouterLink ref={ ref } { ...itemProps } />);

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;

    return (
        <li>
            <ListItem component={ Link } to={ to }>
                { icon ? <ListItemIcon>{ icon }</ListItemIcon> : null }
                <ListItemText primary={ primary } />
            </ListItem>
        </li>
    );
}


















// {
//             items.map(item =>
//                 <List disablePadding dense sx={ {
//                     display: 'flex', flexDirection: 'column', flexGrow: 2,
//                 } }>
//                     {
//                         listOrder.map((listkey, idx) =>
//                             <ListItem key={ listkey }
//                             >
//                                 <ListItemText disableTypography
//                                     sx={ { textWrap: 'nowrap', minHeight: 24, } }
//                                     primary={ item[listkey as keyof StpData] }
//                                 />
//                             </ListItem>
//                         )
//                     }
//                 </List>
//             )
//         }
//         <List disablePadding dense>
//             { listOrder.map((listkey) =>
//                 <ListItem
//                     key={ listkey }
//                     sx={ { [`& .MuiListItemText-root`]: { fontWeight: 'bolder' } } }
//                     alignItems='flex-start'
//                 >
//                     <ListItemText sx={ { textWrap: 'nowrap', minHeight: 24, alignContent: 'flex-end' } } disableTypography
//                         primary={ _EnFieldsStp[listkey] }
//                     />
//                 </ListItem>
//             ) }
//         </List>