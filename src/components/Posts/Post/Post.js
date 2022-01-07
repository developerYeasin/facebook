import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";


const Post = (props) => {
    const {title, id} = props.post;
    const commentBorder = {
        border: "1px solid rgb(255, 255, 255)",
        margin: "8px",
        padding: "30px",
        borderRadius: "30px"
    }

    const [comment, setComment] = useState([])
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(res => res.json())
        .then(data => setComment(data))
    }, [])
    

    // console.log(comment[0])
    // console.log(props.image);
    
  return (
    <div>
      <Card sx={{ maxWidth: 700 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="400"
          image={props.image.webformatURL}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Link to={`/post/${id}`}><Button size="small">Learn More</Button></Link>
        </CardActions>
        <div className="row bg-dark p-3" style={{color: "#ffff"}}>
            <div className="col-md-4">
                <h5 className="m-2">Comment</h5>
            </div>
            <div className="col-md-8"> 
                <div className="mt-4">
                    {comment[0] && <Comment commentBorder={commentBorder} comment={comment[0]}></Comment>}
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default Post;
