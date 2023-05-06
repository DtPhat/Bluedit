import showTime from '../../utils/showTime'
import CommentVote from './CommentVote'
import CommentEditing from './CommentEditing'
import {
    ChatBubbleLeftIcon,
    EllipsisHorizontalIcon,
    ArrowsPointingOutIcon,
    TrashIcon,
    PencilIcon
} from '@heroicons/react/24/outline'
import useExpandableComponent from '../../hooks/useExpandableComponent'
import { useContext, useState } from 'react'
import { RedditContext } from '../../context/RedditContext'
import { useRouter } from 'next/router'
import { supabase } from '../../client'
function CommentItem({ item }) {
    const { comment_id, created_at, post_id, username, comment, downvotes, upvotes, users: { profileImage } } = item
    const [editing, setEditting] = useState(false)
    const [displayingContent, setDisplayingContent] = useState(true)
    const { expandableRef, expanding, setExpanding } = useExpandableComponent(false)
    const { currentUser } = useContext(RedditContext)
    const currentUsername = currentUser ? currentUser.user_metadata.full_name : "Blueditor"
    const router = useRouter()
    const deleteComment = async () => {
        if (username === "Blueditor" || currentUsername === username) {
            try {
                await supabase
                    .from('comments')
                    .delete()
                    .match({ 'comment_id': comment_id, });
            }
            catch (error) {
                console.log(error)
            } finally {
                router.reload()
            }
        }
    }
    return (
        <section className={`flex flex-col p-2 rounded ${editing ? 'bg-blue-50 dark:bg-grayblack-reddit' : ''}`}>
            <div className='flex items-center gap-2 text-sm'>
                {!displayingContent &&
                    <div className='cursor-pointer' onClick={() => setDisplayingContent(!displayingContent)}>
                        <ArrowsPointingOutIcon className='w5 h-5 text-blue-500 dark:text-blue-300' />
                    </div>}
                <img src={profileImage} alt="commenter" className="w-9 h-9 rounded-full object-cover cursor-pointer" />
                <span className='font-semibold'>{username}</span>
                <span className='text-gray-reddit'>•</span>
                <span className='text-gray-reddit'>{showTime(created_at)}</span>
            </div>
            {displayingContent &&
                <div className='flex'>
                    <div
                        className='flex justify-center pl-4 mt-2 pr-1 group cursor-pointer'
                        onClick={() => setDisplayingContent(false)}>
                        <div className='border border-gray-200 dark:border-gray-reddit group-hover:border-blue-500 dark:group-hover:border-white-reddit'></div>
                    </div>
                    {editing ? <CommentEditing comment_id={comment_id} comment={comment} setEditing={setEditting}/>
                        : <div className='ml-4 mt-1'>
                            <span className='p-2 text-lg'>{comment}</span>
                            <div className='flex items-center  w-full pt-2 pl-1 space-x-4'>
                                <div><CommentVote upvotes={upvotes} downvotes={downvotes} /></div>
                                <div className='flex items-center text-gray-reddit font-bold rounded hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit cursor-pointer'>
                                    <ChatBubbleLeftIcon className='w-6 h-6' />
                                    <span className='pl-1 text-xs'>Reply</span>
                                </div>
                                <div className='flex items-center text-gray-reddit font-bold rounded hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit cursor-pointer'>
                                    <span className='pl-1 text-xs'>Share</span>
                                </div>
                                <div className='text-gray-reddit rounded hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit cursor-pointer'
                                    onClick={() => setExpanding(isExpanding => !isExpanding)}
                                    ref={expandableRef}>
                                    <EllipsisHorizontalIcon className='w-6 h-6' />
                                    {expanding &&
                                        <div className='absolute border-2 border-gray-200 dark:border-gray-600 rounded bg-white-reddit dark:bg-black-reddit mt-1 '>
                                            <button className='flex w-full py-1 px-2 text-gray-reddit bg-blackwhite-reddit hover:bg-gray-200 dark:hover:bg-grayblack-reddit '
                                                onClick={deleteComment}
                                                style={{
                                                    cursor: username === "Blueditor" || currentUser === username ? "" : "not-allowed"
                                                }}>
                                                <TrashIcon className='w-6 h-6' />
                                                <span className='pl-2 font-semibold'>Delete</span>
                                            </button>
                                            <hr className='border-gray-200 dark:border-gray-600' />
                                            <button className='flex w-full py-1 px-2 text-gray-reddit hover:bg-gray-200 dark:hover:bg-grayblack-reddit '
                                                onClick={() => setEditting(true)}
                                                style={{
                                                    cursor: username === "Blueditor" || currentUser === username ? "" : "not-allowed"
                                                }}>
                                                <PencilIcon className='w-6 h-6' />
                                                <span className='pl-2 font-semibold'>Edit</span>
                                            </button>
                                        </div>}
                                </div>

                            </div>
                        </div>}
                </div>}
        </section >
    );
}

export default CommentItem