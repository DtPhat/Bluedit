import { supabase } from '../../client.js'
import Vote from '../../components/post/Vote'
import Actions from '../../components/post/Actions'
import Comment from '../../components/post/Comment'
import Layout from '../../components/layout'
import NoComments from '../../components/post/NoComments'
import Loading from '../../components/loading'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <Layout>
                <div className='flex rounded px-1 bg-black-reddit w-full border border-grayblack-reddit'>
                    <div className='pt-2'>
                        <Vote upvotes={post.upvotes} downvotes={post.downvotes} />
                    </div>
                    <div className='flex flex-col space-y-2 py-2 w-full'>
                        <span className='text-xs text-gray-reddit'>
                            Posted by u/{post.author} • 7 days ago
                        </span>
                        <h1 className='text-lg font-medium'>{post.title}</h1>
                        <p>{post.content}</p>
                        <div>
                            <Actions />
                        </div>
                        <div className='py-6'>
                            <span className='text-sm'>Comment as Tienphat</span>
                            <Comment />
                        </div>
                        <div className='border-b border-gray-reddit pb-1 mr-[2.5rem]'>
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