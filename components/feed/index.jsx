import { supabase } from '../../client'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Post from '../post'
import PostCreater from './PostCreater'
import PostFilter from './PostFilter'
import NoPosts from './NoPosts'
import Link from 'next/link'
import Loading from '../loading'
import { RedditContext } from '../../context/RedditContext'
export default function Feed() {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const { currentUser } = useContext(RedditContext)
    const [postFilter, setPostFilter] = useState('hot')
    const field = postFilter === 'hot' && 'id' || postFilter === 'new' && 'inserted_at' || postFilter === 'top' && 'upvotes'
    const isAscending = postFilter === 'hot' && true || postFilter === 'new' && false || postFilter === 'top' && false

    const router = useRouter()
    const keyword = router.query.keyword ? router.query.keyword : ''
    useEffect(() => {
        fetchPosts()
    }, [postFilter, keyword]);
    useEffect(() => {
        saveAndUpdateUser()
    }, [currentUser]);

    console.log(keyword);
    async function fetchPosts() {
        try {
            const { data } = await supabase
                .from('feed')
                .select('*')
                .ilike('title', '%' + keyword + '%')
                .order(field, { ascending: isAscending })
            setPosts(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const saveAndUpdateUser = async () => {
        if (!currentUser) return
        await supabase.from('users').upsert({
            email: currentUser.user_metadata.email,
            name: currentUser.user_metadata.full_name,
            profileImage: currentUser.user_metadata.avatar_url,
        }, {
            onConflict: 'name'
        })
    }
    const PostList = posts.map(post =>
        <Link href={`/post/${post.id}`} key={post.id} legacyBehavior>
            <div
                className='w-full border cursor-pointer border-graywhite-reddit dark:border-grayblack-reddit rounded my-4 bg-white-reddit dark:bg-black-reddit hover:border-gray-reddit hover:dark:border-gray-500'
                key={post.id}>
                <Post {...post} />
            </div>
        </Link>
    )
    return (
        <section className='space-y-4 pb-12'>
            <PostCreater />
            <PostFilter postFilter={postFilter} setPostFilter={setPostFilter} />
            {loading ? <Loading /> :
                posts.length > 0 ? PostList :
                    <NoPosts keyword={keyword}/>}
        </section>
    )
}
