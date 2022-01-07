import React from 'react';

const Comment = (props) => {
    // console.log(props)
    const {name, email, body} = props.comment;
    return (
        <div style={props.commentBorder}>
            <h4>{name}</h4>
            <p>{body}</p>
            <a href="#">{email}</a>
        </div>
    );
};

export default Comment;