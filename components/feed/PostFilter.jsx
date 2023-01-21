import {
    FireIcon,
    GlobeAltIcon,
    ArrowUpOnSquareIcon,
    EllipsisHorizontalIcon,
    Bars4Icon,
    ChevronDownIcon
} from '@heroicons/react/24/solid'
import {useState} from 'react'
function PostFilter() {
    const [active, setActive] = useState([true, false, false])
    const activeClassName = 'bg-graywhite-reddit dark:bg-grayblack-reddit text-blue-500 dark:text-white-reddit'
    return (
        <div className="border-2 border-white-reddit dark:border-grayblack-reddit font-semibold p-3 flex items-center space-x-4 rounded bg-white-reddit dark:bg-black-reddit text-gray-reddit">
            <div className={`flex space-x-1 rounded-3xl p-1 cursor-pointer ${active[0]&&activeClassName}`}
            onClick={()=>setActive([true, false, false])}>
                <FireIcon className='w-6 h-6' />
                <span className='pr-2'>Hot</span>
            </div>
            <div className={`flex space-x-1 rounded-3xl p-1 cursor-pointer ${active[1]&&activeClassName}`}
            onClick={()=>setActive([false, true, false])}>
                <GlobeAltIcon className='w-6 h-6' />
                <span className='pr-2'>New</span>
            </div>
            <div className={`flex space-x-1 rounded-3xl p-1 cursor-pointer ${active[2]&&activeClassName}`}
            onClick={()=>setActive([false, false, true])}>
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