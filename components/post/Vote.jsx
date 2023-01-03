import { UpvoteIcon } from './UpvoteIcon'
import { DownvoteIcon } from './DownvoteIcon'
import { useState } from 'react'
function Vote({ upvotes, downvotes }) {
    const [downvoted, setDownvoted] = useState(false)
    const [upvoted, setUpvoted] = useState(false)
    let votes = upvotes - downvotes
    if (downvoted) votes--
    if (upvoted) votes++
    const upvoteHandler = (e) => {
        e.preventDefault()
        if (upvoted) {
            setUpvoted(false)
            return
        }
        setUpvoted(true)
        setDownvoted(false)
    }
    const downvoteHandler = (e) => {
        e.preventDefault()
        if (downvoted) {
            setDownvoted(false)
            return
        }
        setUpvoted(false)
        setDownvoted(true)
    }
    return (
        <div className='flex flex-col w-10 items-center'>
            <div onClick={upvoteHandler}>
                <UpvoteIcon style={`${upvoted ? 'text-orange-600' : ''}`} />
            </div>
            <span className='font-bold text-sm'>{votes}</span>
            <div onClick={downvoteHandler}>
                <DownvoteIcon style={`${downvoted ? 'text-blue-600' : ''}`} />
            </div>
        </div>
    );
}

export default Vote;