import { supabase } from '../../client.js'
import Comment from '../../components/post/Comment'
import Layout from '../../components/layout'
import NoComments from '../../components/post/NoComments'
import Loading from '../../components/loading'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Post from '../../components/post'
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
        fallback: true
    }
}
export async function getStaticProps(selectedPost) {
    const postId = parseInt(selectedPost.params.postId)
    const { data } = await supabase
        .from('feed')
        .select('*')
        .eq('id', postId)
        .single()
    return {
        props: {
            post: data,
        },
    }
}



function PostPage({ post }) {
    const router = useRouter()
    if (router.isFallback) {
        return <Loading />
    }
    const { id, title, author, content, type, upvotes, downvotes } = post
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Layout>
                <div className='border-2 rounded border-grayblack-reddit'>
                    <Post {...post} />
                    <div className='bg-black-reddit px-[2.5rem]'>
                        <div className='py-3'>
                            <span className='text-sm'>Comment as Blueditor</span>
                            <Comment />
                        </div>
                        <div className='border-b-2 border-grayblack-reddit pb-1'>
                            <span className='text-sm'>Sort By: Best</span>
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