import { Button, Icon, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useRef } from 'react'
import { LuPrinter } from 'react-icons/lu'
import { TfiControlBackward } from "react-icons/tfi"
import { Link } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { useFilterContext } from '../../Hooks/useFilterContext'
import { useLoadAllData } from '../../Hooks/useLoadAllData'
import { ItemsToPrint } from './PrintPage'
import { useQueryFiltersLoader, useQuerySelectedIdsLoader } from '../../Hooks/QueryHooks/useQueryFiltersLoader'
// export type ICompareCtx = {
//     selectedItem: null | string
//     selectItem: React.Dispatch<React.SetStateAction<string | null>>
// }
// export const CompareContext = React.createContext<ICompareCtx | null>(null)

export const ComparePage = observer(() => {
    const { filters: { ids } } = useFilterContext();
    const { data, isSuccess } = useQuerySelectedIdsLoader({ selectedIds: ids })


    const printRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    })

    // const filtered = useMemo(() => isSuccess ? data.filter(i => ids.includes(i.id)) : [], [ids, isSuccess])
    // useEffect(() => { return () => filters.clearFilter('id') }, [])
    return (



        isSuccess ?
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
                    items={ data }
                    ref={ printRef }
                />
            </Stack>
            :
            <NothingToCompare />
    )
})



const NothingToCompare = () => {
    return (
        <div className='text-center text-2xl text-bold flex flex-col'>
            <strong>Вы ничего не выбрали для сравнения. А теперь выйдите и зайдите нормально! </strong>
            <div className='text-center flex gap-2 flex-row m-auto align-middle'>
                <Link to={ '/v1' }>
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


