import Feed from '../components/feed'
import Header from '../components/header'
import Banner from '../components/banner'
import Info from '../components/info'
import Head from 'next/head'
import BackToTop from '../components/common/BackToTop'
export default function Home() {
  return (
    <>
      <Head>
        <title>Bluedit - Delve into anything</title>
      </Head>
      <Header />
      <div className='min-w-[35rem]'>

        <div className='pt-10'>
          <Banner />
        </div>
        <main className='flex justify-center mt-6'>
          <div className='flex max-w-5xl w-full space-x-6 mx-6 lg:mx-0'>
            <div className='flex-1'>
              <Feed />
            </div>
            <div className='hidden lg:block mb-4'>
              <Info />
              <BackToTop />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

