import Vote from './Vote'
import Actions from './Actions'
import Link from 'next/link';
function Post({ id, title, author, content, upvotes, downvotes }) {
    return (
        <Link href={`/post/${id}`}>
            <div className='flex border border-gray-reddit rounded mb-4 px-1 mt-4 bg-black-reddit w-full hover:border-white-reddit'>
                <div className='pt-2'>
                    <Vote upvotes={upvotes} downvotes={downvotes} />
                </div>
                <div className='flex flex-col space-y-2 py-2 w-full'>
                    <span className='text-xs text-gray-reddit'>
                        Posted by u/{author} • 7 days ago
                    </span>
                    <h1 className='text-lg font-medium'>{title}</h1>
                    <p>{content}</p>
                    <div className='pt-2'>
                        <Actions />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Post;