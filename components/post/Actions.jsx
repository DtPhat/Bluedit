import {
    ChatBubbleLeftIcon,
    GiftIcon,
    ArrowUturnRightIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon,
    TrashIcon
} from '@heroicons/react/24/outline'
import { supabase } from '../../client'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { RedditContext } from '../../context/RedditContext'
function Actions({ postId, postAuthor }) {
    const [expanding, setExpanding] = useState(false)
    const { currentUser } = useContext(RedditContext)
    const actionsElement = actions.map((item, i) => {
        return (
            <div className='flex items-center text-gray-reddit font-bold rounded cursor-pointer hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit p-1' key={i}>
                <item.icon className='w-6 h-6' />
                <span className='pl-1 text-xs'>{item.text}</span>
            </div>
        )
    })
    const expandAction = (e) => {
        e.preventDefault()
        setExpanding(prevState => !prevState)
    }
    const router = useRouter()
    const deletePost = async () => {
        if (!currentUser && postAuthor === "Blueditor" || currentUser === postAuthor) {
            try {
                await supabase
                    .from('feed')
                    .delete()
                    .match({ 'id': postId });
            }
            catch (error) {
                console.log(error)
            } finally {
                router.reload()
            }
        }
    }
    return (
        <div className='flex sm:space-x-5 items-center'>
            {actionsElement}
            <div className='rounded cursor-pointer px-1'
                onClick={expandAction}>
                <EllipsisHorizontalIcon className='w-6 h-6 text-gray-reddit hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit' />
                {expanding &&
                    <button className='flex absolute border-2 rounded mt-1 py-1 px-2 text-red-400 bg-blackwhite-reddit border-gray-200 dark:border-gray-600 bg-white-reddit dark:bg-black-reddit hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit'
                        onClick={deletePost}
                        style={{
                            cursor: !currentUser && postAuthor === "Blueditor" || currentUser === postAuthor ? "pointer" : "not-allowed"
                        }}>
                        <TrashIcon className='w-6 h-6' />
                        <span className='pl-2 font-bold'>Delete</span>
                    </button>}
            </div>
        </div>
    );
}
const actions = [
    {
        icon: ChatBubbleLeftIcon,
        text: 'Comment'
    },
    {
        icon: GiftIcon,
        text: 'Award'
    },
    {
        icon: ArrowUturnRightIcon,
        text: 'Share'
    },
    {
        icon: BookmarkIcon,
        text: 'Save'
    },
]

export default Actions;