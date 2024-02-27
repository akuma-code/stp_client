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
        content: () => printRef.current,


    })


    return (
        <Stack gap={ 2 } sx={ {
            bgcolor: 'beige'

        } }
            direction={ 'column' }
            justifyContent={ 'start' }
        >

            <Button variant='contained' color='success' sx={ { color: 'black', fontWeight: 'bolder', mx: 'auto', mt: 1 } }
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
        <Box ref={ ref } component={ Paper } elevation={ 0 } displayPrint={ 'block' } bgcolor={ 'beige' }>


            <StpCompareItems items={ props.items } />
        </Box>
    )
})
