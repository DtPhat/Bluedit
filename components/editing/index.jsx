import { supabase } from '../../client'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, DocumentTextIcon, PhotoIcon, LinkIcon, Bars3CenterLeftIcon, MicrophoneIcon } from '@heroicons/react/24/solid'
import Loading from '../loading'
function Edit() {
    const router = useRouter()
    const { id } = router.query
    const [loading, setLoading] = useState(true)
    const [editedPost, setEditedPost] = useState({ title: "", content: "", type: "" })
    const [imgFile, setImgFile] = useState("")
    const { title, content, type } = editedPost
    const getFiles = useRef()
    const active = 'border-b-2 border-b-blue-500 text-blue-500 dark:border-b-graywhite-reddit dark:text-graywhite-reddit bg-blue-50 dark:bg-grayblack-reddit'
    useEffect(() => {
        if (!id) router.push('/')
        else {
            fetchEditingPost()
        }
    }, []);
    useEffect(() => {
        if (type === "image") {
            downloadImage(content)
        }
    }, [type]);
    async function fetchEditingPost() {
        try {
            const { data } = await supabase
                .from('feed')
                .select('title, content, type')
                .eq('id', parseInt(id))
                .single()
            setEditedPost(data)
            if (type === "image") {
                downloadImage(content)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('post-images').download(path)
            if (error) {
                throw error
            }
            setImgFile(data)
        } catch (error) {
            console.log('Error downloading image: ', error)
        }
    }
    async function updatePost() {
        if (!content || !title || loading) return
        setLoading(true)
        try {
            await supabase
                .from('feed')
                .update(
                    {
                        'title': title,
                        'content': content,
                        'type': type
                    }
                )
                .match({ 'id': id })
            if (type == 'image') {
                let { error: uploadError } = await supabase.storage
                    .from('post-images')
                    .upload(content, imgFile, { upsert: true })
                if (uploadError) {
                    throw uploadError
                }
            }
        } catch (error) {
            throw error
        }
        finally {
            router.push('/')
        }

    }
    const handleImage = async (e) => {
        const file = e.target.files[0]
        setImgFile(file)
        const filePath = file.name
        setEditedPost({ ...editedPost, content: filePath })

    }
    return (
        <div className='flex justify-center'>
            <div className='max-w-7xl w-full space-y-4'>
                <h1 className='pb-3 border-b border-graywhite-reddit dark:border-grayblack-reddit text-xl font-medium'>Edit your post</h1>
                <div className='flex w-80 border-2 border-graywhite-reddit dark:border-grayblack-reddit p-1 space-x-2 items-center mb-3 rounded bg-white-reddit dark:bg-black-reddit'>
                    <img
                        src='https://i.ibb.co/x7NbSGH/Blue-Creep.jpg"'
                        width={30}
                        height={30}
                        className='rounded-full'
                        alt='User avatar' />
                    <span className='text-sm font-medium'>r/Dotipha</span>
                    <div className='flex flex-1 justify-end'>
                        <ChevronDownIcon className='w-5 h-5' />
                    </div>
                </div>

                <div className='flex flex-col space-y-3 rounded bg-white-reddit dark:bg-black-reddit relative '>
                    <div className='flex justify-between'>
                        <div
                            className={`cursor-not-allowed flex space-x-1 border-b border-r border-graywhite-reddit dark:border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold ${type === 'text' && active}`}>
                            <DocumentTextIcon className='w-6 h-6' />
                            <span className='select-none'>Post</span>
                        </div>
                        <div
                            className={`cursor-not-allowed flex space-x-1 border-b border-r border-graywhite-reddit dark:border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold ${type === 'image' && active}`}>
                            <PhotoIcon className='w-6 h-6' />
                            <span className='select-none'>Images</span>
                        </div>
                        <div
                            className={`cursor-not-allowed flex space-x-1 border-b border-r border-graywhite-reddit dark:border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold ${type === 'link' && active}`}>
                            <LinkIcon className='w-6 h-6' />
                            <span className='select-none'>Link</span>
                        </div>
                        <div className='cursor-not-allowed flex space-x-1 border-b border-r border-graywhite-reddit dark:border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold'>
                            <Bars3CenterLeftIcon className='w-6 h-6' />
                            <span className='select-none'>Poll</span>
                        </div>
                        <div className='cursor-not-allowed flex space-x-1 border-b border-graywhite-reddit dark:border-grayblack-reddit w-full items-center justify-center py-3 text-gray-reddit font-semibold'>
                            <MicrophoneIcon className='w-6 h-6' />
                            <span className='select-none'>Talk</span>
                        </div>
                    </div>
                    <div className='space-y-3 p-3'>
                        <div className='flex items-center'>
                            <input
                                className='w-full border-2 border-graywhite-reddit dark:border-grayblack-reddit p-2 rounded bbg-white-reddit dark:bg-black-reddit'
                                type="text"
                                value={title}
                                placeholder='Title'
                                onChange={e => setEditedPost({ ...editedPost, title: e.target.value })}
                            />
                            <span className='text-xs text-gray-500 absolute right-5'>{title.length}/300</span>
                        </div>

                        {type === "text" &&
                            <div className='border-b border-graywhite-reddit dark:border-grayblack-reddit pb-4'>
                                <textarea
                                    value={content}
                                    className='w-full border-2 border-graywhite-reddit dark:border-grayblack-reddit p-2 rounded bg-white-reddit dark:bg-black-reddit'
                                    rows={8}
                                    cols={10}
                                    placeholder='Text (required)'
                                    onChange={e => setEditedPost({ ...editedPost, content: e.target.value })}
                                />
                            </div>}
                        {type === "image" &&
                            <div className='border-b border-graywhite-reddit dark:border-grayblack-reddit pb-4'>
                                {!content ?
                                    <div className='border-2 border-dashed border-gray-200 dark:border-grayblack2-reddit w-full h-[20rem]'>
                                        <button
                                            className='w-full h-full text-xl text-blue-500 dark:text-gray-reddit font-semibold'
                                            onClick={() => getFiles.current.click()}>
                                            Upload images
                                        </button>
                                        <input
                                            className='hidden'
                                            type="file"
                                            accept='image/'
                                            ref={getFiles}
                                            onChange={handleImage}
                                        />
                                    </div> :
                                    <div className='flex items-center justify-center bg-graywhite-reddit dark:bg-grayblack-reddit min-h-[20rem]' >
                                        <img
                                            className='max-h-[32rem]'
                                            src={imgFile && URL.createObjectURL(imgFile)}
                                            alt="not found"
                                            height={512} />
                                    </div>}
                            </div>}
                        {type === "link" &&
                            <div className='border-b text-blue-600 dark:text-blue-400 border-graywhite-reddit dark:border-grayblack-reddit pb-4'>
                                <input
                                    className='w-full border-2 border-graywhite-reddit dark:border-grayblack-reddit rounded bg-white-reddit dark:bg-black-reddit p-2 pb-12 text-start'
                                    type="url"
                                    pattern="https://.*"
                                    placeholder='Url'
                                    value={content}
                                    onChange={e => setEditedPost({ ...editedPost, content: e.target.value })}
                                />
                            </div>}
                        <div className='flex justify-end space-x-2 p-2'>
                            {type == "image" ?
                                <button
                                    className='border border-blue-400 dark:border-gray-reddit text-blue-400 dark:text-gray-reddit py-1 px-5 rounded-full font-bold'
                                    onClick={() => setEditedPost({ ...editedPost, content: "" })}>
                                    Cancel
                                </button> :
                                <button
                                    className='border border-blue-500 dark:border-gray-reddit text-blue-500 dark:text-gray-reddit py-1 px-5 rounded-full font-bold'
                                >Save Draft</button>}
                            <button
                                className={`bg-blue-500 dark:bg-white-reddit border-blue-500 dark:border-gray-reddit px-5 rounded-full font-bold
                                    ${content && title && !loading ? "text-white-reddit dark:text-black-reddit hover:opacity-90" : "text-blue-300 dark:text-gray-reddit"}`}
                                onClick={updatePost}>
                                {loading ? <Loading size={'w-6 h-6'} /> : <span className=''>Save</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;