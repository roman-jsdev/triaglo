import { useCallback, useEffect } from "react";

export const useOutsideClick = ({ current }, callback) => {
  const handleClickOutside = useCallback(
    ({ target }) => {
      if (current && !current.contains(target)) {
        callback();
      }
    },
    [current, callback]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};
