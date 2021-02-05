import axios from "axios";
import { useCallback, useState } from "react";
import { modifyResponse } from "../utils";

export const useDB = (method, path, data) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getURL = (path) =>
    `https://triaglo-default-rtdb.firebaseio.com/${path}.json?auth=${process.env.REACT_APP_DB_KEY}`;

  const fetchDB = useCallback(
    async (asyncData, asyncPath) => {
      let responseFromDB = null;
      try {
        switch (method) {
          case "put":
            responseFromDB = await axios.put(
              asyncPath ? getURL(asyncPath) : getURL(path),
              asyncData || data
            );
            break;
          case "patch":
            responseFromDB = await axios.patch(
              asyncPath ? getURL(asyncPath) : getURL(path),
              asyncData || data
            );
            break;
          case "get":
            responseFromDB = await axios.get(
              asyncPath ? getURL(asyncPath) : getURL(path)
            );
            break;
          case "delete":
            responseFromDB = await axios.delete(
              asyncPath ? getURL(asyncPath) : getURL(path)
            );
            break;
          default:
            responseFromDB = null;
        }
        setResponse(modifyResponse(responseFromDB));
        setIsLoading(false);
      } catch (e) {
        alert(e);
      }
    },
    [path, method, data]
  );

  return [fetchDB, isLoading, response];
};
