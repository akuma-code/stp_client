import React, { PropsWithChildren, useEffect, useMemo } from 'react'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useInfiniteQuery, useQuery } from 'react-query';
import { GetPartialStpDataPromise, GetStpDataPromise, LazyStpData } from '../../../Components/StpTable/FullTable';
import { MemoStpTable, StpData } from '../../../Components/StpTableView/StpDataTable';
import { useIdSelector } from '../../../Hooks/useIdSelector';
import { SuspenseLoad } from '../../../Components/UI/SuspenseLoad';
import { useAppContext } from '../../../Hooks/useStoresContext';
import { useStpFilter } from '../../../Hooks/useCompare';
import { ComparePage } from '../ComparePage';
import { _log } from '../../../Helpers/helpersFns';
type TabPageProps = PropsWithChildren & {

}

export const TabPage: React.FC<TabPageProps> = (props) => {
    const {
        data,

    } = useQuery('saved_stp_data', GetStpDataPromise,)
    const {
        data: data2,

    } = useInfiniteQuery('saved_stp_data_cursor', ({ pageParam }) => GetPartialStpDataPromise({ itemsCount: pageParam }), {
        getNextPageParam: (last, pages) => last.nextCursor
    })

    _log(data2?.pages)
    const { StpStore, query, filterParams } = useAppContext()
    // const filtered = useStpFilter(data, query, filterParams)
    const [selected, action] = useIdSelector()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
            </AppBar >
            <React.Fragment

            >
                <TabPanel value={ value } index={ 0 } >
                    <SuspenseLoad loadText='data loading...'>
                        { data &&
                            <MemoStpTable

                                items={ data }
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
                    Item Three
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