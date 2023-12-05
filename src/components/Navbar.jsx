// import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, HeartIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { useNewsContext } from '../context/newsContext';

export default function Navbar() {

    const { isAuthenticated, userName, handleLogOut } = useAuth();
    const { toggleNewsView } = useNewsContext();


    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <Link to={'/'} className='text-white font-semibold cursor-pointer'>
                                        News App
                                    </Link>
                                    
                                    <div className='flex items-center'>
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {isAuthenticated ? <Link
                                                to={'/favorites'}
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <HeartIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                                            </Link> : ''}
                                        </div>
                                        {isAuthenticated ? 
                                            <p className='hidden sm:block ml-2 text-white'>{userName}</p>
                                            :
                                            <Link to={'/login'} className='hidden sm:block ml-2 text-white cursor-pointer'>Sign In</Link>
                                        }
                                        {isAuthenticated ? 
                                            <p className='hidden sm:block ml-2 text-white cursor-pointer' onClick={handleLogOut}>Sign Out</p> : ''
                                        }
                                        <div className="-mr-2 flex sm:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Open main menu</span>
                                                {open ? (
                                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                                ) : (
                                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="mt-3 space-y-1 px-2">
                                        {isAuthenticated ? 
                                            <p className='rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>{userName}</p>
                                            :
                                            <Link to={'/login'} className='rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer'>Sign In</Link>
                                        }
                                        {isAuthenticated ? <p className='rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer' onClick={handleLogOut}>Sign Out</p> : ''}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <header className="bg-white shadow">
                    <div className="mx-auto flex justify-between items-center max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Latest News</h1>
                        <button 
                            className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                            onClick={() => toggleNewsView()}
                        >
                            <span className="sr-only">View grid</span>
                            <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </header>
            </div>
        </>
    )
}
