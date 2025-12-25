import React from "react";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

/**
 * Generate color from string (consistent for same name)
 */
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

/**
 * Get initials from name
 */
const getInitials = (text = "") =>
  text
    .trim()
    .split(" ")
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join("");

/**
 Avatar Component
 */
const AvatarLogo = ({
  src,
  name,
  handle,
  size = 40,
  variant = "circular",
  isLogo = false,
}) => {
  const displayText = name || handle || "";
  const initials = getInitials(displayText);
  const bgColor = stringToColor(displayText || "user");

  return (
    <Avatar
      src={src}
      variant={variant}
      sx={{
        width: size,
        height: size,
        bgcolor: src ? "transparent" : bgColor,
        fontSize: size * 0.4,
        fontWeight: 600,
      }}
    >
      {!src && initials ? (
        initials
      ) : !src && isLogo ? (
        <strong>⚡</strong>
      ) : !src ? (
        <PersonIcon />
      ) : null}
    </Avatar>
  );
};

export default AvatarLogo;
