import { PhotoIcon, LinkIcon, UserIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { RedditContext } from '../../context/RedditContext';
import Link from 'next/link';
function CreatePost() {
    const {currentUser} = useContext(RedditContext)
    return (
        <div className="border-2 border-graywhite-reddit dark:border-grayblack-reddit px-3 py-1 flex items-center space-x-4 rounded bg-white-reddit dark:bg-black-reddit cursor-pointer">
            <img src={currentUser?currentUser.user_metadata.avatar_url:"https://www.redditstatic.com/avatars/avatar_default_02_545452.png"} alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
                width={48}
            />
            <Link
                href='/new'
                className="border-2 flex-1 p-2 rounded border-gray-200 dark:border-grayblack2-reddit text-gray-reddit bg-graywhite-reddit dark:bg-grayblack-reddit cursor-text">
                Create Post
            </Link>

            <PhotoIcon className='w-6 h-6 text-gray-500' />
            <LinkIcon className='w-5 h-6 text-gray-500' />
        </div>
    );
}

export default CreatePost;