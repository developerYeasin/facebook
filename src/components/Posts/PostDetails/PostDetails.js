import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../Comment/Comment';

const PostDetails = () => {
    const [post, setPost] = useState({})
    const {postId} = useParams();
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data))
    }, [])
    const [comment, setComment] = useState([])
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(res => res.json())
        .then(data => setComment(data))
    }, [])
    console.log(post)
    return (
        <div>
            <h4>{post.title}</h4>
            <h5>{post.body}</h5>
            {
                comment.map(com => <Comment comment={com}></Comment>)
            }
        </div>
    );
};

export default PostDetails;