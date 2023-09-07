import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import SideBlock from "./SideBlock/sideBlock";
import { Link } from "react-router-dom";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((tag, index) => (
          <Link key={`${tag}-${index}`} style={{ textDecoration: "none", color: "black" }} to={`/tags/${tag}`}>
            <ListItem key={tag} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={tag} />}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
