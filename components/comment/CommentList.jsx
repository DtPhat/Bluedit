import CommentItem from './CommentItem';
function CommentList({ commentList }) {
    return (
        <div className="space-y-4">
            {commentList.map(item => {
                return <CommentItem item={item} key={item.comment_id}/>
            })}
        </div>
    );
}

export default CommentList;