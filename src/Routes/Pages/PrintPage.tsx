import { Box, Button, Paper, Stack } from '@mui/material'
import { PropsWithChildren, forwardRef, useRef } from 'react'
import { LuPrinter } from 'react-icons/lu'
import { useReactToPrint } from 'react-to-print'
import { useAppContext } from '../../Hooks/useStoresContext'
import { FilteredItemsProps, StpCompareItems } from './StpCompareItems'

type PrintPageProps = PropsWithChildren

export const PrintPage = (props: PrintPageProps) => {
    const { selectedItems, StpStore } = useAppContext()

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

            <Button variant='contained' color='success' sx={ { color: 'whitesmoke', fontWeight: 'bolder', mx: 'auto', mt: 1 } }
                onClick={ handlePrint }
                startIcon={ <LuPrinter /> }
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
