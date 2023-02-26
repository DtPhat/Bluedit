import { supabase } from '../../client.js'
import CommentForm from '../../components/comment/CommentForm'
import Layout from '../../components/layout'
import NoComments from '../../components/comment/NoComments'
import Loading from '../../components/loading'
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
    const { title } = post
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Layout>
                <div className='border-2 rounded border-graywhite-reddit dark:border-grayblack-reddit mb-4'>
                    <Post {...post} />
                    <div className='bg-white-reddit dark:bg-black-reddit px-[2.5rem]'>
                        <div className='py-3'>
                            <CommentForm />
                        </div>
                        <div className='border-b-2 border-graywhite-reddit dark:border-grayblack-reddit pb-1'>
                            <span className='text-sm text-blue-400'>Sort By: Best</span>
                        </div>
                        <div>
                            <NoComments />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default PostPage;