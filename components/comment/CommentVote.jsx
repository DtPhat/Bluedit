import { UpvoteIcon } from '../../assets/UpvoteIcon'
import { DownvoteIcon } from '../../assets/DownvoteIcon'
import { useState } from 'react'
import { useRouter } from 'next/router'
function CommentVote({ upvotes, downvotes }) {
    const router = useRouter()
    const [downvoted, setDownvoted] = useState(false)
    const [upvoted, setUpvoted] = useState(false)
    const votes = (upvotes - downvotes) + upvoted - downvoted
    const upvote = (e) => {
        e.preventDefault()
        if (upvoted) {
            setUpvoted(false)
            return
        }
        setUpvoted(true)
        setDownvoted(false)
    }
    const downvote = (e) => {
        e.preventDefault()
        if (downvoted) {
            setDownvoted(false)
            return
        }
        setUpvoted(false)
        setDownvoted(true)
    }
    return (
        <div className={`flex w-full items-center rounded space-x-1`}>
            <div onClick={upvote}><UpvoteIcon active={upvoted} /></div>
            <div className='font-bold select-none flex justify-center items-center w-6'>
                {votes ? <span className='text-sm'>{votes}</span> : <span className='text-xs'>Vote</span>}
            </div>
            <div onClick={downvote}><DownvoteIcon active={downvoted} /></div>
        </div>
    );
}

export default CommentVote;