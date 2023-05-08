import User from "../../components/user";
import Head from 'next/head'
import Loading from '../../components/loading'
import { supabase } from '../../client.js'
import { useRouter } from 'next/router'
import Header from "../../components/header";
import NotFound from "../../components/notFound";
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
function UserPage({ user }) {
    const router = useRouter()
    if (router.isFallback) {
        return <Loading />
    }
    if(!user) {
        return <NotFound />
    }
    return (
        <div>
            <Header />
            <User {...user}/>
        </div>);
}
export default UserPage;