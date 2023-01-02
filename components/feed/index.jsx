import { supabase } from '../../client'
import { useEffect, useState } from 'react'
import Post from '../post'
import PostCreate from './PostCreate'
import PostFilter from './PostFilter'
import Loading from '../loading'
export default function Feed() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetchPosts()
    }, []);

    async function fetchPosts() {
        const { data } = await supabase
            .from('feed')
            .select('*')
        setPosts(data)
        setIsLoading(false)
    }
    const PostList = posts.map(post => <Post {...post} id={post.id} />)
    return (
        <div className='space-y-4'>
            <PostCreate />
            <PostFilter />
            {isLoading ? <Loading /> : PostList}
        </div>
    )
}
