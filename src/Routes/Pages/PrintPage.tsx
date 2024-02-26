import React, { PropsWithChildren, forwardRef, useRef } from 'react'
import { Box, Button, Divider, Icon, Modal, Paper, Stack } from '@mui/material'
import { TfiControlBackward } from "react-icons/tfi"
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../../Hooks/useStoresContext'
import { useToggle } from '../../Hooks/useToggle'
import { _EnFieldsStp } from '../../Interfaces/Enums'
import { routePaths } from '../routePath'
import { useReactToPrint } from 'react-to-print'
import { FilteredItemsProps, StpCompareItems } from './StpCompareItems'

type PrintPageProps = PropsWithChildren

export const PrintPage = (props: PrintPageProps) => {
    const { selectedItems, StpStore } = useAppContext()
    const [showBtn, control] = useToggle(true)
    const filtered = StpStore.table.filter(i => selectedItems.includes(i.id))
    const printRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    })


    return (
        <Stack gap={ 1 } sx={ { bgcolor: '#dadada71', p: 1 } } alignItems={ 'stretch' } justifyContent={ 'flex-start' }>

            <Button fullWidth variant='text' color='error'
                onClick={ handlePrint }
            >
                Распечатать
            </Button>
            <ItemsToPrint items={ filtered } ref={ printRef } />

        </Stack>

    )
}

export const ItemsToPrint = forwardRef<HTMLDivElement, FilteredItemsProps>((props, ref) => {

    return (
        <Box ref={ ref } sx={ { transform: 'scale(.9)' } } >
            <StpCompareItems items={ props.items } />
        </Box>
    )
})
