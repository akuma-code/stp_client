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
    components: {
        MuiTooltip: {
            styleOverrides: {
                // Name of the slot
                tooltip: {
                    textJustify: 'auto',
                    fontSize: '1rem',
                },
            },
            defaultProps: {

                arrow: true,

            },

        }

    },
})


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
            paper: orange[200],
        },
    },

    // props: {
    // MuiTooltip: {
    //     arrow: true,
    //     fontSize: 20,
    // },
    // },
};
export default theme;