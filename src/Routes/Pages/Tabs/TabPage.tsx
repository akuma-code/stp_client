import { Button, ButtonGroup, CircularProgress, LinearProgress, Paper, Stack, SvgIcon, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { PropsWithChildren, Suspense, useMemo, useState } from 'react';
import { GrTable } from 'react-icons/gr';
import { MdCompare } from 'react-icons/md';
import { Link, Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import { MemoStpTable, StpDataTable } from '../../../Components/StpTableView/StpDataTable';
import { Loading, SuspenseLoad } from '../../../Components/UI/SuspenseLoad';
import { _ID, _log } from '../../../Helpers/helpersFns';
import { useIdSelector } from '../../../Hooks/useIdSelector';
import { useLoadMore } from "../../../Hooks/useInfiniteLoad";
import { useLoadAllData } from "../../../Hooks/useLoadAllData";
import { useAppContext } from '../../../Hooks/useStoresContext';
import { routePaths } from '../../routePath';
import { ComparePage } from '../ComparePage';
import { useStpFilter } from '../../../Hooks/useCompare';
import { useRouteMatch } from '../../../Hooks/useRouteMatch';
import { MuiLink } from '../MuiLink';
import { TabRouterPanel } from './TabRouterPanel';
import TabContainer from './TabContainer';
import { FilterDrawer } from '../../../Components/UI/SideDrower/DrawerFilter';
type TabPageProps = PropsWithChildren & {

}
const TabIcon = React.memo(() => <SvgIcon sx={ { fontSize: 20 } }><GrTable /> </SvgIcon>)
TabIcon.displayName = '*TabIcon'
const CompIcon = React.memo(() => <SvgIcon sx={ { fontSize: 20 } }><MdCompare /> </SvgIcon>)
CompIcon.displayName = '*CompareIcon'
//__TABPAGE____
export const TabPage: React.FC<TabPageProps> = () => {
    const { query, filterParams } = useAppContext()
    const queryAll = useLoadAllData()
    const [selected, action] = useIdSelector()
    const [value, setValue] = React.useState<number>(0);
    const filtered = useStpFilter(queryAll.data, query, filterParams)
    const handleChange = (event: React.SyntheticEvent, new_index: number) => {
        setValue(new_index);
    };



    return (
        <Box sx={ { bgcolor: 'background.paper' } } component={ Paper } elevation={ 2 }>
            <AppBar position="static" color='info' >

                <Stack direction={ 'row' } justifyContent={ 'start' } alignItems={ 'baseline' } spacing={ 3 }>
                    <FilterDrawer />
                    <Tabs
                        value={ value }
                        onChange={ handleChange }
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="standard"

                        sx={ { [`& .MuiTab-root`]: { fontWeight: 'bolder' } } }

                    >
                        <Tab
                            label="Таблица"
                            value={ 0 }
                            icon={ <TabIcon /> }
                            iconPosition='start' />


                        <Tab
                            label="Сравнить"
                            value={ 1 }
                            icon={ <CompIcon /> }
                            iconPosition='start'
                            disabled={ selected.length === 0 }
                        />


                    </Tabs>


                </Stack>
            </AppBar >


            <Suspense fallback={ <Loading /> }>

                <TabPanel index={ 0 } value={ value }>
                    { queryAll.isSuccess &&
                        <StpDataTable
                            items={ filtered }
                            selectedItems={ selected }
                            selectorActions={ action }
                        />
                    }
                </TabPanel>
            </Suspense>
            <Suspense fallback={ <Loading /> }>

                <TabPanel index={ 1 } value={ value }
                >
                    <ComparePage />

                </TabPanel>
            </Suspense>
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
}

interface TabPanelProps {
    children?: React.ReactNode;

    index: number;
    value: number;
    path?: string
    pathtoCompare?: string
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
                <Box sx={ { p: 1 } }>
                    { children }
                </Box>
            ) }
        </div>
    );
}


