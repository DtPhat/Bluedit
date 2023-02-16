import Header from "./header";
import About from "./info/About";
function Layout({children}) {
    return (
        <>
            <Header />
            <main className='flex justify-center w-full h-full pt-16 mb-2'>
                <div className='flex pt-6 max-w-5xl w-full space-x-6'>
                    <div className='flex-1 px-6 lg:px-0 '>
                        {children}
                    </div>
                    <div className='hidden lg:block'>
                        <About />
                    </div>
                </div>
            </main>
        </>
    )
}
export default Layout;