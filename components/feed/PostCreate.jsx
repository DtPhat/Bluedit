import { PhotoIcon, LinkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
function CreatePost() {
    return (
        <div className="border-2 border-grayblack-reddit px-3 py-1 flex items-center space-x-4 rounded bg-black-reddit cursor-pointer">
            <img src="https://i.ibb.co/BBkjSKb/Pixel-Phast.jpg" alt=""
                className="w-12 h-12 rounded-full object-cover"
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