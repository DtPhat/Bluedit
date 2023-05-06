import { useRouter } from "next/router";
import showTime from "../../utils/showTime";
function PostDetails({ author, inserted_at }) {
    const router = useRouter()
    return (
        <div className='flex text-xs space-x-1 items-center px-2 select-none'>
            <img src="https://i.ibb.co/x7NbSGH/Blue-Creep.jpg" alt="small thumbnail"
                className="object-cover w-[20px] h-[20px] rounded-full" />
            <span
                className='font-bold hover:border-b hover:border-b-black-reddit dark:hover:border-b-white-reddit cursor-pointer'
                onClick={(e) => {
                    e.preventDefault()
                    router.push('/')
                }}>
                r/Bluedit
            </span>
            <span className='text-gray-reddit px-[0.125rem]'>•</span>
            <span className='text-gray-reddit'>
                Posted by{' '}
                <span
                    className='hover:border-b hover:border-b-black-reddit dark:hover:border-b-white-reddit cursor-pointer'
                    onClick={(e) => {
                        e.preventDefault()
                        router.push(`/user/${author}`)
                    }}
                >u/{author}
                </span>
            </span>
            <span className='text-gray-reddit px-[0.125rem]'>•</span>
            <span className='text-gray-reddit'>Posed {showTime(inserted_at)}</span>
        </div>
    );
}
export default PostDetails;