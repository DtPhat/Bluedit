import { useContext } from 'react'
import { RedditContext } from '../../context/RedditContext';
function CommentForm() {
    const { currentUser } = useContext(RedditContext)
    return (
        <div>
            <span className='text-sm'>Comment as <span className='text-blue-400 cursor-pointer'>{currentUser?currentUser.user_metadata.full_name:"Blueditor"}</span></span>
            <div className='flex flex-col border border-graywhite-reddit dark:border-grayblack-reddit pb-4 relative rounded focus-within:border-black-reddit dark:focus-within:border-white-reddit '>
                <textarea
                    className='rounded bg-white-reddit dark:bg-black-reddit py-2 px-4 outline-none group-focus:bg-white'
                    rows={7}
                    cols={0}
                    placeholder='What are your thoughts?'

                />
                <div className=' absolute bottom-0 w-full flex justify-end p-2 bg-graywhite-reddit dark:bg-grayblack-reddit rounded-b'>
                    <button
                        className='bg-gray-reddit dark:bg-white-reddit text-gray-200 dark:text-gray-reddit px-4 rounded-full text-sm font-semibold'>
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommentForm;