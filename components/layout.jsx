import Header from "./header";
import Info from "./info";
function Layout({children}) {
    return (
        <>
            <Header />
            <main className='flex justify-center w-full h-full pt-16'>
                <div className='flex pt-6 max-w-5xl w-full space-x-6'>
                    <div className='flex-1 px-6 lg:px-0 '>
                        {children}
                    </div>
                    <div className='hidden lg:block'>
                        <Info />
                    </div>
                </div>
            </main>
        </>
    )
}
export default Layout;