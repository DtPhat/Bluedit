import {
    ChatBubbleLeftIcon,
    GiftIcon,
    ArrowUturnRightIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'
function Actions() {
    return (
        <div className='flex space-x-5 items-center'>
            <div className='flex items-center text-gray-reddit font-bold'>
                <ChatBubbleLeftIcon className='w-6 h-6' />
                <span className='pl-1 text-xs'>0 Comment</span>
            </div>
            <div className='flex items-center text-gray-reddit font-bold'>
                <GiftIcon className='w-6 h-6' />
                <span className='pl-1 text-xs'>Award</span>
            </div>
            <div className='flex items-center text-gray-reddit font-bold'>
                <ArrowUturnRightIcon className='w-6 h-6' />
                <span className='pl-1 text-xs'>Share</span>
            </div>
            <div className='flex items-center text-gray-reddit font-bold'>
                <BookmarkIcon className='w-6 h-6 mt-1' />
                <span className='pl-1 text-xs'>Save</span>
            </div>
            <EllipsisHorizontalIcon className='w-6 h-6 text-gray-reddit'/>
        </div>
    );
}

export default Actions;