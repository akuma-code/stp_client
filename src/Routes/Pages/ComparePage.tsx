import { Box, Button, Divider, Icon, Stack } from '@mui/material'
import React, { useRef, useState, forwardRef, createRef } from 'react'
import { TfiControlBackward } from "react-icons/tfi"
import { Link } from 'react-router-dom'
import { useAppContext } from '../../Hooks/useStoresContext'
import { useToggle } from '../../Hooks/useToggle'
import { routePaths } from '../routePath'
import { FilteredItemsProps, StpCompareItems } from './StpCompareItems'
import { TerminDescription } from '../../Components/StpTable/TerminsDesc'
import { StpItem } from '../../Components/StpTable/TableObjects'
import { StpData } from '../../Components/DataTable/StpDataTable'
import { useReactToPrint } from 'react-to-print'
import { visuallyHidden } from '@mui/utils';
export type ICompareCtx = {
    selectedItem: null | string
    selectItem: React.Dispatch<React.SetStateAction<string | null>>
}
export const CompareContext = React.createContext<ICompareCtx | null>(null)

export const ComparePage = () => {
    const { selectedItems, StpStore } = useAppContext()
    const [itemName, setName] = useState<string | null>(null)
    // const [showDesc, control] = useToggle(false)
    // const printRef = useRef(null)
    const printRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printRef.current
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
                    // divider={ <Divider flexItem orientation='horizontal' variant='fullWidth' sx={ { borderWidth: 1 } } /> }
                    >
                        <StpCompareItems
                            items={ filtered }

                        />



                    </Stack>
                    :
                    <NothingToCompare /> }
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


