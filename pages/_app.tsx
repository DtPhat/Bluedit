import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { RedditProvider } from '../context/RedditContext'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RedditProvider>
      <Component {...pageProps} />
    </RedditProvider>
  )
}
