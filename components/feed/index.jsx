import { supabase } from '../../client'
import { useEffect, useState, useContext } from 'react'
import Post from '../post'
import PostCreater from './PostCreater'
import PostFilter from './PostFilter'
import Link from 'next/link'
import Loading from '../loading'
import { RedditContext } from '../../context/RedditContext'
export default function Feed() {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const { currentUser } = useContext(RedditContext)
    const [postFilter, setPostFilter] = useState('hot')
    const field = postFilter==='hot'&&'id' || postFilter==='new'&&'inserted_at' || postFilter==='top'&&'upvotes'
    const isAscending =  postFilter==='hot'&&true || postFilter==='new'&&false || postFilter==='top'&&false
    useEffect(() => {
        fetchPosts()
    }, [postFilter]);
    useEffect(() => {
        saveAndUpdateUser()
    }, [currentUser]);
    async function fetchPosts() {
        try {
            const { data } = await supabase
                .from('feed')
                .select('*')
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
            onConflict: 'email'
        })
    }
    const PostList = posts.map(post =>
        <Link href={`/post/${post.id}`} key={post.id}>
            <div
                className='w-full border-2 border-graywhite-reddit dark:border-grayblack-reddit rounded my-4 bg-white-reddit dark:bg-black-reddit hover:border-white-reddit'
                key={post.id}>
                <Post {...post} />
            </div>
        </Link>
    )
    return (
        <div className='space-y-4'>
            <PostCreater />
            <PostFilter postFilter={postFilter} setPostFilter={setPostFilter}/>
            <div>{loading ? <Loading /> : PostList}</div>
        </div>
    )
}
