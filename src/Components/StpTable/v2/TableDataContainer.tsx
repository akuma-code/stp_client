import { AppBar, Box, FormControl, FormHelperText, InputAdornment, OutlinedInput, Stack, ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material'
import { useCallback, useState } from 'react'
import { useToggle } from '../../../Hooks/useToggle'
import { CamOneIcon, CamTwoIcon } from '../../UI/CamsAvatars'
import { SelectDepth } from '../../UI/SideDrower/SelectDepth'
import { SelectTags } from '../../UI/SideDrower/SelectTags'
import { StpTag } from '../TableObjects'
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import { getAllTableData } from '../../../Hooks/useLoadAllData'
import { StpDataTable } from '../../StpTableView/StpDataTable'


export const loader = (qc: QueryClient) => async () => {
    const context = await qc.ensureQueryData({
        queryKey: ['stp_data_old'],
        queryFn: getAllTableData,
        staleTime: 10 * 1000,
        gcTime: 10000
    })
    return context
}


const TableDataContainer = () => {

    const ld = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>






    return (
        <div>
            { ld &&
                <StpDataTable items={ ld } /> }
        </div>
    )
}

type FilterState = {
    cams: number[]
    depth: number[]
    tags: StpTag[]
    search_query: string
    selected: number[]
}
const FilterPanel = () => {
    const [show, control] = useToggle()


    const [filter, setFilters] = useState({
        cams: [],
        depth: [],
        tags: [],
        search_query: "",
        selected: [],
    })


    const changeHandler = useCallback((key: keyof FilterState, value: FilterState[keyof FilterState]) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }, [])


    return (
        <AppBar color='inherit' position='static'
            sx={ {
                p: .5,
                m: 0,
                // height: show ? 'fit-content' : 10,
                // [`:hover`]: { height: 'fit-content' }

            } }>
            <Toolbar onMouseEnter={ control.on } onMouseLeave={ control.off }>
                <Stack direction={ 'row' } spacing={ 4 } sx={ {
                    [`& .Mui-selected`]: { bgcolor: '#40c552' }
                } }
                >
                    {
                        // show &&
                        <ToggleButtonGroup
                            value={ filter.cams }
                            onChange={ (e, v) => changeHandler('cams', v) }
                            size='small'
                            sx={ {
                                bgcolor: 'transparent',
                                borderRadius: 4,

                            } }>

                            <ToggleButton
                                value={ 1 }
                                sx={ { border: '2px solid orange', borderRadius: 4 } }
                                size='small'
                            >
                                <CamOneIcon />


                            </ToggleButton>
                            <ToggleButton
                                value={ 2 }
                                sx={ { border: '2px solid orange', borderRadius: 4 } }
                                size='small'
                            >
                                <CamTwoIcon />


                            </ToggleButton>
                        </ToggleButtonGroup>

                    }
                    <Box minWidth={ 150 }>
                        <SelectDepth
                            depths={ filter.depth }
                            handleChange={ (e) => changeHandler('depth', e.target.value) }
                        />
                        <FormHelperText id='depth-label'>Depth</FormHelperText>
                    </Box>
                    <Box minWidth={ 200 }>
                        <SelectTags
                            tags={ filter.tags }
                            handleChange={ (e) => changeHandler('tags', e.target.value) }
                        />
                        <FormHelperText id='tags-label'>Tags</FormHelperText>
                    </Box>
                </Stack>
            </Toolbar>
            {/* <Box height={ 10 } bgcolor={ 'red' }></Box> */ }
        </AppBar>
    )
}








const Search = () => {
    return <FormControl sx={ { m: 1, width: '25ch' } } variant="outlined">
        <OutlinedInput
            id=""
            endAdornment={ <InputAdornment position="end">kg</InputAdornment> }
            aria-describedby="outlined-weight-helper-text"
            inputProps={ {
                'aria-label': 'weight',
            } }
        />
        <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
    </FormControl>
}




export default TableDataContainer
