import React from "react";

export const Input = ({className, value, onChange, type, placeholder}) => {
  return (
    <input value={value}
           className={className}
           placeholder={placeholder}
           onChange={onChange}
           type={type}
    />
  )
};