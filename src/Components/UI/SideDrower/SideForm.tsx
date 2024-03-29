import { Checkbox, ListItemText, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useFilterContext } from '../../../Hooks/useFilterContext'
import { useEffect } from 'react'
import { _log } from '../../../Helpers/helpersFns'
import { FiltersParams } from '../../../Interfaces/Types'
import { StpTag } from '../../StpTable/TableObjects'

type FiltrationChangeHandler = (filter_type: keyof FiltersParams) => (event: SelectChangeEvent<FiltersParams[typeof filter_type]>, child: React.ReactNode) => void

const SideForm = observer(() => {
    const { filters } = useFilterContext()
    const handleChange: FiltrationChangeHandler = (selector) => (e, v) => {
        const { value } = e.target
        if (typeof value === 'string') return _log(value)
        switch (selector) {
            case 'tags': {
                const tags = e.target.value as StpTag[]
                filters.setTags(tags)
                break
            }
            case 'depth': {
                const { value } = e.target
                filters.setDepth(value as number[])
                break
            }
            case 'cams': {
                const { value } = e.target
                filters.setCams(value as number[])
                break
            }
        }

    }

    // useEffect(() => { return () => filters.clearFilter('cams') }, [])
    return (
        <Paper elevation={ 3 } sx={ { width: 240, p: 1 } }>

            <form>
                <Select

                    multiple
                    labelId="depth-label"
                    name='depth-selector'
                    value={ filters.cams }
                    fullWidth
                    onChange={ handleChange('cams') }
                    input={ <OutlinedInput label="Толщина ст-та____" id='multitag2' sx={ { fontSize: 12 } } /> }
                    renderValue={ (selected) => selected?.map(s => `${s} мм`).join(', ') || [1, 2] }
                // MenuProps={ DepthMenuProps }

                >

                    {
                        camsArray.map((cams) => (
                            <MenuItem key={ cams } value={ cams } divider dense>
                                <Checkbox checked={ filters.cams.includes(cams) } name={ cams + '_checkcams' } />
                                <ListItemText primary={ cams } />
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