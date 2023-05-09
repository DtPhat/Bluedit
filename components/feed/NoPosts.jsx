function NoPosts({keyword}) {
    return (
        <div className='flex flex-col items-center justify-center space-y-4 p-6 max-w-4xl rounded border border-graywhite-reddit dark:border-grayblack-reddit bg-white-reddit dark:bg-black-reddit' >
            <img src="/telescope-snoo.png" alt="telescope snoo" className="w-36 h-36" />
            <span className="text-2xl w-[36rem] break-words text-center">Hm... we couldn’t find any results for "{keyword}"</span>
            <span className="text-gray-reddit">Double-check your spelling or try different keywords to adjust your search</span>
        </div>
    );
}
export default NoPosts;