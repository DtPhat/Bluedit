import Vote from './Vote'
import Actions from './Actions'
import { supabase } from '../../client'
import { useState, useEffect } from 'react'
import Loading from '../loading';
function Post({ id, title, author, content, type, upvotes, downvotes }) {
    const [image, setImage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
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
            setIsLoading(false)
        }
    }
    return (
        <div className='flex bg-black-reddit'>
            <div className='pt-2'>
                <Vote upvotes={upvotes} downvotes={downvotes} />
            </div>
            <div className='flex flex-col space-y-2 p-2 w-full'>
                <div className='flex text-xs space-x-1 items-center'>
                    <img src="https://i.ibb.co/x7NbSGH/Blue-Creep.jpg" alt="small thumbnail"
                        className="object-cover w-[20px] h-[20px] rounded-full" />
                    <span className='text-white-reddit font-bold hover:border-b'>r/Bluedit</span>
                    <span className='text-gray-reddit'>
                        • Posted by u/{author} 7 days ago
                    </span>
                </div>
                <h1 className='text-lg font-medium'>{title}</h1>
                {type == "text" &&
                    <p>{content}</p>
                }
                {type == "image" &&
                    <div className='flex items-center justify-center bg-grayblack-reddit min-h-[20rem]'>
                        {isLoading ?
                            <Loading /> :
                            <img
                                className='max-h-[32rem] pr-[1px]'
                                src={image}
                                alt="not-found" />
                        }
                    </div>
                }
                {type == "link" &&
                    <div>
                        <span onClick={(e) => { e.preventDefault(); window.open(content) }}
                            className='text-blue-400 hover:border-b hover:border-blue-400'>
                            {content}
                        </span>
                    </div>
                }
                <div className='pt-2'>
                    <Actions />
                </div>
            </div>
        </div>
    );

}

export default Post;