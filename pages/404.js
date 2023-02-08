import Link from "next/link";
function Custom404() {
    return (
        <div className=" p-4 h-screen w-screen flex bg-aurora bg-cover items-center justify-center">
            <div className="text-xl pb-5 font-bold">
                Page not does not exist. Return to main page 👉
            </div>
            <Link href='/' className="">
                <img className='w-[64px] ml-2 mb-5' src='/reddit-icon.svg' width={33} height={33} alt='icon' /> 
            </Link>
        </div>
    );
}

export default Custom404;