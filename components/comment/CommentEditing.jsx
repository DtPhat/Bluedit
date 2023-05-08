import Router from "next/router";
import { useState } from "react";
import { supabase } from "../../client";
import Loading from "../loading";
function CommentEditing({ comment_id, comment, setEditing }) {
    const [newComment, setNewComment] = useState(comment)
    const [submitting, setSubmitting] = useState(false)
    const updateComment = async () => {
        if (!newComment && submitting) return
        try {
            setSubmitting(true)
            await supabase
                .from('comments')
                .update(
                    {'comment' : newComment}
                )
                .match({ 'comment_id': comment_id })
        } catch (error) {
            throw error
        }
        finally {
            Router.reload()
        }

    }
    return (
        <div className='flex border-2 border-gray-300 dark:border-grayblack2-reddit pb-4 relative rounded focus-within:border-black-reddit dark:focus-within:border-white-reddit ml-8 my-4'>
            <div
                className='absolute flex justify-center h-40 top-[-0.25rem] left-[-1rem]'>
                <div className='border dark:border-gray-reddit'></div>
            </div>
            <textarea
                className='rounded bg-white-reddit dark:bg-black-reddit py-2 px-4 outline-none group-focus:bg-white'
                rows={5}
                cols={70}
                placeholder='What are your thoughts?'
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
            />
            <div className='absolute py-1 space-x-3 pr-3 bottom-0 w-full flex justify-end bg-gray-100 dark:bg-grayblack-reddit rounded-b'>
                <div
                    className={`text-blue-500 dark:text-white-reddit border border-blue-500 dark:border-white-reddit px-3 p-0.5 rounded-full text-sm font-bold cursor-pointer`}
                    onClick={() => setEditing(false)}>
                    Cancel
                </div>
                <div
                    className={`bg-gray-reddit dark:bg-white-reddit dark:text-gray-reddit w-24 text-center p-0.5 rounded-full text-sm font-bold cursor-pointer
                                    ${newComment && !submitting ? 'text-white-reddit dark:text-black-reddit bg-blue-500 hover:opacity-90' : 'text-gray-300 cursor-not-allowed'}`}
                    onClick={updateComment}>
                    {submitting ? <Loading size={"w-6 h-6"} /> : <span>Save edit</span>}
                </div>

            </div>
        </div>
    );
}

export default CommentEditing;