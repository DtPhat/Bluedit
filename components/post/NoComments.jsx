import {ChatBubbleLeftRightIcon} from '@heroicons/react/24/solid'
function NoComments() {
    return (
        <div className='h-80 flex flex-col justify-center items-center space-y-4 text-gray-reddit font-semibold mr-[2.5rem]'>
            <ChatBubbleLeftRightIcon className='w-7 h-7'/>
            <h1 className='text-lg'>No Comments Yet</h1>
            <p>Be the first to share what you think!</p>
        </div>
    );
}

export default NoComments;