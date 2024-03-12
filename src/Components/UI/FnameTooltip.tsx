import React, { useState } from 'react'
import { AvatarButtonTooltip } from './AvatarButtonTooltip'
import { FcInfo } from "react-icons/fc";
import { nameDescriptor, parseStpName } from '../StpTable/FormulaParser';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { _ID } from '../../Helpers/helpersFns';
type Props = {
    stp_name: string
}

export const FnameTooltip: React.FC<Props> = ({ stp_name }) => {
    const [open, setOpen] = useState(false)
    const parsed_name = parseStpName(stp_name)
    const info = nameDescriptor(parsed_name).map(s => (<span key={ _ID() + s }>{ s }<br /></span>))



    return (
        <>
            <AvatarButtonTooltip
                icon={ <FcInfo /> }
                tooltip_title={ 'посмотреть расшифровку' }
                action={ () => setOpen(true) }
            />
            <Dialog open={ open } onClose={ () => setOpen(false) }>
                <DialogTitle>{ stp_name }</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { info }

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}