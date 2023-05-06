import Vote from './Vote'
import Actions from './Actions'
import PostDetails from './PostDetails'
import { supabase } from '../../client'
import { useState, useEffect } from 'react'
import Loading from '../loading';
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
    return (
        <div className='flex w-full bg-white-reddit dark:bg-black-reddit rounded'>
            <Vote upvotes={upvotes} downvotes={downvotes} />
            <div className='flex flex-col space-y-2 py-2 w-full '>
                <PostDetails author={author} inserted_at={inserted_at} />

                <h1 className='text-lg font-medium px-2'>{title}</h1>
                <div>
                    {type == "text" &&
                        <p className='px-2 whitespace-pre-line'>{content}</p>
                    }
                    {type == "image" &&
                        <div className='flex items-center justify-center bg-white-reddit dark:bg-grayblack-reddit min-h-[20rem]'>
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
                                className='text-blue-600 dark:text-blue-400 hover:border-b hover:border-blue-400 ml-2 cursor-pointer'>
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
export default Post;