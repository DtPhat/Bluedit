import Vote from './Vote'
import Actions from './Actions'
import { supabase } from '../../client'
import { useState, useEffect } from 'react'
import Loading from '../loading';
import { useRouter } from 'next/router';
function Post({ id, title, author, content, type, upvotes, downvotes, inserted_at }) {
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        type == "image" && downloadImage(content)

    }, []);
    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('post-images').download(path)
            if (error) {
                throw error
            }
            setImage(URL.createObjectURL(data))
        } catch (error) {
            console.log('Error downloading image: ', error)
        } finally {
            setLoading(false)
        }
    }
    const router = useRouter()
    return (
        <div className='flex bg-white-reddit dark:bg-black-reddit w-full'>
            <div className='pt-2'>
                <Vote upvotes={upvotes} downvotes={downvotes} />
            </div>
            <div className='flex flex-col space-y-2 py-2 w-full '>
                <div className='flex text-xs space-x-1 items-center px-2'>
                    <img src="https://i.ibb.co/x7NbSGH/Blue-Creep.jpg" alt="small thumbnail"
                        className="object-cover w-[20px] h-[20px] rounded-full" />
                    <span
                        className='font-bold hover:border-b hover:border-b-black-reddit dark:hover:border-b-white-reddit cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault()
                            router.push('/')
                        }}>
                        r/Bluedit
                    </span>
                    <span className='text-gray-reddit px-1'> • </span>
                    <span className='text-gray-reddit'>
                        Posted by{' '}
                        <span
                            className='hover:border-b hover:border-b-black-reddit dark:hover:border-b-white-reddit cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault()
                                router.push(`/user/${author}`)
                            }}
                        >u/{author}
                        </span>
                    </span>
                    <span className='text-gray-reddit px-1'> • </span>
                    <span className='text-gray-reddit'>Posed {showTime(inserted_at)}</span>
                </div>
                <h1 className='text-lg font-medium px-2'>{title}</h1>

                <div>
                    {type == "text" &&
                        <p className='px-2 whitespace-pre-line'>{content}</p>
                    }
                    {type == "image" &&
                        <div className='flex items-center justify-center bg-graywhite-reddit dark:bg-grayblack-reddit min-h-[20rem]'>
                            {loading ?
                                <Loading /> :
                                <a href={image} target='_blank'>
                                    <img
                                        className='max-h-[32rem] pr-[1px]'
                                        src={image}
                                        alt="not-found"
                                    />
                                </a>
                            }
                        </div>
                    }
                    {type == "link" &&
                        <div>
                            <span onClick={(e) => { e.preventDefault(); window.open(content) }}
                                className='text-blue-400 hover:border-b hover:border-blue-400 px-2'>
                                {content}
                            </span>
                        </div>
                    }
                </div>

                <div className='pl-2'>
                    <Actions postId={id} postAuthor={author} />
                </div>
            </div>
        </div>
    );

}

export const showTime = (inserted_at) => {
    const today = new Date();
    const insertedDay = new Date(inserted_at)
    const timediff = today.getTime() - insertedDay.getTime();
    const daydiff = Math.round(timediff / (1000 * 3600 * 24))
    const hourdiff = Math.round(timediff / (1000 * 3600))
    const minutediff = Math.round(timediff / (1000 * 60))
    const seconddiff = Math.round(timediff / (1000))
    if (daydiff > 0) {
        return `${daydiff} day${daydiff === 1 ? '' : 's'} ago`
    } else if (hourdiff > 0) {
        return `${hourdiff} hour${hourdiff === 1 ? '' : 's'} ago`
    } else if (minutediff > 0) {
        return `${minutediff} minute${minutediff === 1 ? '' : 's'} ago`
    } else {
        return `${seconddiff} second${seconddiff === 1 ? '' : 's'} ago`
    }
}

export default Post;