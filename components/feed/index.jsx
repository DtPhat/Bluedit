import { supabase } from '../../client'
import { useEffect, useState, useContext } from 'react'
import Post from '../post'
import PostCreate from './PostCreate'
import PostFilter from './PostFilter'
import Link from 'next/link'
import Loading from '../loading'
import { useRouter } from 'next/navigation'
import { RedditContext } from '../../context/RedditContext'
export default function Feed() {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const router = useRouter()
    const { currentUser } = useContext(RedditContext)
    useEffect(() => {
        saveAndUpdateUser()
        fetchPosts()
    }, [currentUser]);

    async function fetchPosts() {
        try {
            const { data } = await supabase
                .from('feed')
                .select('*')
                .order('id')
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
        <Link href={`/post/${post.id}`}>
            <div
                className='cursor-pointer border-2 border-grayblack-reddit rounded mb-4 mt-4 bg-black-reddit w-full hover:border-white-reddit'
                key={post.id}>
                <Post {...post} />
            </div>
        </Link>
    )
    return (
        <div className='space-y-4'>
            <PostCreate />
            <PostFilter />
            {loading ? <Loading /> : PostList}
        </div>
    )
}
