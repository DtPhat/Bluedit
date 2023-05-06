import { supabase } from '../../client.js'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import CommentSection from '../../components/comment/'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Post from '../../components/post'
import NotFound from '../../components/notFound'
export async function getStaticPaths() {
    const { data } = await supabase
        .from('feed')
        .select('*')
    const paths = data.map(post => {
        return {
            params: {
                postId: post.id.toString()
            }
        }
    })
    return {
        paths,
        fallback: 'blocking'
    }
}
export async function getStaticProps(selectedPost) {
    const postId = parseInt(selectedPost.params.postId)
    let post = null
    try {
        const { data } = await supabase
            .from('feed')
            .select('*')
            .eq('id', postId)
            .single()
        post = data
    } catch (error) {
        console.log(error)
    }
    return {
        props: {
            post,
        },
        revalidate: 10,
    };
}



function PostPage({ post }) {
    const router = useRouter()
    if (router.isFallback) {
        return <Loading />
    }
    if (!post) {
        return <NotFound />
    }
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <Layout>
                <div className='border-2 rounded border-graywhite-reddit dark:border-grayblack-reddit mb-12 bg-white-reddit dark:bg-black-reddit'>
                    <Post {...post} />
                    <CommentSection postId = {post.id}/>
                </div>
            </Layout>
        </>
    );
}
export default PostPage;