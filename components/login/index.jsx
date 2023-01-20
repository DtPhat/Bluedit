import Link from "next/link";
import { supabase } from '../../client'
function Login() {
    async function signInWithGoogle() {
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="max-w-lg w-full flex flex-col space-y-12 h-5/6 items-center justify-center bg-black-reddit rounded-3xl">
                <Link href='/' className="pb-16">
                    <img
                        className="w-[320px] h-[180px]"
                        src='/reddit-logo.png'
                        width={320}
                        height={180}
                        alt="Reddit logo"
                    />
                </Link>
                <span className="w-72">By continuing, you agree are setting up a Reddit account and agree to our&nbsp;
                    <a href="https://www.redditinc.com/policies/user-agreement" target='_blank' className="text-blue-400">User Agreement </a>
                    and&nbsp;
                    <a href="https://www.redditinc.com/policies/user-agreement" target='_blank' className="text-blue-400">Privacy Policy</a>.
                </span>

                <div className="flex flex-col space-y-4">
                    <button className="w-72 flex justify-center border-2 border-gray-reddit rounded-full px-6 py-3 space-x-4 bg-grayblack-reddit hover:bg-white-reddit group"
                        onClick={signInWithGoogle}>
                        <img
                            className="h-6 w-6"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                            alt="Google Icon"
                            width={24} />
                        <span className="font-bold text-white-reddit group-hover:text-black-reddit">Sign in with Google</span>
                    </button>
                    <button className="w-72 flex justify-center border-2 border-gray-reddit rounded-full px-6 py-3 space-x-4 bg-grayblack-reddit hover:bg-white-reddit group">
                        <img
                            className="h-6 w-5"
                            src="https://www.clipartmax.com/png/full/34-347603_white-apple-logo-transparent.png"
                            alt="Apple Icon"
                            width={24} />
                        <span className="font-bold text-white-reddit group-hover:text-black-reddit">Sign in with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
