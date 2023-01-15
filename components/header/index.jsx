import {
    HomeIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    ArrowUpCircleIcon,
    CurrencyDollarIcon,
    ChatBubbleBottomCenterTextIcon,
    RocketLaunchIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    BellIcon,
    PlusIcon,
    MegaphoneIcon,
} from '@heroicons/react/24/outline'
import { IconItem } from '../common/IconItem'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <div className='fixed inset:0 z-10 w-full flex h-13 p-1 px-3 space-x-3 items-center bg-black-reddit text-white-reddit border-b border-grayblack-reddit overflow-hidden'>
            <Link href='/'>
                <div className='flex space-x-2 min-w-[33px]'>
                    <Image src='/reddit-icon.svg' width={33} height={33} alt='blueddit-icon'/>
                    <Image className='hidden lg:block bg' src='/reddit-text.svg' width={62} height={62} alt='blueddit-text' />
                </div>
            </Link>
            <div className='flex items-center w-18 lg:w-64 border border-transparent hover:border-gray-reddit cursor-pointer'>
                <IconItem Icon={HomeIcon} />
                <span className='font-normal hidden lg:block'>Home</span>
                <div className='flex flex-1 justify-end pr-2'>
                    <ChevronDownIcon className='h-4 w-4' />
                </div>
            </div >
            <div className='flex flex-1 whitespace-nowrap min-w-[6rem] max-w-[56rem] items-center border border-gray-700 rounded-full p-1 space-x-2 bg-grayblack-reddit cursor-text'>
                <div>
                    <MagnifyingGlassIcon className='h-8 w-8 text-gray-400 pl-2' />
                </div>
                <span className='text-gray-500 text-sm overflow-hidden '>Search Reddit</span>
            </div>
            <div className='hidden md:flex space-x-3 border-r pr-2 border-gray-600'>
                <IconItem Icon={ArrowUpCircleIcon} />
                <IconItem Icon={CurrencyDollarIcon} />
                <IconItem Icon={ChatBubbleBottomCenterTextIcon} />
                <IconItem Icon={RocketLaunchIcon} />
            </div>
            <div className='flex space-x-3'>
                <IconItem Icon={ChatBubbleOvalLeftEllipsisIcon} />
                <IconItem Icon={BellIcon} />
                <Link href='/new'><IconItem Icon={PlusIcon} /></Link>
                <IconItem Icon={MegaphoneIcon} />
            </div>
            <div className='flex lg:min-w-[14rem] items-center font-medium border border-transparent hover:border-gray-reddit space-x-2 cursor-pointer'>
                <img
                    src='https://i.ibb.co/BBkjSKb/Pixel-Phast.jpg'
                    className='h-9 w-9 min-w-[36px] object-cover p-1 rounded-full'
                    alt='avatar' />
                <div className='text-xs hidden md:flex flex-col'>
                    <span>Dotipha</span>
                    <span>🌸10 karma</span>
                </div>
                <div className='flex md:flex-1 justify-end pr-2'>
                    <ChevronDownIcon className='h-4 w-4' />
                </div>
            </div >

        </div >
    )
}