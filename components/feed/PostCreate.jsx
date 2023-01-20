import { PhotoIcon, LinkIcon, UserIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react';
import { RedditContext } from '../../context/RedditContext';
import Link from 'next/link';
function CreatePost() {
    const {currentUser} = useContext(RedditContext)
    return (
        <div className="border-2 border-grayblack-reddit px-3 py-1 flex items-center space-x-4 rounded bg-black-reddit cursor-pointer">
            <img src={currentUser?currentUser.user_metadata.avatar_url:"https://www.redditstatic.com/avatars/avatar_default_02_545452.png"} alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
                width={48}
            />
            <Link
                href='/new'
                className="border flex-1 p-2 rounded border-gray-600 text-gray-500 bg-grayblack-reddit cursor-text">
                Create Post
            </Link>

            <PhotoIcon className='w-6 h-6 text-gray-500' />
            <LinkIcon className='w-5 h-6 text-gray-500' />
        </div>
    );
}

export default CreatePost;