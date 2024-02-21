import { Box, Button, Icon, Modal, Paper, Stack } from '@mui/material'
import { TfiControlBackward } from "react-icons/tfi"
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../../Hooks/useStoresContext'
import { useToggle } from '../../Hooks/useToggle'
import { routePaths } from '../routePath'
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { StpCompareItems } from './StpCompareItems'
import React, { forwardRef, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { StpData } from '../../Components/DataTable/StpDataTable'



export const ComparePage = () => {
    const { selectedItems, StpStore } = useAppContext()
    const [showModal, control] = useToggle(false)
    // const printRef = useRef(null)
    const printRef = useRef<typeof StpCompareItems | null>(null)

    const filtered = StpStore.table.filter(i => selectedItems.includes(i.id))

    return (
        filtered.length > 0 ?
            <Stack direction={ 'column' }>
                <StpCompareItems
                    items={ filtered }

                />

                <Box >
                    <Button variant='contained' color='primary' endIcon={ <MdOutlineLocalPrintshop /> }
                    // onClick={ () => handlePrint() }
                    >
                        Print
                        {/* <NavLink to={ routePaths.export } target='_self'>Export</NavLink> */ }
                    </Button>

                </Box>

            </Stack>
            :
            <NothingToCompare />
    )
}

const NothingToCompare = () => {
    return (
        <div className='text-center text-2xl text-bold flex flex-col'>
            <strong>Вы ничего не выбрали для сравнения. А теперь выйдите и зайдите нормально! </strong>
            <div className='text-center flex gap-2 flex-row m-auto align-middle'>
                <Link to={ routePaths.root }>
                    <Icon >

                        <TfiControlBackward />
                    </Icon>
                    <span className='mx-4'>

                        обратно к таблице
                    </span>
                </Link>
            </div>
        </div>
    )
}
type PrintModalProps = {
    show: boolean,
    control: {
        on: () => void, off: () => void
    },
    children?: React.ReactNode
}
const PrintModal = ({ show, control, children }: PrintModalProps) => {

    // useEffect(() => {
    //     if (show === false) return
    //     window.focus()
    //     window.print()
    //     control.off()
    // }, [show])

    return (
        <Modal
            open={ show }
            onClose={ control.off }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ { display: 'flex', flexDirection: 'column' } }>
                <Paper elevation={ 3 }>

                    { children }
                </Paper>
            </Box>
        </Modal>
    )
}


