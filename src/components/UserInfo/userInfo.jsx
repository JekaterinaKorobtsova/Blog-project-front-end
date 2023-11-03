import React from "react";
import styles from "./UserInfo.module.scss";
import AvatarComponent from "./avatar";

function formatCreatedAt(createdAt) {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  const formattedAdditionalText = formatCreatedAt(additionalText);

  return (
    <div className={styles.root}>
      <AvatarComponent name={fullName} src={avatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{formattedAdditionalText}</span>
      </div>
    </div>
  );
};
