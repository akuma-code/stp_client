import { createTheme } from '@mui/material/styles';
import { red, yellow, orange } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';
// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#1267cfe9',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: `#E31E24`,
        },
        warning: {
            main: red.A700
        },
        info: {
            main: yellow[900]
        },
    },


});


export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#3f11b5',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            paper: '#b9b2b2',
        },
    },

    // props: {
    //     MuiTooltip: {
    //         arrow: true,
    //         fontSize: 20,
    //     },
    // },
};
export default theme;