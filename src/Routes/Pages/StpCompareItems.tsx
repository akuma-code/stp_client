import { Divider, ExtendList, ExtendListTypeMap, List, ListItem, ListItemIcon, ListItemText, ListTypeMap, Stack } from '@mui/material';
import { Stp_Key, _EnFieldsStp } from '../../Interfaces/Enums';
import { StpData } from '../../Components/DataTable/StpDataTable';
import { forwardRef, useRef } from 'react';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,

    useLocation,
} from 'react-router-dom';

import { FiInfo } from "react-icons/fi";
import { IconType } from 'react-icons';
type FilteredItemsProps = {
    items: StpData[]

};

const getKeys = (item: object) => Object.keys(item)
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
                    listSx={ { flexGrow: 1 } }
                />
            )
        }
        <StpItemList
            align='start'
            stp_values={ infos }
            listSx={ { flexGrow: 1, fontWeight: 'bold' } }
            itemIcon={ <FiInfo /> }
        />
    </Stack >;
}

type StpItemsListProps = {
    stp_values: (string | number)[]
    align?: 'start' | 'center' | 'end'
    listSx?: { [key: string]: string | number }
    itemIcon?: JSX.Element
}

export const StpItemList: React.FC<StpItemsListProps> = ({ stp_values, align, listSx, itemIcon }) => {

    const fields = stp_values.map(v => typeof v === 'number' ? v.toString() : v)

    return (
        <List
            sx={ {
                flexGrow: listSx && listSx.flexGrow ? listSx.flexGrow : 1,
                ...listSx
            } }>
            {
                fields.map((item, idx) =>
                    <ListItem alignItems='center' disablePadding divider
                        sx={ {
                            // borderBottom: '1px solid #ffa2a2',
                            textAlign: align ? align : 'center',
                            bgcolor: idx % 2 === 0 ? '#c5c5c5' : 'whitesmoke',
                            lineHeight: idx === 0 ? 2 : 'inherit',
                        } }
                    >
                        {
                            // itemIcon &&
                            //     <ListItemIcon>{ itemIcon }</ListItemIcon> 
                        }
                        <ListItemText disableTypography
                            sx={ {
                                fontWeight: idx === 0 ? 'bold' : 'inherit',
                            } }
                            primary={ item }

                        />
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