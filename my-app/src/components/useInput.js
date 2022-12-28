import { useCallback, useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState("");
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  },[setValue]);

  const reset = () => {
    setValue("");
  };
  return {
    value,
    onChange: onChange,
    reset,
  }
};