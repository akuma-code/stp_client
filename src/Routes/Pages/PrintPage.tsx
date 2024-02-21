import React, { PropsWithChildren } from 'react'
import { Box, Button, Divider, Icon, Modal, Paper, Stack } from '@mui/material'
import { TfiControlBackward } from "react-icons/tfi"
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../../Hooks/useStoresContext'
import { useToggle } from '../../Hooks/useToggle'
import { _EnFieldsStp } from '../../Interfaces/Enums'
import { routePaths } from '../routePath'

type PrintPageProps = PropsWithChildren

export const PrintPage = (props: PrintPageProps) => {
    const { selectedItems, StpStore } = useAppContext()
    const [showBtn, control] = useToggle(true)
    const filtered = StpStore.table.filter(i => selectedItems.includes(i.id))
    function handlePrint() {

        control.off()
        window.print()

    }


    return (

        <Stack direction={ 'column' }>

            <Stack direction={ 'row' } gap={ 1 } m={ 3 } >

                {
                    filtered.map(item =>
                        <Stack direction={ 'column' } key={ item.id } flexGrow={ 1 } alignItems={ 'stretch' } gap={ 1 } rowGap={ 1 }
                            sx={ { [`& div`]: { borderBottom: '1px solid black', textAlign: 'center', minHeight: 32 } } }
                        >

                            <div className='min-w-fit'>
                                <strong> { item.name } </strong>
                            </div>
                            <div>{ item.depth } мм</div>
                            <div>{ item.cams }</div>
                            <div>{ item.weight }</div>
                            <div>{ item.Det }</div>
                            <div>{ item.Ea }</div>
                            <div>{ item.Er }</div>
                            <div>{ item.Lr }</div>
                            <div>{ item.Lt }</div>
                            <div>{ item.Ra }</div>
                            <div>{ item.Ro }</div>
                            <div>{ item.Rw }</div>
                            <div>{ item.S }</div>
                            <div>{ item.Sc }</div>
                            <div>{ item.Sf }</div>
                        </Stack>
                    )

                }
                <Divider orientation='vertical' flexItem sx={ { borderWidth: 2 } } />

                <Stack direction={ 'column' } flexGrow={ 0 } gap={ 1 } rowGap={ 1 }
                    sx={ { [`& div`]: { textAlign: 'start', minHeight: 32 } } }
                >
                    <div>{ _EnFieldsStp.formula }</div>
                    <div>{ _EnFieldsStp.depth }</div>
                    <div>{ _EnFieldsStp.cams }</div>
                    <div>{ _EnFieldsStp.Weight }</div>
                    <div>{ _EnFieldsStp.DET }</div>
                    <div>{ _EnFieldsStp.EA }</div>
                    <div>{ _EnFieldsStp.ER }</div>
                    <div>{ _EnFieldsStp.LR }</div>
                    <div>{ _EnFieldsStp.LT }</div>
                    <div>{ _EnFieldsStp.Ra }</div>
                    <div>{ _EnFieldsStp.Ro }</div>
                    <div>{ _EnFieldsStp.Rw }</div>
                    <div>{ _EnFieldsStp.S }</div>
                    <div>{ _EnFieldsStp.SC }</div>
                    <div>{ _EnFieldsStp.SF }</div>
                </Stack>



            </Stack>
            {
                showBtn &&
                <Paper elevation={ 1 } >
                    <Box>
                        <Button variant='text' color='primary'
                            onClick={ handlePrint }
                        >
                            Print
                        </Button>

                    </Box>

                </Paper> }
        </Stack>

    )
}

