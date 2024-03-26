import { Button, ButtonGroup } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import React, { PropsWithChildren, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetStpDataPromise } from '../../../Components/StpTable/FullTable';
import { MemoStpTable, StpData } from '../../../Components/StpTableView/StpDataTable';
import { SuspenseLoad } from '../../../Components/UI/SuspenseLoad';
import { useIdSelector } from '../../../Hooks/useIdSelector';
import { useInfiniteLoad, useLoadMore } from "../../../Hooks/useInfiniteLoad";
import { useAppContext } from '../../../Hooks/useStoresContext';
import { ComparePage } from '../ComparePage';
import { _ID } from '../../../Helpers/helpersFns';
type TabPageProps = PropsWithChildren & {

}

export const TabPage: React.FC<TabPageProps> = (props) => {
    // const { data, } = useQuery({ queryKey: ['saved_stp_data'], queryFn: GetStpDataPromise },)
    const [p, setPage] = useState(0)

    const { data, fetchNextPage, isFetchingNextPage, fetchPreviousPage, hasNextPage, isSuccess } = useLoadMore()

    // const {
    //     data: list,
    //     fetchNextPage, fetchPreviousPage
    // } = useInfiniteQuery('saved_stp_data_cursor',
    //     ({ pageParam }) => GetPartialStpDataPromise({ itemsCount: pageParam }),
    //     {
    //         getNextPageParam: (last, pages) => last.nextCursor ?? false,
    //         getPreviousPageParam: (prev) => prev.prevCursor ?? false
    //     })
    // const adata = data ? StpApiFetch(data) : StpApiFetch([])

    // console.log('adata', adata(3, 10))
    const { StpStore, query, filterParams } = useAppContext()
    // const filtered = useStpFilter(data, query, filterParams)
    const [selected, action] = useIdSelector()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const handleNext = () => {
        setPage(prev => prev + 1)
        fetchNextPage()
    }
    const handlePrev = () => {
        setPage(prev => Math.max(0, 0))
        fetchPreviousPage()
    }
    console.log('list', data.pages)
    return (
        <Box sx={ { bgcolor: 'background.paper' } }>
            <AppBar position="static" color='info'>
                <Tabs
                    value={ value }
                    onChange={ handleChange }
                    indicatorColor="primary"
                    textColor="primary"
                    variant="standard"
                    sx={ { [`& .MuiTab-root`]: { fontWeight: 'bolder' } } }

                >
                    <Tab label="Таблица" { ...a11yProps(0) } />
                    <Tab label="Сравнить" { ...a11yProps(1) } />

                </Tabs>
                <ButtonGroup orientation='horizontal'>

                    <Button
                        onClick={ handlePrev }
                    >load first page
                    </Button>
                    <Button
                        disabled={ !hasNextPage || isFetchingNextPage }
                        onClick={ handleNext }
                    >LoadNext { p + 1 }
                    </Button>
                </ButtonGroup>
            </AppBar >
            <React.Fragment>
                <TabPanel value={ value } index={ 0 } >
                    <SuspenseLoad loadText='data loading...'>
                        {
                            data && data.pages &&

                            <MemoStpTable
                                key={ _ID() }
                                items={ data.pages.map((page: { data: StpData[] }) => page.data) }
                                selectedItems={ selected }
                                selectorActions={ action }
                            />


                        }
                    </SuspenseLoad>
                </TabPanel>
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
    dir?: string;
    index: number;
    value: number;
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

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={ { bgcolor: 'background.paper', width: 500 } }>
            <AppBar position="static">
                <Tabs
                    value={ value }
                    onChange={ handleChange }
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Item One" { ...a11yProps(0) } />
                    <Tab label="Item Two" { ...a11yProps(1) } />
                    <Tab label="Item Three" { ...a11yProps(2) } />
                </Tabs>
            </AppBar>
            <React.Fragment
            // onChangeIndex={handleChangeIndex}wwwwwwwwwwwwww
            >
                <TabPanel value={ value } index={ 0 } dir={ theme.direction }>
                    Item One
                </TabPanel>
                <TabPanel value={ value } index={ 1 } dir={ theme.direction }>
                    Item Two
                </TabPanel>
                <TabPanel value={ value } index={ 2 } dir={ theme.direction }>
                    Item Three
                </TabPanel>
            </React.Fragment>
        </Box>
    );
}