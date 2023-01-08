import {
    FireIcon,
    GlobeAltIcon,
    ArrowUpOnSquareIcon,
    EllipsisHorizontalIcon,
    Bars4Icon,
    ChevronDownIcon
} from '@heroicons/react/24/solid'
function PostFilter() {
    return (
        <div className="border-2 border-grayblack-reddit font-semibold p-3 flex items-center space-x-4 rounded bg-black-reddit">
            <div className='flex space-x-1 bg-grayblack-reddit rounded-3xl p-1'>
                <FireIcon className='w-6 h-6' />
                <span className='pr-2'>Hot</span>
            </div>
            <div className='flex space-x-1 rounded-3xl p-1'>
                <GlobeAltIcon className='w-6 h-6 text-gray-500' />
                <span className='text-gray-500'>New</span>
            </div>
            <div className='flex space-x-1 rounded-3xl p-1'>
                <ArrowUpOnSquareIcon className='w-5 h-6 text-gray-500' />
                <span className='text-gray-500'>Top</span>
            </div>
            <EllipsisHorizontalIcon className='w-6 h-6 text-gray-500' />
            <div className='flex flex-1 justify-end items-center'>
                <Bars4Icon className='w-6 h-6 text-gray-500'/>
                <ChevronDownIcon className='w-5 h-5 text-gray-500'/>
            </div>
        </div>
    );
}

export default PostFilter;