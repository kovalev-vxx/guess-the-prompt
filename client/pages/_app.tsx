import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "@/components/layout";
import {createTheme, ThemeProvider} from "@mui/material";
import {pink, indigo} from "@mui/material/colors";
import {wrapper} from "@/store";
import socketIOClient from "socket.io-client";
import {Provider} from 'react-redux';
import {IUser} from "@/models/IUser";
import {ISession} from "@/models/ISession";
import { Roboto } from '@next/font/google'
const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: pink,
    },
    typography: {
        fontFamily: [
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
    }
})

interface AppState {
    user: IUser,
    sessions: ISession[]
}


export const socket = socketIOClient("ws://localhost:8000")

export default function App({Component, ...rest}: AppProps) {
    const {store, props } = wrapper.useWrappedStore(rest)
    const { pageProps } = props;
    return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Layout className={roboto.className}>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </Provider>
    )
}