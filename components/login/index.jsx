import Link from "next/link";
import { useTheme } from "next-themes";
import { supabase } from '../../client'
function Login() {
    const {theme} = useTheme();
    async function signInWithGoogle() {
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
        } catch (error) {
            console.log(error)
        }
    }

    // className="w-[320px] h-[180px]"
    //                     src='/reddit-logo.png'
    //                     width={320}
    //                     height={180}
    //                     alt="Reddit logo"

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="max-w-lg w-full flex flex-col space-y-12 h-5/6 items-center justify-center bg-white-reddit dark:bg-black-reddit rounded-3xl">
                <Link href='/' className="pb-16 flex space-x-2">
                    <img className='w-[120px]' src='/reddit-icon.svg' width={33} height={33} alt='icon' />
                    <img className='w-[180px] hidden lg:block' src={theme === 'light' ? '/reddit-text-light.svg' : '/reddit-text-dark.svg'} width={62} height={62} alt='blueddit' />
                </Link>
                <span className="w-72">By continuing, you agree are setting up a Reddit account and agree to our&nbsp;
                    <a href="https://www.redditinc.com/policies/user-agreement" target='_blank' className="text-blue-400">User Agreement </a>
                    and&nbsp;
                    <a href="https://www.redditinc.com/policies/user-agreement" target='_blank' className="text-blue-400">Privacy Policy</a>.
                </span>

                <div className="flex flex-col space-y-4">
                    <button className="w-72 flex justify-center border-2 border-gray-reddit rounded-full px-6 py-3 space-x-4 bg-graywhite-reddit dark:bg-grayblack-reddit hover:bg-black-reddit dark:hover:bg-white-reddit group"
                        onClick={signInWithGoogle}>
                        <img
                            className="h-6 w-6"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                            alt="Google Icon"
                            width={24} />
                        <span className="font-bold group-hover:text-white-reddit dark:group-hover:text-black-reddit">Sign in with Google</span>
                    </button>
                    <button className="w-72 flex justify-center border-2 border-gray-reddit rounded-full px-6 py-3 space-x-4 bg-graywhite-reddit dark:bg-grayblack-reddit hover:bg-black-reddit dark:hover:bg-white-reddit group">
                        <img
                            className="h-6 w-5"
                            src="https://www.clipartmax.com/png/full/34-347603_white-apple-logo-transparent.png"
                            alt="Apple Icon"
                            width={24} />
                        <span className="font-bold group-hover:text-white-reddit dark:group-hover:text-black-reddit">Sign in with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
