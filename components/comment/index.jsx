
import { useContext, useEffect, useState } from 'react';
import { supabase } from '../../client';
import { RedditContext } from '../../context/RedditContext';
import Loading from '../loading';
import CommentList from './CommentList';
import NoComments from './NoComments';
import Link from 'next/link'
function CommentSection({ postId }) {
    const [loading, setLoading] = useState(true)
    const [commentList, setCommentList] = useState([])
    const [newComment, setNewComment] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { currentUser } = useContext(RedditContext)
    const username = currentUser ? currentUser.user_metadata.full_name : "Blueditor"
    useEffect(() => {
        getComments()
    }, []);
    const getComments = async () => {
        try {
            const { data } = await supabase
                .from('comments')
                .select('*, users(profileImage)')
                .match({ post_id: postId })
            setCommentList(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    const createComment = async () => {
        if (!newComment || submitting) return
        setSubmitting(true)
        try {
            await supabase
                .from('comments')
                .insert({ comment: newComment, post_id: postId, username: username })
        } catch (error) {
            console.log(error);
        } finally {
            getComments()
            setNewComment('')
            setSubmitting(false)
        }
    }

    return (
        <section>
            <div className='bg-white-reddit dark:bg-black-reddit px-[2.5rem]'>
                <div className='py-3'>
                    <div>
                        <div className='text-sm'>Comment as <Link href={`/user/${username}`} className='text-blue-400 cursor-pointer hover:underline'>{username}</Link></div>
                        <div className='flex flex-col border border-gray-300 dark:border-grayblack-reddit pb-4 relative rounded focus-within:border-black-reddit dark:focus-within:border-white-reddit '>
                            <textarea
                                className='rounded bg-white-reddit dark:bg-black-reddit py-2 px-4 outline-none group-focus:bg-white'
                                rows={7}
                                cols={10}
                                placeholder='What are your thoughts?'
                                onChange={(e) => setNewComment(e.target.value)}
                                value={newComment}
                            />
                            <div className='absolute bottom-0 w-full flex justify-end p-2 bg-gray-100 dark:bg-grayblack-reddit rounded-b'>
                                <div
                                    className={`bg-gray-reddit dark:bg-white-reddit text-gray-300 dark:text-gray-reddit px-4 p-0.5 rounded-full text-sm font-bold cursor-pointer
                                    ${newComment ? 'text-white-reddit dark:text-black-reddit bg-blue-500 hover:opacity-90' : 'cursor-not-allowed'}`}
                                    onClick={createComment}>
                                    {submitting ? <Loading size={"w-6 h-6"}/> : <span>Comment</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-2 border-graywhite-reddit dark:border-grayblack-reddit pb-1'>
                    <span className='text-sm text-blue-400'>Sort By: Best</span>
                </div>
            </div>
            <div className='bg-white-reddit dark:bg-black-reddit mt-4 p-3'>
                {loading ? <Loading /> :
                    commentList.length > 0 ?
                        <CommentList commentList={commentList} /> :
                        <NoComments />}
            </div>
        </section>
    );
}

export default CommentSection