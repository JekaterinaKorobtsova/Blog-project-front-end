import React from "react";
import styles from "./SideBlock.module.scss";
import { Typography, Paper } from "@mui/material";

const SideBlock = ({ title, children }) => {
  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

export default SideBlock;