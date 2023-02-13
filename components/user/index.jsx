function User({ email, name, profileImage, created_at }) {
    return (
        <div>
            <main className='flex justify-center w-full h-full pt-24 p-6 lg:px-0 '>
                <div className='px-16 max-w-5xl w-full border-2 rounded-xl bg-white-reddit dark:bg-black-reddit border-gray-reddit dark:border-grayblack-reddit pt-8 pb-16'>
                    <div className="text-3xl mb-10 pb-3 border-b-2 text-gray-600 dark:text-gray-400 border-gray-600 dark:border-gray-400">
                        <h1 className="font-semibold">{name}'s Profile</h1>
                        <h2 className="text-xl font-normal">u/{name}</h2>
                    </div>
                    <div className="w-full md:px-6 flex flex-wrap space-x-2 space-y-6 justify-between items-center">
                        <div className="flex w-full sm:w-auto justify-center">
                            <img src={profileImage} className="w-28 rounded-xl" alt="profile image" width={64} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p>
                                <h5 className="font-bold">Fullname:</h5>
                                <span>{name === 'Blueditor' ? 'None' : name}</span>
                            </p>
                            <p>
                                <h5 className="font-bold">Email:</h5>
                                <span>{name === 'Blueditor' ? 'None' : email}</span>
                            </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p>
                                <h5 className="font-bold">Cake day:</h5>
                                <p>🍰 {name === 'Blueditor' ? 'None' : created_at.slice(0, 10)}</p>
                            </p>
                            <p>
                                <h5 className="font-bold">Karma:</h5>
                                <p>💠 {name === 'Blueditor' ? '0' : '100'}</p>
                            </p>
                        </div>
                        <div className="flex space-y-0 sm:flex-col sm:space-y-4 pt-2 w-full sm:w-auto items-center">
                            <button className=" bg-blue-500 dark:bg-gray-200 border-blue-500 dark:border-gray-reddit text-white-reddit dark:text-black-reddit py-1 w-40 rounded-full font-semibold text-xl mr-2 sm:mr-0"
                                style={{ cursor: name === 'Blueditor' ? 'not-allowed' : 'pointer' }}
                            >Follow
                            </button>
                            <button className=" bg-blue-500 dark:bg-gray-200 border-blue-500 dark:border-gray-reddit text-white-reddit dark:text-black-reddit py-1 w-40 rounded-full font-semibold text-xl"
                                style={{ cursor: name === 'Blueditor' ? 'not-allowed' : 'pointer' }}
                            >Chat
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default User;