import React, { useEffect, useState } from 'react';
import styles from "./AddComment.module.scss";
import {TextField, Avatar, Button} from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';
import { addNewComment, fetchComments, setCommentText } from '../../redux/slices/comment'



const AddComment = ({onCommentAdded}) => {
  const {id} = useParams();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();;
  const commentText = useSelector(state => state.comments.text);


  const onSubmit = async () => {
    try {
      dispatch(setCommentText(''));

      const fields = { text: commentText };
      const { data } = await axios.post(`/posts/${id}`, fields);
  
      dispatch(addNewComment(data));
      dispatch(fetchComments(id));
      onCommentAdded();
        
    } catch (error) {
      console.warn('Comment creating failed', error);

    }
  };
  

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }


    return (
        <>
          <div className={styles.root}>
            <Avatar
              classes={{ root: styles.avatar }}
            />
            <div className={styles.form}>
              <TextField
                label="Write a comment"
                variant="outlined"
                maxRows={10}
                multiline
                fullWidth
                onChange={(event) => dispatch(setCommentText(event.target.value))}
                value={commentText}
              />
              <Button onClick={onSubmit} variant="contained">Send</Button>
            </div>
          </div>
        </>
      );
    };

    export default AddComment;
