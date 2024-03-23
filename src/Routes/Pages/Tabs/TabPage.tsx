import React, { PropsWithChildren } from 'react'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
type TabPageProps = PropsWithChildren & {

}

export const TabPage: React.FC<TabPageProps> = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={ { bgcolor: 'background.paper' } }>
            <AppBar position="static" color='warning'>
                <Tabs
                    value={ value }
                    onChange={ handleChange }
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    sx={ { [`& .MuiTab-root`]: { fontWeight: 'bolder' } } }

                >
                    <Tab label="Таблица" { ...a11yProps(0) } />
                    <Tab label="Сравнить" { ...a11yProps(1) } />

                </Tabs>
            </AppBar >
            <React.Fragment
            // onChangeIndex={handleChangeIndex}wwwwwwwwwwwwww
            >
                <TabPanel value={ value } index={ 0 } >
                    Item One
                </TabPanel>
                <TabPanel value={ value } index={ 1 } >
                    Item Two
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
                <Box sx={ { p: 3 } }>
                    <Typography>{ children }</Typography>
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