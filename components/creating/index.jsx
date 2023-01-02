import { supabase } from '../../client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
export default function NewPost() {
    const router = useRouter()
    const [newPost, setNewtPost] = useState({ title: "", author: "Tienphat", content: "" })
    const { title, author, content } = newPost

    async function createPost() {
        if (content === "") return
        await supabase
            .from('feed')
            .insert([
                { title, author, content }
            ])
            .single()
        setNewtPost({ title: "", author: "Tienphat", content: "" })
        router.push('/')
    }
    return (
        <div className='flex justify-center'>
            <div className='max-w-5xl w-full space-y-4'>
                <h1 className='pb-3 border-b border-grayblack-reddit text-lg font-medium'>Create a post</h1>
                <div className='flex w-80 border-2 border-grayblack-reddit p-1 space-x-2 items-center mb-3 rounded bg-black-reddit'>
                    <img src='https://i.ibb.co/x7NbSGH/Blue-Creep.jpg"'
                        width={30}
                        height={30}
                        className='rounded-full' />
                    <span className='text-sm font-medium'>r/Dotipha</span>
                    <div className='flex flex-1 justify-end'>
                        <ChevronDownIcon className='w-5 h-5' />
                    </div>
                </div>
                <div className='flex flex-col p-3 gap-y-3 rounded bg-black-reddit relative'>
                    <div className=' flex items-center'>
                        <input
                            className='w-full border-2 border-grayblack-reddit p-2 rounded bg-black-reddit'
                            name='title'
                            type="text"
                            placeholder='Title'
                            onChange={e => setNewtPost({ ...newPost, title: e.target.value })}
                        />
                        <span className='text-xs text-gray-500 absolute right-5'>{title.length}/300</span>
                    </div>
                    <div className='border-b border-grayblack-reddit pb-4'>
                        <textarea
                            className='w-full border-2 border-grayblack-reddit p-2 rounded bg-black-reddit'
                            rows={8}
                            cols={10}
                            placeholder='Text (required)'
                            onChange={e => setNewtPost({ ...newPost, content: e.target.value })}
                        />
                    </div>
                    <div className='flex justify-end space-x-2 p-2'>
                        <button
                            className='border border-gray-reddit text-gray-reddit py-1 px-5 rounded-full font-bold'
                        >Save Draft</button>
                        <button
                            className='bg-white-reddit text-black-reddit px-5 rounded-full font-bold'
                            onClick={createPost}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
