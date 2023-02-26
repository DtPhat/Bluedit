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
import { useContext } from 'react'
import { RedditContext } from '../../context/RedditContext'
import useExpandableComponent from '../../hooks/useExpandableComponent'
function Actions({ postId, postAuthor }) {
    const { currentUser } = useContext(RedditContext)
    const user = currentUser ? currentUser.user_metadata.full_name : "Blueditor"
    const actionsElement = actions.map((item, i) => {
        return (
            <button
                className='flex items-center text-gray-reddit font-bold rounded hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit p-1'
                key={i}
                onClick={(e) => e.preventDefault()}>
                <item.icon className='w-6 h-6' />
                <span className='pl-1 text-xs'>{item.text}</span>
            </button>
        )
    })
    const { expandableRef, expanding, setExpanding } = useExpandableComponent(false)
    const expandAction = (e) => {
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
    return (
        <div className='flex sm:space-x-5 items-center'>
            {actionsElement}
            <div className='rounded cursor-pointer px-1 z-10'
                onClick={expandAction}
                ref={expandableRef}>
                <EllipsisHorizontalIcon className='w-6 h-6 text-gray-reddit rounded hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit' />
                {expanding &&
                    <div className='absolute border-2 border-gray-200 dark:border-gray-600 rounded bg-white-reddit dark:bg-black-reddit mt-1 '>
                        <button className='flex w-full py-1 px-2 text-gray-reddit hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit '
                            onClick={editPost}
                            style={{
                                cursor: postAuthor === "Blueditor" || user === postAuthor ? "" : "not-allowed"
                            }}>
                            <PencilIcon className='w-6 h-6' />
                            <span className='pl-2 font-semibold'>Edit</span>
                        </button>
                        <hr className='border-gray-200 dark:border-gray-600' />
                        <button className='flex w-full py-1 px-2 text-gray-reddit bg-blackwhite-reddit hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit '
                            onClick={deletePost}
                            style={{
                                cursor: postAuthor === "Blueditor" || user === postAuthor ? "" : "not-allowed"
                            }}>
                            <TrashIcon className='w-6 h-6' />
                            <span className='pl-2 font-semibold'>Delete</span>
                        </button>
                    </div>
                }
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