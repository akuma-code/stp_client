/* eslint-disable react/jsx-pascal-case */
import { Stack, SvgIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { observer } from 'mobx-react-lite';
import React, { PropsWithChildren, Suspense } from 'react';
import { GrTable } from 'react-icons/gr';
import { MdCompare } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router-dom';
import { StpDataTable } from '../../../Components/StpTableView/StpDataTable';
import { FilterDrawer } from '../../../Components/UI/SideDrower/DrawerFilter';
import { Loading } from '../../../Components/UI/SuspenseLoad';
import { useQueryFiltersLoader } from '../../../Hooks/QueryHooks/useQueryFiltersLoader';
import { useFilterContext } from '../../../Hooks/useFilterContext';
import { routePaths } from '../../routePath';
import { MuiLink } from '../MuiLink';
type TabPageProps = PropsWithChildren & {
    initTab?: number
}
const TabIcon = React.memo(() => <SvgIcon sx={ { fontSize: 20 } }><GrTable /> </SvgIcon>)
TabIcon.displayName = '*TabIcon'
const CompIcon = React.memo(() => <SvgIcon sx={ { fontSize: 20 } }><MdCompare /> </SvgIcon>)
CompIcon.displayName = '*CompareIcon'
//__TABPAGE____


const initFn = (tab = 3) => tab
export const TabPage: React.FC<TabPageProps> = observer(({ initTab }) => {
    const nav = useNavigate()
    // const queryAll = useLoadAllData()
    // const { query } = useAppContext()
    const qf = useQueryFiltersLoader()
    const { filters } = useFilterContext()
    // const [selected, action] = useIdSelector()
    const [current, setCurrent] = React.useState<number>(initTab || 0);
    // const filtered = useStpFilter(queryAll.data, query, filterParams)



    const selectedText = filters.ids.length > 0 ? `Сравнить выбранные (${filters.ids.length})` : `Выберите стеклопакеты для сравнения`
    const handleChange = (event: React.SyntheticEvent, new_index: number) => {
        const path = {
            'table': '/v1',
            'compare': routePaths.compare
        }
        const paths = [path.table, path.compare] as const
        setCurrent(new_index);
        new_index <= 1 && nav(paths[new_index])
    };

    // useEffect(() => {
    //     const filtered = filters.filterItems(queryAll.data ?? [])
    //     _log("ctx_filtered: ", filtered.length)
    // }, [filters.cams, filters.depth, filters.tags, queryAll.data])
    // useEffect(() => {

    //     _log("toast")
    //     ErrorToast()

    // }, [qf.isSuccess])
    return (
        <>

            <Box sx={ { h: '100%' } }>
                <AppBar position="static" color='info' sx={ { maxHeight: '4em' } } >

                    <Stack direction={ 'row' } justifyContent={ 'start' } alignItems={ 'center' } spacing={ 8 }>

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

                                LinkComponent={ MuiLink }
                            />


                            <Tab
                                label={ selectedText }
                                value={ 1 }
                                icon={ <CompIcon /> }
                                iconPosition='start'
                                LinkComponent={ MuiLink }
                            // disabled={ filters.ids.length === 0 }
                            />
                            {/* <Tab
                                label={ `Table v2` }
                                value={ 2 }
                                icon={ <TabIcon /> }
                                iconPosition='start'

                            />
                            <Tab
                                label={ `MRT_Table` }
                                value={ 3 }
                                icon={ <TabIcon /> }
                                iconPosition='start'
                                onClick={ () => toast.error("mrt loaded!") }
                            /> */}


                        </Tabs>

                        <FilterDrawer />
                    </Stack>
                </AppBar >



                <TabPanel index={ 0 } value={ current } >
                    {

                        qf.isSuccess &&
                        <Suspense fallback={ <Loading /> }>
                            <StpDataTable
                                items={ qf.data }
                                selectedItems={ filters.ids }

                            />
                        </Suspense>

                    }
                </TabPanel>
                <TabPanel index={ 1 } value={ current }>
                    <Suspense fallback={ <Loading /> }>

                        {/* <ComparePage /> */ }
                        <Outlet context={ filters.ids } />
                    </Suspense>
                </TabPanel>
                {/* <TabPanel index={ 2 } value={ current } className='bg-blue-400'>
                    <TableDataContainer />
                </TabPanel>
                <TabPanel index={ 3 } value={ current } >
                    {
                        // qf.status === 'success' &&

                        <MRT_Container />
                    }
                </TabPanel> */}

            </Box>

        </>
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
                <Box sx={ { p: 0, } }>
                    { children }
                </Box>
            ) }
        </div>
    );
}


