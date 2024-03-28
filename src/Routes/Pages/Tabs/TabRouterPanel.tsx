import Box from '@mui/material/Box';
import React from 'react';

type TabRouterPanelProps = {
    children?: React.ReactNode;

    value: string;
    path: string;
};
export function TabRouterPanel(props: TabRouterPanelProps) {
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
