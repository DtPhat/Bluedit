import { supabase } from '../../client'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import { ChevronDownIcon, DocumentTextIcon, PhotoIcon, LinkIcon, Bars3CenterLeftIcon, MicrophoneIcon } from '@heroicons/react/24/solid'
export default function NewPost() {
    const router = useRouter()
    const [type, setType] = useState("text")
    const [newPost, setNewtPost] = useState({ title: "", author: "Bluediter", content: "" })
    const [imgUrl, setImgUrl] = useState("")
    const { title, author, content } = newPost
    const getFiles = useRef()
    async function createPost() {
        if (content === "") return
        await supabase
            .from('feed')
            .insert([
                { title, author, content, type }
            ])
            .single()
        router.push('/')
    }
    const handleImage = async (e) => {
        const file= e.target.files[0]
        setImgUrl(URL.createObjectURL(file))
        const filePath = file.name
        setNewtPost({ ...newPost, content: filePath})
        let { error: uploadError } = await supabase.storage
            .from('post-images')
            .upload(filePath, file, { upsert: true })
        if (uploadError) {
            throw uploadError
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='max-w-7xl w-full space-y-4'>
                <h1 className='pb-3 border-b border-grayblack-reddit text-xl font-medium'>Create a post</h1>
                <div className='flex w-80 border-2 border-grayblack-reddit p-1 space-x-2 items-center mb-3 rounded bg-black-reddit'>
                    <img 
                        src='https://i.ibb.co/x7NbSGH/Blue-Creep.jpg"'
                        width={30}
                        height={30}
                        className='rounded-full'
                        alt='User avatar'/>
                    <span className='text-sm font-medium'>r/Dotipha</span>
                    <div className='flex flex-1 justify-end'>
                        <ChevronDownIcon className='w-5 h-5' />
                    </div>
                </div>
                <div className='flex flex-col space-y-3 rounded bg-black-reddit relative'>
                    <div className='flex justify-between'>
                        <div
                            onClick={() => setType("text")}
                            className='cursor-pointer flex space-x-1 border-b border-r border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold'
                            style={{ color: type == "text" ? "#d7dadc" : "#758284", borderBottom: type == "text" ? "2px solid #d7dadc" : "1px solid #272729" }}>
                            <DocumentTextIcon className='w-6 h-6' />
                            <span className='select-none'>Post</span>
                        </div>
                        <div
                            onClick={() => setType("image")}
                            className='cursor-pointer flex space-x-1 border-b border-r border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold'
                            style={{ color: type == "image" ? "#d7dadc" : "#758284", borderBottom: type == "image" ? "2px solid #d7dadc" : "1px solid #272729" }}>
                            <PhotoIcon className='w-6 h-6' />
                            <span className='select-none'>Images</span>
                        </div>
                        <div
                            onClick={() => setType("link")}
                            className='cursor-pointer flex space-x-1 border-b border-r border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold'
                            style={{ color: type == "link" ? "#d7dadc" : "#758284", borderBottom: type == "link" ? "2px solid #d7dadc" : "1px solid #272729" }}>
                            <LinkIcon className='w-6 h-6' />
                            <span className='select-none'>Link</span>
                        </div>
                        <div className='cursor-not-allowed flex space-x-1 border-b border-r border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold'
                            style={{ color: type == "poll" ? "#d7dadc" : "#758284", borderBottom: type == "poll" ? "2px solid #d7dadc" : "1px solid #272729" }}>
                            <Bars3CenterLeftIcon className='w-6 h-6' />
                            <span className='select-none'>Poll</span>
                        </div>
                        <div className='cursor-not-allowed flex space-x-1 border-b border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold'
                            style={{ color: type == "talk" ? "#d7dadc" : "#758284", borderBottom: type == "talk" ? "2px solid #d7dadc" : "1px solid #272729" }}>
                            <MicrophoneIcon className='w-6 h-6' />
                            <span className='select-none'>Talk</span>
                        </div>
                    </div>
                    <div className='space-y-3 p-3'>
                        <div className=' flex items-center'>
                            <input
                                className='w-full border-2 border-grayblack-reddit p-2 rounded bg-black-reddit'
                                type="text"
                                placeholder='Title'
                                onChange={e => setNewtPost({ ...newPost, title: e.target.value })}
                            />
                            <span className='text-xs text-gray-500 absolute right-5'>{title.length}/300</span>
                        </div>

                        {/*Change content option here*/}
                        {type === "text" &&
                            <div className='border-b border-grayblack-reddit pb-4'>
                                <textarea
                                    className='w-full border-2 border-grayblack-reddit p-2 rounded bg-black-reddit'
                                    rows={8}
                                    cols={10}
                                    placeholder='Text (required)'
                                    onChange={e => setNewtPost({ ...newPost, content: e.target.value })}
                                />
                            </div>}
                        {type === "image" &&
                            <div className='border-b border-grayblack-reddit pb-4'>
                                {!content ?
                                    <div className='border-2 border-dashed border-grayblack-reddit w-full h-[20rem]'>
                                        <button
                                            className='w-full h-full text-xl text-gray-reddit font-semibold'
                                            onClick={() => getFiles.current.click()}>Upload</button>
                                        <input
                                            id='getFiles'
                                            className='hidden'
                                            type="file"
                                            accept='image/'
                                            ref={getFiles}
                                            // onChange={(e) => setNewtPost({ ...newPost, content: URL.createObjectURL(e.target.files[0]) })}
                                            onChange={handleImage}
                                        />
                                    </div> :
                                    <div className='flex items-center justify-center bg-grayblack-reddit min-h-[20rem]' >
                                        <img
                                            className='max-h-[32rem]'
                                            src={imgUrl}
                                            alt="not found" />
                                    </div>}
                            </div>}
                        {type === "link" &&
                            <div className='border-b border-grayblack-reddit pb-4'>
                                <input
                                    className='w-full border-2 border-grayblack-reddit rounded bg-black-reddit p-2 pb-12 text-start'
                                    type="url"
                                    pattern="https://.*"
                                    placeholder='Url'
                                    onChange={e => setNewtPost({ ...newPost, content: e.target.value })}
                                />
                            </div>}
                        <div className='flex justify-end space-x-2 p-2'>
                            {type == "image" ?
                                <button
                                    className='border border-gray-reddit text-gray-reddit py-1 px-5 rounded-full font-bold'
                                    onClick={() => setNewtPost({ ...newPost, content: "" })}
                                    style={{ color: content ? "#d7dadc" : "" }}>
                                    Cancel
                                </button> :
                                <button
                                    className='border border-gray-reddit text-gray-reddit py-1 px-5 rounded-full font-bold'
                                >Save Draft</button>}
                            <button
                                className='bg-white-reddit text-black-reddit px-5 rounded-full font-bold'
                                onClick={createPost}>
                                Post
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
