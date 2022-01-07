import React, { useEffect, useState } from 'react';
import Post from './Post/Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => setPosts(data.slice(0, 10)))
    }, [])
    // console.log(posts)
    const [images, setImages] = useState([]);
    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=19883562-ea36d5a72d4441ca2e5431096&q=yellow+flowers&image_type=photo&pretty=true`)
        .then(res => res.json())
        .then(data => setImages(data.hits.slice(0, 10)))
    }, [])
    let image;
    images.map(img => image = img)
    // console.log('ami images', images)
    return (
        <div className="row">
            <div className="col-md-6 m-auto">
            <h1>this is posts</h1>
            {
               images && posts.map(post => image && <Post image={image} key={post.id} post={post}></Post>)
            }
            </div>
        </div>
    );
};

export default Posts;