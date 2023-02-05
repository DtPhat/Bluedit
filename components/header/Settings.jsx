import { Fragment, useContext, useEffect, useState } from 'react'
import { Menu, Transition, Switch } from '@headlessui/react'
import { ChevronDownIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import { RedditContext } from '../../context/RedditContext'
import { useTheme } from "next-themes";
import Link from 'next/link'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Settings() {
  const { currentUser } = useContext(RedditContext)
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter()
  useEffect(() => {
    setMounted(true);
  }, [])
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [enabled, setEnabled] = useState(currentTheme === 'dark')
  setTheme(enabled?'dark':'light')
  const moveToLogin = () => {
    router.push('/login')
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <div className='flex rounded lg:min-w-[14rem] items-center font-medium border-2 border-transparent hover:border-2 hover:border-graywhite-reddit dark:hover:border-grayblack-reddit space-x-2 cursor-pointer'>
            <img
              src={currentUser ? currentUser.user_metadata.avatar_url : "https://www.redditstatic.com/avatars/avatar_default_02_545452.png"}
              className='h-9 w-9 min-w-[36px] object-cover p-1 rounded-full'
              alt='avatar'
              width={36} />
            <div className='text-xs hidden md:flex flex-col items-start whitespace-nowrap'>
              <span>{currentUser ? currentUser.user_metadata.full_name : "Blueditor"}</span>
              <span>💠{currentUser ? "100" : "0"} karma</span>
            </div>
            <div className='flex md:flex-1 justify-end pr-2 '>
              <ChevronDownIcon className='h-5 w-5' />
            </div>
          </div >
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded text-black-reddit dark:text-white-reddit bg-white-reddit dark:bg-black-reddit border-2 border-gray-400 dark:border-gray-600">
          <div className="">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-200 dark:bg-grayblack-reddit' : '',
                    'flex items-center justify-between px-8 py-2 text-sm border-b border-b-gray-300 dark:border-gray-600'
                  )}
                >

                  <span>Dark Mode</span>
                  {mounted &&
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={`${enabled ? 'bg-blue-500' : 'bg-gray-reddit'
                        } relative inline-flex h-5 w-9 items-center rounded-full`}
                    >
                      <span className="sr-only">Enable notifications</span>
                      <span
                        className={`${enabled ? 'translate-x-4' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  }
                </a>

              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/user/${currentUser ? currentUser.user_metadata.full_name: 'Bluediter'}`}
                  className={classNames(
                    active ? 'bg-gray-200 dark:bg-grayblack-reddit' : '',
                    'block px-8 py-2 text-sm'
                  )}
                >
                  User Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={moveToLogin}
                  className={classNames(
                    active ? 'bg-gray-200 dark:bg-grayblack-reddit' : '',
                    'flex w-full px-8 py-2 space-x-2 text-sm'
                  )}
                >
                  {currentUser ?
                    <ArrowRightOnRectangleIcon className='h-5 w-5' /> :
                    <ArrowLeftOnRectangleIcon className='h-5 w-5' />
                  }
                  <span>{currentUser ? 'Log out' : 'Log in'}</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export const usernameFilter = (name) => {
  const firstSpace = name.search(' ')
  const secondSpace = name.slice(firstSpace + 1).search(' ')
  const displayName = name.slice(0, firstSpace + secondSpace + 1)
  return displayName
}