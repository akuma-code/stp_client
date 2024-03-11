import { Button, Icon, Stack } from '@mui/material'
import React, { useRef, useState } from 'react'
import { TfiControlBackward } from "react-icons/tfi"
import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom'
import { useAppContext } from '../../Hooks/useStoresContext'
import { routePaths } from '../routePath'
import { StpCompareItems } from './StpCompareItems'
import { useReactToPrint } from 'react-to-print'
import { LuPrinter } from 'react-icons/lu'
import { ItemsToPrint } from './PrintPage'
import { useMinMaxProps } from '../../Hooks/useMinMaxProps'
export type ICompareCtx = {
    selectedItem: null | string
    selectItem: React.Dispatch<React.SetStateAction<string | null>>
}
export const CompareContext = React.createContext<ICompareCtx | null>(null)

export const ComparePage = () => {
    const { selectedItems, StpStore } = useAppContext()
    const data = useLoaderData()
    console.log('data', data)
    const [itemName, setName] = useState<string | null>(null)
    const printRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    })

    const filtered = StpStore.table.filter(i => selectedItems.includes(i.id))

    return (
        <CompareContext.Provider
            value={ {
                selectedItem: itemName,
                selectItem: setName
            } }
        >

            {
                filtered.length > 0 ?
                    <Stack direction={ 'column' }
                        sx={ { maxHeight: '70vh' } }

                    >
                        <Button
                            variant='outlined'
                            color='success'
                            sx={ { color: 'black', fontWeight: 'bolder', mx: 10, mt: 1, displayPrint: 'none', maxWidth: '50vw', alignSelf: 'center' } }
                            onClick={ handlePrint }
                            startIcon={ <LuPrinter /> }

                        >
                            Распечатать сравнительную таблицу
                        </Button>
                        <ItemsToPrint
                            items={ filtered }
                            ref={ printRef }
                        />
                    </Stack>
                    :
                    <NothingToCompare />


            }


        </CompareContext.Provider>
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
                        На главную
                    </span>
                </Link>
            </div>
        </div>
    )
}


