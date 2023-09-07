import React, { useEffect, useState } from "react";
import Post from "../components/Post/post";
import AddComment from "../components/AddComment/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { fetchComments } from "../redux/slices/comment";

const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  
  

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Issue with getting the post");
      });
  }, [id]);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const handleCommentAdded = () => {
    dispatch(fetchComments(id));
  };
  

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  const postText = data.text;


  console.log("Comments in FullPost:", data.comments);
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={postText} />
      </Post>
      <CommentsBlock items={data.comments || []} user={data.user} isLoading={false}>
        <AddComment onCommentAdded={handleCommentAdded}/>
      </CommentsBlock>
    </>
  );
};
export default FullPost;
