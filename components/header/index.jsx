import {
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
import {
    HomeIcon,
} from '@heroicons/react/24/solid'
import { IconItem } from '../common/IconItem'
import { useTheme } from "next-themes";
import Settings from './Settings'
import Searching from './Searching'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, [])
    const { theme } = useTheme();
    return (
        <div className='fixed inset:0 z-50 w-full flex h-13 p-1 px-3 space-x-3 items-center bg-white-reddit dark:bg-black-reddit dark:text-white-reddit border-b dark:border-grayblack-reddit'>
            <Link href='/'>
                <div className='flex space-x-2 min-w-[2rem]'>
                    <img className='w-[2rem]' src='/reddit-icon.svg' width={33} height={33} alt='icon' />
                    {mounted && <img className='w-[4rem] hidden lg:block' src={theme === 'light' ? '/reddit-text-light.svg' : '/reddit-text-dark.svg'} width={64} height={64} alt='blueddit' />}
                </div>
            </Link>
            <div className='flex items-center w-18 xl:w-64 border border-transparent hover:border-gray-200 dark:hover:border-grayblack2-reddit rounded cursor-pointer'>
                <HomeIcon className='h-8 w-8 cursor-pointer rounded p-1 text-gray-700 dark:text-gray-300' />
                <span className='font-normal hidden xl:block'>Home</span>
                <div className='flex flex-1 justify-end pr-2'>
                    <ChevronDownIcon className='h-4 w-4' />
                </div>
            </div>
            <Searching />
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
            <Settings />
        </div >
    )
}