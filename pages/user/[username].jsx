import Profile from "../../components/profile";
import Head from 'next/head'
import Loading from '../../components/loading'
import { supabase } from '../../client.js'
import { useRouter } from 'next/router'
import Header from "../../components/header";
export async function getStaticPaths() {
    const { data } = await supabase
        .from('users')
        .select('*')
    const paths = data.map(user => {
        return {
            params: {
                username: user.name
            }
        }
    })
    return {
        paths,
        fallback: true
    }
}
export async function getStaticProps({ params }) {
    const username = params.username.toString()
    const { data } = await supabase
        .from('users')
        .select('*')
        .eq('name', username)
        .single()
    return {
        props: {
            user: data,
        },
    }
}
function User({ user }) {
    const router = useRouter()
    if (router.isFallback) {
        return <Loading />
    }
    const { email, name, profileImage, created_at } = user

    return (
        <div>
            <Header />
            <main className='flex justify-center w-full h-full pt-24 p-6 lg:px-0 '>
                <div className='px-16 max-w-5xl w-full border-2 rounded-xl bg-white-reddit dark:bg-black-reddit border-gray-reddit dark:border-grayblack-reddit pt-8 pb-16'>
                    <div className="text-3xl mb-10 pb-3 border-b-2 text-gray-600 dark:text-gray-400 border-gray-600 dark:border-gray-400">
                        <h1 className="font-semibold">{name}'s Profile</h1>
                        <h2 className="text-xl font-normal">u/{name}</h2>
                    </div>
                    <div className="w-full px-6 sm:p-0 sm:flex space-x-2 space-y-3 justify-center md:space-x-16 lg:space-x-24 items-center">
                        <img src={profileImage} className="w-28 rounded-xl" alt="profile image" width={64} />
                        <div className="flex flex-col  space-y-2">
                            <p>
                                <h5 className="font-bold">Fullname:</h5>
                                <span>{name === 'Bluediter' ? 'Anonymous user' : name}</span>
                            </p>
                            <p>
                                <h5 className="font-bold">Email:</h5>
                                <span>{email}</span>
                            </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p>
                                <h5 className="font-bold">Cake day:</h5>
                                <p>🍰 {created_at.slice(0, 10)}</p>
                            </p>
                            <p>
                                <h5 className="font-bold">Karma:</h5>
                                <p>💠 {name === 'Bluediter' ? '0' : '100'}</p>
                            </p>
                        </div>
                        <button className="bg-blue-500 dark:bg-white-reddit border-blue-500 dark:border-gray-reddit text-white-reddit dark:text-black-reddit py-2 px-12 rounded-full font-bold text-xl"
                            style={{cursor: name === 'Bluediter'?'not-allowed':'pointer'}}
                        >Follow</button>
                    </div>
                </div>
            </main>
        </div>);
}
export default User;