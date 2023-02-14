function Rules() {
    return (
        <div className="max-w-[20rem] flex flex-col p-3 border-2 border-graywhite-reddit dark:border-grayblack-reddit rounded space-y-4 bg-white-reddit dark:bg-black-reddit">
            <div className="flex justify-between text-gray-reddit font-medium pb-2">
                <span>r/Bluedit Rules</span>
            </div>
            <ol className='space-y-2 px-4'>
                <li className='list-decimal'>
                    <div className='flex border-b pb-2 border-gray-reddit flex-col'>
                        <h1 className="font-medium">Rule 1 - Respect People</h1>
                        <span>Be respectful to others, including no hostility, racism, sexism, bigotry, etc.</span>
                    </div>
                </li>
                <li className='list-decimal'>
                    <div className='flex border-b pb-2 border-gray-reddit flex-col'>
                        <h5 className="font-medium">Rule 2 - Restricted Images</h5>
                        <span>No memes, reaction gifs or similarly low effort content.</span>
                    </div>
                </li>
                <li className='list-decimal'>
                    <div className='flex border-b pb-2 border-gray-reddit flex-col'>
                        <h5 className="font-medium">Rule 3 - Original Sources</h5>
                        <span>Support original sources - avoid blogs/websites that are primarily rehosted content.</span>
                    </div>
                </li>
                <li className='list-decimal'>
                    <div className='flex border-b pb-2 border-gray-reddit flex-col'>
                        <h5 className="font-medium">Rule 4 - Title Quality</h5>
                        <span>Titles should accurately and truthfully represent the content of the submission.</span>
                    </div>
                </li>
                <li className='list-decimal'>
                    <div className='flex border-gray-reddit flex-col'>
                        <h5 className="font-medium">Rule 5- No Duplicates</h5>
                        <span>Avoid posting content that is a duplicate of content posted within the last 7 days.</span>
                    </div>
                </li>
            </ol>


        </div>
    );
}

export default Rules;