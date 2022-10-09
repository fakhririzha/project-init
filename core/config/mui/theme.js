import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#DDCBBF',
        },
        gray: {
            main: '#808191',
        },
        error: {
            main: red.A400,
        },
        white: {
            main: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: [
            'Lato',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 720,
            md: 1024,
            lg: 1200,
            xl: 1600,
            mobile: 0,
            tablet: 720,
            laptop: 1024,
            desktop: 1200,
            desktopXl: 1600,
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#221A17 !important',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ECE5DB',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ECE5DB',
                    color: '#221A17',
                    '&:hover': {
                        backgroundColor: '#DDCBBF',
                        color: '#221A17',
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#000000',
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '0px !important',
                    paddingRight: '0px !important',
                    backgroundColor: '#FFFFFF !important',
                },
            },
        },
    },
});

export default theme;
