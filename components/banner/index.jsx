import {
    BellIcon,
} from '@heroicons/react/24/solid'
function Banner() {
    return (
        <div className="flex flex-col items-center bg-black-reddit overflow-hidden">
            <div className='w-[1920px] overflow-hidden'>
                <img src="https://i.ibb.co/hBhJ026/Tumblr.jpg" alt="Banner"
                    className="object-cover w-full h-[180px]" />
            </div>
            <div className="max-w-5xl w-full flex flex-col space-y-1 px-6 lg:px-0">
                <div className='flex items-center space-x-2'>
                    <div className="relative top-[-1.5rem]">
                        <img src="https://i.ibb.co/x7NbSGH/Blue-Creep.jpg" alt="thumbnail"
                            className="object-cover w-[82px] h-[82px] rounded-full border-4 border-white" />
                    </div>
                    <div className="flex flex-col p-2">
                        <h1 className="text-3xl font-bold">Bluedit</h1>
                        <span className="text-gray-500">r/Bluedit</span>
                    </div>
                    <div
                        className="w-24 after:content-['Joined'] hover:after:content-['Leave'] font-medium text-center border rounded-full py-1 mb-5 cursor-pointer">
                    </div>
                    <BellIcon className='w-8 h-8 border rounded-full p-1 mb-5 cursor-pointer' />
                </div>
                <div className='space-x-4'>
                    <button className='border-b-4 px-2'>Posts</button>
                    <button className='text-gray-500'>Rules</button>
                    <button className='text-gray-500'>Discord Server</button>
                </div>
            </div>
        </div>
    );
}

export default Banner;