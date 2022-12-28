import React from "react";

export const Button = ({onClick, className, title, type}) => {
  return (
    <button className={className} onClick={onClick} type={type}>{title}</button>
  )
};