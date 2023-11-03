import React, { useEffect, useState } from "react";
import Post from "../components/Post/post";
import AddComment from "../components/AddComment/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";


const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();


  useEffect(() => {
    axios
    .get(`/posts/${id}?incrementView=false`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Issue with getting the post");
      });
  }, [id]);

  const handleCommentAdded = async () => {
    try {
      const response = await axios.get(`/posts/${id}?incrementView=false`);
      setData(response.data);
    } catch (error) {
      console.warn(error);
      alert("Issue with getting the post");
    }
  };

  
  

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  const postText = data.text;

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
