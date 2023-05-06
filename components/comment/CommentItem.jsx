import showTime from '../../utils/showTime'
import CommentVote from './CommentVote'
import {
    ChatBubbleLeftIcon,
    EllipsisHorizontalIcon,
    ArrowsPointingOutIcon,
    TrashIcon,
    PencilIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
function CommentItem({ item }) {
    const [expanding, setExpanding] = useState(true)
    const { comment_id, created_at, post_id, username, comment, downvotes, upvotes, users: { profileImage } } = item
    return (
        <div className='flex flex-col'>
            <div className='flex items-center gap-2 text-sm'>
                {!expanding &&
                    <div className='cursor-pointer' onClick={() => setExpanding(!expanding)}>
                        <ArrowsPointingOutIcon className='w5 h-5 text-blue-500 dark:text-blue-300' />
                    </div>}
                <img src={profileImage} alt="commenter" className="w-9 h-9 rounded-full object-cover cursor-pointer" />
                <span>{username}</span>
                <span className='text-gray-reddit'>•</span>
                <span className='text-gray-reddit'>{showTime(created_at)}</span>
            </div>
            {expanding && <div className='flex'>
                <div
                    className='flex justify-center pl-4 mt-2 pr-1 group cursor-pointer'
                    onClick={() => setExpanding(false)}>
                    <div className='border border-gray-reddit group-hover:border-white-reddit'></div>
                </div>
                <div className='ml-4 mt-1'>
                    <span className='p-2'>{comment}</span>
                    <div className='flex items-center w-full pt-2 pl-1 space-x-2'>
                        <div><CommentVote upvotes={upvotes} downvotes={downvotes} /></div>
                        <div className='flex items-center text-gray-reddit font-bold rounded hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit p-1 cursor-pointer'>
                            <ChatBubbleLeftIcon className='w-6 h-6' />
                            <span className='pl-1 text-xs'>Reply</span>
                        </div>
                        <div className='flex items-center text-gray-reddit font-bold rounded hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit p-1 cursor-pointer'>
                            <span className='pl-1 text-xs'>Share</span>
                        </div>
                        <div className='flex items-center text-gray-reddit font-bold rounded hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit px-1 cursor-pointer'>
                            <EllipsisHorizontalIcon className='w-6 h-6' />
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default CommentItem