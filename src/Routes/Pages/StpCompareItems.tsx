import { Divider, ExtendList, ExtendListTypeMap, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListTypeMap, Stack, StackTypeMap } from '@mui/material';
import { Stp_Key, _EnFieldsStp } from '../../Interfaces/Enums';
import { StpData } from '../../Components/DataTable/StpDataTable';
import { createRef, forwardRef, useContext, useRef } from 'react';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,

    useLocation,
} from 'react-router-dom';

import { FiInfo } from "react-icons/fi";
import { IconType } from 'react-icons';
import { _ID } from '../../Helpers/helpersFns';
import { CompareContext } from './ComparePage';
import { SecondaryDescription, TerminDescription } from '../../Components/StpTable/TerminsDesc';

export type FilteredItemsProps = {
    items: StpData[]
    ref?: React.ForwardedRef<HTMLDivElement>

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
    'secure',
] as const

export const StpCompareItems = ({ items, ref }: FilteredItemsProps) => {

    const get_items = (stp_item: StpData) => listOrder.map(prop => stp_item[prop])


    const ctx = useContext(CompareContext)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clickHandler = (item: string) => (_e: React.MouseEvent<HTMLDivElement>) => {
        ctx && ctx.selectItem(item)
        // console.log('clicked', item)
    }
    return <Stack
        direction={ 'row' }
        gap={ 0.2 }
        // py={ 1 }
        height={ '100%' }
        mt={ 2 }
        border={ '4px double black' }
        ref={ ref }

    >
        { items.map(i =>

            <StpItemList
                key={ i.name }
                stp_values={ get_items(i) }
                listSx={ { flexGrow: 1, } }
            />
        ) }

        <List disablePadding
            sx={ {
                flexGrow: 0,
                flexShrink: 1,
                border: '1px solid #000000',
                // textIndent: 20,

            } }>
            {
                listOrder.map((item, idx) =>
                    <ListItem

                        disablePadding
                        dense
                        divider
                        key={ _ID() }
                        sx={ {
                            paddingInlineStart: 2,
                            paddingInlineEnd: 1,
                            height: { sm: 40, lg: 45 },
                            bgcolor: idx % 2 === 0 ? '#c5c5c5' : 'whitesmoke',
                            pageBreakAfter: 'avoid',
                            pageBreakInside: 'avoid',
                            pageBreakBefore: 'avoid',
                            flexShrink: 1
                        } }
                    >
                        <ListItemText
                            primaryTypographyProps={ {
                                // variant: 'h5',
                                fontWeight: 'bolder',
                                fontSize: { sm: 10, md: 15 },

                            } }
                            secondaryTypographyProps={ {
                                variant: 'caption',
                                color: '#242424',
                                fontSize: { sm: 7, md: 12 },
                                displayPrint: 'none'

                            } }

                            primary={ _EnFieldsStp[item] }
                            secondary={ SecondaryDescription[item as keyof typeof TerminDescription] }
                        />

                    </ListItem>
                )
            }
        </List>
    </Stack >;
}

type StpItemsListProps = {
    stp_values: (string | number)[]
    align?: 'start' | 'center' | 'end'
    listSx?: { [key: string]: string | number }

}

export const StpItemList: React.FC<StpItemsListProps> = ({ stp_values, align, listSx }) => {
    const fields = stp_values.map(v => typeof v === 'number' ? v.toString() : v)

    return (
        <List disablePadding
            sx={ {
                border: '1px solid #000000',
                flexGrow: listSx && listSx.flexGrow ? listSx.flexGrow : 0,
                ...listSx
            } }>
            {
                fields.map((item, idx) =>
                    <ListItem
                        alignItems='flex-start'

                        divider
                        key={ _ID() }
                        dense
                        sx={ {

                            textAlign: align ? align : 'center',
                            bgcolor: idx % 2 === 0 ? '#c5c5c5' : 'whitesmoke',
                            // lineHeight: idx === 0 ? 2 : 'inherit',
                            // alignContent: 'space-between',
                            height: { sm: 40, lg: 45 },


                        } }


                    >

                        <ListItemText
                            primaryTypographyProps={ {
                                fontWeight: idx === 0 ? 'bolder' : 'normal',
                                textAlign: 'center',
                                fontSize: { sm: 12, lg: 15 }
                            } }
                            secondaryTypographyProps={ { displayPrint: 'none', display: 'none' } }
                            sx={ {} }
                            primary={ item }

                        />


                    </ListItem>
                )
            }
        </List >
    )


}


// eslint-disable-next-line @typescript-eslint/ban-types



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