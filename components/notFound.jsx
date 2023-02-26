import Link from "next/link";
function NotFound() {
    return (
        <div className=" p-4 h-screen w-screen flex bg-aurora bg-cover items-center justify-center">
            <div className="text-xl pb-5 font-bold">
                Page does not exist. Return to main page 👉
            </div>
            <Link href='/'>
                <div className='flex px-2 space-x-2 min-w-[2rem] pb-4'>
                    <img className='w-[2rem]' src='/reddit-icon.svg' width={33} height={33} alt='icon' />
                    <img className='w-[4rem] hidden lg:block' src='/reddit-text-dark.svg' width={64} height={64} alt='blueddit' />
                </div>
            </Link>
        </div>
    );
}

export default NotFound;