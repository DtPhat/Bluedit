import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
function Searching() {
    const [keyword, setKeyword] = useState('')
    const router = useRouter()
    const search = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            router.push({
                pathname: '/',
                query: keyword ? { keyword: keyword } : null
            })
            setKeyword('')
        }
    }
    return (
        <div className='flex flex-1 whitespace-nowrap min-w-[6rem] max-w-[56rem] items-center border border-gray-200 dark:border-grayblack2-reddit rounded-full p-1 space-x-2 bg-graywhite-reddit dark:bg-grayblack-reddit cursor-text'>
            <div><MagnifyingGlassIcon className='h-8 w-8 text-gray-400 pl-2' /></div>
            <input type="text" className='focus:outline-none bg-inherit w-full py-1 pr-2 text-sm' placeholder='Search Bluedit'
                value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={search} />
            {keyword &&
                <button className='pr-2' onClick={() => setKeyword('')}>
                    <XCircleIcon className='w-6 h-6' />
                </button>}
        </div>
    );
}

export default Searching
