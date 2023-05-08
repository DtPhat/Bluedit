import {
    ChatBubbleLeftIcon,
    GiftIcon,
    ArrowUturnRightIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon,
    TrashIcon,
    PencilIcon
} from '@heroicons/react/24/outline'
import { supabase } from '../../client'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { RedditContext } from '../../context/RedditContext'
import useExpandableComponent from '../../hooks/useExpandableComponent'
function Actions({ postId, postAuthor }) {
    const [commentAmount, setCommentAmount] = useState(0)
    const { currentUser } = useContext(RedditContext)
    const { expandableRef, expanding, setExpanding, isOffScreen } = useExpandableComponent(false)
    useEffect(() => {
        countComment()
    }, []);
    const countComment = async () => {
        const { count, error } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .match({ post_id: postId })
        if (error) {
            console.log(error)
        }
        setCommentAmount(count)
    }
    const user = currentUser ? currentUser.user_metadata.full_name : "Blueditor"
    const expandActions = (e) => {
        e.preventDefault()
        setExpanding(isExpanding => !isExpanding)
    }
    const router = useRouter()
    const deletePost = async () => {
        if (postAuthor === "Blueditor" || user === postAuthor) {
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
    const editPost = async () => {
        if (postAuthor === "Blueditor" || user === postAuthor) {
            router.push({
                pathname: "/edit",
                query: { "id": postId }
            })
        }
    }
    const actionsElement = actions.map((item, i) => {
        return (
            <button
                key={i}
                className='flex items-center text-gray-reddit font-bold rounded hover:bg-gray-200 dark:hover:bg-grayblack-reddit p-1'
                onClick={(e) => { item.text !== 'Comment' && e.preventDefault() }}>
                <item.Icon className='w-6 h-6' />
                <span className='pl-1 text-xs'>
                    {item.text === 'Comment' ? `${commentAmount} Comment${commentAmount !== 1 ? 's' : ''}` : item.text}
                </span>
            </button>
        )
    })
    return (
        <div className='flex sm:space-x-5 items-center'>
            {actionsElement}
            <div className='rounded cursor-pointer px-1 z-10'
                onClick={expandActions}
                ref={expandableRef}>
                <EllipsisHorizontalIcon className='w-6 h-6 text-gray-reddit rounded hover:bg-gray-200 dark:hover:bg-grayblack-reddit' />
                {expanding &&
                    <div className={`absolute border-2 border-gray-200 dark:border-gray-600 rounded bg-white-reddit dark:bg-black-reddit ${isOffScreen ? 'mt-[-2rem]' : 'mt-1'} `}>
                        <button className='flex w-full py-1 px-2 text-gray-reddit hover:bg-gray-200 dark:hover:bg-grayblack-reddit '
                            onClick={editPost}
                            style={{
                                cursor: postAuthor === "Blueditor" || user === postAuthor ? "" : "not-allowed"
                            }}>
                            <PencilIcon className='w-6 h-6' />
                            <span className='pl-2 font-semibold'>Edit</span>
                        </button>
                        <hr className='border-gray-200 dark:border-gray-600' />
                        <button className='flex w-full py-1 px-2 text-gray-reddit bg-blackwhite-reddit hover:bg-gray-200 dark:hover:bg-grayblack-reddit '
                            onClick={deletePost}
                            style={{
                                cursor: postAuthor === "Blueditor" || user === postAuthor ? "" : "not-allowed"
                            }}>
                            <TrashIcon className='w-6 h-6' />
                            <span className='pl-2 font-semibold'>Delete</span>
                        </button>
                    </div>}
            </div>
        </div>
    );
}
const actions = [{
        Icon: ChatBubbleLeftIcon,
        text: 'Comment'
    }, {
        Icon: GiftIcon,
        text: 'Award'
    }, {
        Icon: ArrowUturnRightIcon,
        text: 'Share'
    }, {
        Icon: BookmarkIcon,
        text: 'Save'
    }]
export default Actions;