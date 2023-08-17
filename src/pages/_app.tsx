import SideBar from '@/components/global/SideBar';
import TopBar from '@/components/global/TopBar';
import '@/styles/globals.css'
import { ColorModeContext, useMode } from '@/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <SideBar />
          <main className='content'>
            <TopBar ></TopBar>
            <Component {...pageProps} />
          </main>
          
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )


}
