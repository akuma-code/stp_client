import { Button, Stack } from '@mui/material'
import { PropsWithChildren, useRef } from 'react'
import { LuPrinter } from 'react-icons/lu'
import { useReactToPrint } from 'react-to-print'
import { useAppContext } from '../../Hooks/useStoresContext'
import { ItemsToPrint } from './ItemsToPrint'

type PrintPageProps = PropsWithChildren

export const PrintPage = (props: PrintPageProps) => {
    const { selectedItems, StpStore } = useAppContext()

    // const filtered = StpStore.table.filter(i => selectedItems.includes(i.id))
    const printRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    })


    return (
        <Stack gap={ 2 }
            sx={ {} }
            direction={ 'column' }
            justifyContent={ 'start' }
        >

            <Button variant='contained' color='success' sx={ { color: 'whitesmoke', fontWeight: 'bolder', mx: 'auto', mt: 1 } }
                onClick={ handlePrint }
                startIcon={ <LuPrinter /> }
            >
                Распечатать
            </Button>
            {/* <ItemsToPrint items={ filtered } ref={ printRef } /> */ }

        </Stack>

    )
}

