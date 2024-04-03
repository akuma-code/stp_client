import { Stack, SvgIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { PropsWithChildren, Suspense, useEffect } from 'react';
import { GrTable } from 'react-icons/gr';
import { MdCompare } from 'react-icons/md';
import { StpDataTable } from '../../../Components/StpTableView/StpDataTable';
import { FilterDrawer } from '../../../Components/UI/SideDrower/DrawerFilter';
import { Loading } from '../../../Components/UI/SuspenseLoad';
import { useStpFilter } from '../../../Hooks/useCompare';
import { useFilterContext } from '../../../Hooks/useFilterContext';
import { useIdSelector } from '../../../Hooks/useIdSelector';
import { useLoadAllData } from "../../../Hooks/useLoadAllData";
import { useAppContext } from '../../../Hooks/useStoresContext';
import { ComparePage } from '../ComparePage';
import { _log } from '../../../Helpers/helpersFns';
import { observer } from 'mobx-react-lite';
import { useQueryFiltersLoader } from '../../../Hooks/QueryHooks/useQueryFiltersLoader';
type TabPageProps = PropsWithChildren & {

}
const TabIcon = React.memo(() => <SvgIcon sx={ { fontSize: 20 } }><GrTable /> </SvgIcon>)
TabIcon.displayName = '*TabIcon'
const CompIcon = React.memo(() => <SvgIcon sx={ { fontSize: 20 } }><MdCompare /> </SvgIcon>)
CompIcon.displayName = '*CompareIcon'
//__TABPAGE____
export const TabPage: React.FC<TabPageProps> = observer(() => {
    // const queryAll = useLoadAllData()
    const { query } = useAppContext()
    const { filters } = useFilterContext()
    // const [selected, action] = useIdSelector()
    const [current, setCurrent] = React.useState<number>(0);
    // const filtered = useStpFilter(queryAll.data, query, filterParams)
    const qf = useQueryFiltersLoader(filters, query)
    const handleChange = (event: React.SyntheticEvent, new_index: number) => {
        setCurrent(new_index);
    };

    // useEffect(() => {
    //     const filtered = filters.filterItems(queryAll.data ?? [])
    //     _log("ctx_filtered: ", filtered.length)
    // }, [filters.cams, filters.depth, filters.tags, queryAll.data])

    return (
        <Box sx={ { h: '100%' } }>
            <AppBar position="static" color='info' >

                <Stack direction={ 'row' } justifyContent={ 'start' } alignItems={ 'baseline' } spacing={ 8 }>
                    <FilterDrawer />
                    <Tabs
                        value={ current }
                        onChange={ handleChange }
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="standard"

                        sx={ {
                            pl: 10,
                            [`& .MuiTab-root`]: { fontWeight: 'bolder' }
                        } }

                    >
                        <Tab
                            label="Таблица"
                            value={ 0 }
                            icon={ <TabIcon /> }
                            iconPosition='start'
                            sx={ { pl: 4 } }
                        />


                        <Tab
                            label={ `Сравнить (${filters.ids.length})` }
                            value={ 1 }
                            icon={ <CompIcon /> }
                            iconPosition='start'
                            disabled={ filters.ids.length === 0 }
                        />


                    </Tabs>


                </Stack>
            </AppBar >



            <TabPanel index={ 0 } value={ current } className='bg-orange-900 h-full'>
                {/* <Suspense fallback={ <Loading /> }> */ }
                {
                    // qf.status === 'pending' ? <Loading text='обновление данных' /> :
                    qf.isSuccess &&
                    <StpDataTable
                        items={ qf.data }
                        selectedItems={ filters.ids }

                    />
                }
                {/* </Suspense> */ }
            </TabPanel>
            <TabPanel index={ 1 } value={ current }                >
                <Suspense fallback={ <Loading /> }>

                    <ComparePage />

                </Suspense>
            </TabPanel>
            {/* <React.Fragment>

                    <TabPanel value={ value } index={ 0 } >
                        {

                            // queryAll.isFetching ? <CircularProgress /> :
                            queryAll.status === 'success' ?


                                <MemoStpTable
                                    key={ _ID() }
                                    items={ filtered }
                                    selectedItems={ selected }
                                    selectorActions={ action }
                                />
                                :
                                <Loading text={ 'статус загрузки: ' + queryAll.status } />

                        }
                    </TabPanel>
                    
                    <TabPanel value={ value } index={ 2 } >

                    </TabPanel>
                </React.Fragment> */}

        </Box>
    )
})
TabPage.displayName = '__TabPage'
interface TabPanelProps {
    children?: React.ReactNode;

    index: number;
    value: number;
    path?: string
    pathtoCompare?: string
    className?: string
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={ value !== index }
            id={ `full-width-tabpanel-${index}` }
            aria-labelledby={ `full-width-tab-${index}` }
            { ...other }
        >
            { value === index && (
                <Box sx={ { p: 1, } }>
                    { children }
                </Box>
            ) }
        </div>
    );
}


