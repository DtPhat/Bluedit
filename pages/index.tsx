import Layout from '../components/layout'
import Feed from '../components/feed'
import Header from '../components/header'
import Banner from '../components/banner'
import About from '../components/about'
import Head from 'next/head'
export default function Home() {
  return (
    <>
      <Head>
          <title>Bluedit - Dive into anything</title>
      </Head>
      <Header />
      <div className='pt-10'>
        <Banner />
      </div>
      <main className='flex justify-center mt-6'>

        <div className='flex max-w-5xl w-full space-x-6'>
          <div className='flex-1 px-6 lg:px-0'>
            <Feed />
          </div>
          <div className='hidden lg:block'>
            <About />
          </div>
        </div>
      </main>
    </>
  )
}
