import {
    ChatBubbleLeftIcon,
    GiftIcon,
    ArrowUturnRightIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'
function Actions() {
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
    const actionsElement = actions.map(item => {
        return (
            <div className='flex items-center text-gray-reddit font-bold rounded cursor-pointer hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit p-1'>
                <item.icon className='w-6 h-6' />
                <span className='pl-1 text-xs'>{item.text}</span>
            </div>
        )
    })
    return (
        <div className='flex sm:space-x-5 items-center'>
            {actionsElement}
            <div className='rounded cursor-pointer hover:bg-graywhite-reddit darkhover:bg-grayblack-reddit px-1'>
                <EllipsisHorizontalIcon className='w-6 h-6 text-gray-reddit' />
            </div>
        </div>
    );
}

export default Actions;