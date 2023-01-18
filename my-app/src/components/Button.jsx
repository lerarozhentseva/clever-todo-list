import React from "react";

export function Button({ onClick, className, title, type }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {title}
    </button>
  );
}
