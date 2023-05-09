import { UpvoteIcon } from '../../assets/UpvoteIcon'
import { DownvoteIcon } from '../../assets/DownvoteIcon'
import { useState } from 'react'
import { useRouter } from 'next/router'
function Vote({ upvotes, downvotes }) {
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
        <div className={`flex flex-col w-10 items-center pt-2 rounded ${router.pathname === '/' ? 'bg-graywhite2-reddit dark:bg-black2-reddit' : ''}`}>
            <div onClick={upvote}>
                <UpvoteIcon active={upvoted} />
            </div>
            <div className='font-bold select-none'>{votes ? <span className='text-sm'>{votes}</span> : <span className='text-xs'>Vote</span>}</div>
            <div onClick={downvote}>
                <DownvoteIcon active={downvoted} />
            </div>
        </div>
    );
}

export default Vote;