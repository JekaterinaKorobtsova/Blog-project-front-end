import React, { useEffect } from "react";
import SideBlock from "./SideBlock/sideBlock";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Divider, List, Skeleton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../redux/slices/comment";



export const CommentsBlock = ({  user, children, isLoading = true }) => {
const { id } = useParams();
const dispatch = useDispatch();
const {items } = useSelector(state => state.comments);

 useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);


  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading ? [...Array(5)] : items).map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={user.fullName} src={user.avatarUrl} />
                )}
              </ListItemAvatar>
              <div>
                <ListItemText
                  primary={user.fullName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        
                        variant="caption"
                        color="#9e9e9e"
                      >
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </Typography>
                      <br />
                      {isLoading ? (
                        <Skeleton variant="text" height={18} width={230} />
                      ) : (
                        comment.text 
                      )}
                    </React.Fragment>
                  }
                />
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};