import React from "react";
import SideBlock from "./SideBlock/sideBlock";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Divider, List, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";




export const CommentsBlock = ({ items, user, children, isLoading = true }) => {

  const comments = useSelector(state => state.comments.items);

  console.log("Comments:", comments);
  console.log('User:', user);

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
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={user.fullName}
                  secondary={comment}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};