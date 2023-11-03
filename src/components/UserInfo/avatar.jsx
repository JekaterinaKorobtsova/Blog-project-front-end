import * as React from "react";
import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  if (!string) {
    return "#e91e63";
  }

  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "#e91e63",
    "#f8bbd0",
    "#f06292",
    "#e91e63",
    "#c2185b",
    "#880e4f",
  ];

  const colorIndex = Math.abs(hash % colors.length);

  return colors[colorIndex];
}

function stringAvatar(name) {
  if (!name) {
    return {
      sx: {
        bgcolor: "#e91e63", 
      },
      children: "",
    };
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name
      .split(" ")
      .map((part) => part[0])
      .join(""),
  };
}

export default function AvatarComponent({ name }) {
  return <Avatar {...stringAvatar(name)} />;
}
