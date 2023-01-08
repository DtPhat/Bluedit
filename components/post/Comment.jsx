function Comment() {
    return (
            <div className='flex flex-col border-2 border-grayblack-reddit pb-4 relative rounded focus-within:border-white-reddit'>
                <textarea
                    className='rounded bg-black-reddit py-2 px-4 outline-none group-focus:bg-white'
                    rows={7}
                    cols={0}
                    placeholder='What are your thoughts?'

                />
                <div className=' absolute bottom-0 w-full flex justify-end p-2 bg-grayblack-reddit rounded-b'>
                    <button
                        className='bg-white-reddit text-gray-reddit px-4 rounded-full text-sm font-semibold'>
                        Comment
                    </button>
                </div>
            </div>
    );
}

export default Comment;