import { PhotoIcon, LinkIcon, UserIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { RedditContext } from '../../context/RedditContext';
import Link from 'next/link';
function PostCreater() {
    const { currentUser } = useContext(RedditContext)
    return (
        <div className="border-2 border-graywhite-reddit dark:border-grayblack-reddit px-3 py-1 flex items-center space-x-4 rounded bg-white-reddit dark:bg-black-reddit">
            <img src={currentUser ? currentUser.user_metadata.avatar_url : "https://www.redditstatic.com/avatars/avatar_default_02_545452.png"} alt="avatar"
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                width={48}
            />
            <Link
                href={{
                    pathname: '/new'
                }}
                className="border-2 flex-1 p-2 rounded border-gray-200 dark:border-grayblack2-reddit text-gray-reddit bg-graywhite-reddit dark:bg-grayblack-reddit cursor-text">
                Create Post
            </Link>
            <Link href={{
                pathname: '/new',
                query: { type: "image" }
            }}>
                <PhotoIcon className='w-8 h-8 p-1 text-gray-reddit cursor-pointer hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit rounded' />
            </Link>
            <Link href={{
                pathname: '/new',
                query: { type: "link" }
            }}>
                <LinkIcon className='w-7 h-8 p-1 text-gray-reddit cursor-pointer hover:bg-graywhite-reddit dark:hover:bg-grayblack-reddit rounded' />
            </Link>
        </div>
    );
}

export default PostCreater;