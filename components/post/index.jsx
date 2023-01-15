import Vote from './Vote'
import Actions from './Actions'
import { supabase } from '../../client'
import { useState, useEffect } from 'react'
import Loading from '../loading';
function Post({ id, title, author, content, type, upvotes, downvotes, inserted_at}) {
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
                    <span
                        className='text-white-reddit font-bold hover:border-b'
                        onClick={(e)=>e.preventDefault()}>
                        r/Bluedit
                    </span>
                    <span className='text-gray-reddit'>
                        • Posted by u/{author} {showTime(inserted_at)}
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

export const showTime = (inserted_at) => {
    const today = new Date();
    const insertedDay = new Date(inserted_at)
    const timediff = today.getTime() - insertedDay.getTime();
    const daydiff = Math.round(timediff/(1000 * 3600 * 24))
    const hourdiff = Math.round(timediff/(1000 * 3600))
    const minutediff = Math.round(timediff/(1000*60))
    const seconddiff = Math.round(timediff/(1000))
    if(daydiff > 0){
        return `Posted ${daydiff} day${daydiff===1?'':'s'} ago`
    } else if(hourdiff > 0){
        return `Posted ${hourdiff} hour${hourdiff===1?'':'s'} ago`
    } else if(minutediff > 0){
        return `Posted ${minutediff} minute${minutediff===1?'':'s'} ago`
    } else{
        return `Posted ${seconddiff} second${seconddiff===1?'':'s'} ago`
    }
}

export default Post;