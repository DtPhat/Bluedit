import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { RedditProvider } from '../context/RedditContext'
import { ThemeProvider } from 'next-themes'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RedditProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </RedditProvider>
  )
}
