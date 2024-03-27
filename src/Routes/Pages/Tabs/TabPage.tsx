import { Button, ButtonGroup, CircularProgress, Stack, SvgIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { PropsWithChildren, useMemo, useState } from 'react';
import { GrTable } from 'react-icons/gr';
import { MdCompare } from 'react-icons/md';
import { matchPath, redirect, useLocation } from 'react-router-dom';
import { MemoStpTable } from '../../../Components/StpTableView/StpDataTable';
import { SuspenseLoad } from '../../../Components/UI/SuspenseLoad';
import { _ID, _log } from '../../../Helpers/helpersFns';
import { useIdSelector } from '../../../Hooks/useIdSelector';
import { useLoadMore } from "../../../Hooks/useInfiniteLoad";
import { useAppContext } from '../../../Hooks/useStoresContext';
import { routePaths } from '../../routePath';
import { ComparePage } from '../ComparePage';
type TabPageProps = PropsWithChildren & {

}

export const TabPage: React.FC<TabPageProps> = (props) => {
    const routeMatch = useRouteMatch([
        routePaths.compare,
        routePaths.table,
    ]);
    const currentTab = routeMatch?.pattern?.path || "table";
    // const { data, } = useQuery({ queryKey: ['saved_stp_data'], queryFn: GetStpDataPromise },)
    const [p, setPage] = useState(0)

    const queryContext = useLoadMore()


    const { StpStore, query, filterParams } = useAppContext()
    // const filtered = useStpFilter(data, query, filterParams)
    const [selected, action] = useIdSelector()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {

        setValue(newValue);
    };
    const handleChangeRoute = (event: React.SyntheticEvent, newValue: string) => {
        redirect(newValue)

    };


    const handleNext = () => {
        if (queryContext.hasNextPage) {
            setPage(prev => prev + 1)
            queryContext.fetchNextPage()
        }
        else _log("This is last page")
    }
    const handlePrev = () => {
        setPage(0)
        queryContext.fetchPreviousPage()
    }

    const current_page = useMemo(() => {
        const arr = queryContext?.data?.pages.map(p => p.data)
        return arr?.flat()


    }, [queryContext?.data?.pages])
    const isDisabled = () => queryContext.status === 'pending'
    // console.log('list', queryContext.data)
    return (
        <Box sx={ { bgcolor: 'background.paper' } }>
            <AppBar position="static" color='info' >
                <Stack direction={ 'row' } justifyContent={ 'space-evenly' }>

                    <Tabs
                        value={ value }
                        onChange={ handleChange }
                        indicatorColor="primary"
                        textColor="primary"
                        variant="standard"
                        sx={ { [`& .MuiTab-root`]: { fontWeight: 'bolder' } } }

                    >
                        <Tab label="Таблица" value={ 0 } icon={ <SvgIcon sx={ { fontSize: 20 } }><GrTable /> </SvgIcon> } iconPosition='start'
                        //  { ...a11yProps(0) }
                        />
                        <Tab label="Сравнить" value={ 1 } icon={ <SvgIcon sx={ { fontSize: 20 } }><MdCompare /> </SvgIcon> } iconPosition='start'
                        //  { ...a11yProps(1) }
                        />

                    </Tabs>
                    <ButtonGroup orientation='horizontal' variant='contained' size='small'>

                        <Button
                            onClick={ handlePrev }
                        >load first page
                        </Button>
                        <Button
                            disabled={ isDisabled() }
                            onClick={ handleNext }
                        >
                            {
                                queryContext.isLoading
                                    ?
                                    <CircularProgress color='primary' variant={ 'indeterminate' } />
                                    :
                                    queryContext.isFetchingNextPage ?
                                        `is loading next...` :
                                        `Load Next`
                            }
                        </Button>
                    </ButtonGroup>
                </Stack>
            </AppBar >
            <React.Fragment>

                <SuspenseLoad loadText='data loading...'>
                    <TabPanel value={ value } index={ 0 } >
                        {
                            current_page &&


                            <MemoStpTable
                                key={ _ID() }
                                items={ current_page }
                                selectedItems={ selected }
                                selectorActions={ action }
                            />


                        }
                    </TabPanel>
                </SuspenseLoad>
                <TabPanel value={ value } index={ 1 } >
                    <ComparePage />
                </TabPanel>
                <TabPanel value={ value } index={ 2 } >

                </TabPanel>
            </React.Fragment>
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

type TabRouterPanelProps = {
    children?: React.ReactNode;

    value: string;
    path: string
}
function TabRouterPanel(props: TabRouterPanelProps) {
    const { children, path, value } = props;

    return (
        <div
            role="tabpanel"
            hidden={ value !== path }
            id={ `full-width-tabpanel-${path}` }
            aria-labelledby={ `full-width-tab-${path}` }

        >
            { value === path && (
                <Box sx={ { p: 1 } }>
                    { children }
                </Box>
            ) }
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
function useRouteMatch(patterns: readonly string[]) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}
