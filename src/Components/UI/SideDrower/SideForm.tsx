import { Checkbox, ListItemText, MenuItem, OutlinedInput, Paper, Select } from '@mui/material'
import React from 'react'
import { comparator } from '../../../Context/Stores/FiltrationStore'
import { StpData } from '../../StpTableView/StpDataTable'
import { useFilterContext } from '../../../Hooks/useFilterContext'
import { observer } from 'mobx-react-lite'
import { useAppContext } from '../../../Hooks/useStoresContext'

const SideForm = observer(() => {
    const { depth, cams, tags } = useFilterContext()
    const { FilterStore } = useAppContext()
    const searchCams = comparator<StpData>('cams', 2)

    return (
        <Paper elevation={ 3 } sx={ { width: 240, p: 1 } }>

            <form>
                <Select

                    multiple
                    labelId="depth-label"
                    name='depth-selector'
                    value={ cams }
                    fullWidth
                    onChange={ (e, v) => FilterStore.cams = [+e.target.value] }
                    // onChange={ handleSelectorChange('depth') }
                    input={ <OutlinedInput label="Толщина ст-та____" id='multitag2' sx={ { fontSize: 12 } } /> }
                    renderValue={ (selected) => selected?.map(s => `${s} мм`).join(', ') || [1, 2] }
                // MenuProps={ DepthMenuProps }

                >

                    {
                        camsArray.map((depth) => (
                            <MenuItem key={ depth } value={ depth } divider dense>
                                {/* <Checkbox checked={ selectors.depth?.includes(depth) } name={ depth + '_checkDepth' } /> */ }
                                <ListItemText primary={ depth } />
                            </MenuItem>

                        )) }

                </Select>
            </form>
        </Paper>
    )
})
SideForm.displayName = "__SideForm"
export default SideForm
const depthArray = [
    24, 28, 32, 36, 40, 52
] as const
const camsArray = [1, 2] as const