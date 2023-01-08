import { supabase } from '../../client'
import { useEffect, useState } from 'react'
import Post from '../post'
import PostCreate from './PostCreate'
import PostFilter from './PostFilter'
import Loading from '../loading'
import Link from 'next/link'
export default function Feed() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetchPosts()
    }, []);

    async function fetchPosts() {
        try {
            const { data } = await supabase
                .from('feed')
                .select('*')
                .order('id')
            setPosts(data)
        } catch (error) {
            alert('Error fetching the data!')
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const PostList = posts.map(post =>
        <Link href={`/post/${post.id}`} >
            <div className='border-2 border-grayblack-reddit rounded mb-4 mt-4 bg-black-reddit w-full hover:border-white-reddit'>
                <Post {...post} key={post.id} />
            </div>
        </Link>
    )
    return (
        <div className='space-y-4'>
            <PostCreate />
            <PostFilter />
            {isLoading ? <Loading /> : PostList}
        </div>
    )
}
