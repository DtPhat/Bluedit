import {
    FireIcon,
    GlobeAltIcon,
    ArrowUpOnSquareIcon,
    EllipsisHorizontalIcon,
    Bars4Icon,
    ChevronDownIcon
} from '@heroicons/react/24/solid'
function PostFilter({postFilter, setPostFilter}) {
    const activeClassName = 'bg-graywhite-reddit dark:bg-grayblack-reddit text-blue-500 dark:text-white-reddit'
    const hoverClassName = 'hover:bg-gray-100 hover:dark:bg-grayblack-reddit'
    return (
        <div className="border border-white-reddit dark:border-grayblack-reddit font-semibold p-3 flex items-center space-x-4 rounded bg-white-reddit dark:bg-black-reddit text-gray-reddit">
            <div className={`flex space-x-1 rounded-3xl p-1 cursor-pointer ${postFilter==='hot'&&activeClassName} ${hoverClassName}`}
            onClick={()=>setPostFilter('hot')}>
                <FireIcon className='w-6 h-6' />
                <span className='pr-2'>Hot</span>
            </div>
            <div className={`flex space-x-1 rounded-3xl p-1 cursor-pointer ${postFilter==='new'&&activeClassName} ${hoverClassName}`}
            onClick={()=>setPostFilter('new')}>
                <GlobeAltIcon className='w-6 h-6' />
                <span className='pr-2'>New</span>
            </div>
            <div className={`flex space-x-1 rounded-3xl p-1 cursor-pointer ${postFilter==='top'&&activeClassName} ${hoverClassName}`}
            onClick={()=>setPostFilter('top')}>
                <ArrowUpOnSquareIcon className='w-6 h-6' />
                <span className='pr-2'>Top</span>
            </div>
            <EllipsisHorizontalIcon className='w-6 h-6' />
            <div className='flex flex-1 justify-end items-center cursor-pointer'>
                <Bars4Icon className='w-6 h-6'/>
                <ChevronDownIcon className='w-5 h-5'/>
            </div>
        </div>
    );
}

export default PostFilter;