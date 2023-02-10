import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "@/components/layout";
import {createTheme, ThemeProvider} from "@mui/material";
import {pink, indigo} from "@mui/material/colors";
import socketIOClient from "socket.io-client";

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: pink,
  },
})

export const socket = socketIOClient("ws://localhost:8000")

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}><Layout><Component {...pageProps} /></Layout></ThemeProvider>
}
