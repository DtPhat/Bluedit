import {
    EllipsisHorizontalIcon,
    CalendarDaysIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
function About() {
    const router = useRouter()

    function createPost() {
        router.push('/new')
    }
    return (
        <div className="max-w-[20rem] flex flex-col p-3 border-2 border-grayblack-reddit rounded space-y-4 bg-black-reddit">
            <div className="flex justify-between text-gray-500 font-medium">
                <span>About Community</span>
                <EllipsisHorizontalIcon className='w-7 h-7' />
            </div>
            <div className='pt-2'>
                r/Bluedit is the place I created for cloning a subreddit with Nextjs, TaildwindCSS and Supabase.
            </div>
            <div className='flex items-center gap-x-2 border-b pb-4 border-gray-500'>
                <CalendarDaysIcon className='w-6 h-6' />
                <span className='text-gray-500 text-sm'>Created Dec 29, 2022</span>
            </div>
            <div className='flex font-medium border-b pb-4 border-gray-500 space-x-12'>
                <div className='flex flex-col'>
                    <span className='text-lg'>30.3m</span>
                    <span className='text-gray-500 text-xs'>Members</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-lg flex items-center'>
                        <span className='text-[0.5rem] pr-[0.125rem]'>🟢</span><span>50.5k</span>
                    </span>
                    <span className='text-gray-500 text-xs'>Online</span>
                </div>
            </div>

            <div className='flex justify-center border-b pb-4 border-gray-500'>
                <button className='w-full bg-white-reddit text-black-reddit rounded-full p-1 font-bold'
                    onClick={createPost}
                >Create Post</button>
            </div>
            <div className='flex items-center justify-between p-3'>
                <span className='text-xs font-bold'>COMMUNITY OPTIONS</span>
                <div className='pr-4'>
                    <ChevronDownIcon className='h-4 w-4' />
                </div>
            </div >
        </div>
    );
}

export default About;