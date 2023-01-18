import React from "react";

export function Input({
  className,
  id,
  value,
  onChange,
  type,
  placeholder,
  readOnly,
}) {
  return (
    <input
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
      type={type}
      id={id}
    />
  );
}
