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
      switch (method) {
        case "put":
          try {
            const responseFromDB = await axios.put(
              asyncPath ? getURL(asyncPath) : getURL(path),
              asyncData || data
            );
            setResponse(modifyResponse(responseFromDB));
            setIsLoading(false);
          } catch (e) {
            alert(e);
          }
          break;
        case "get":
          try {
            const responseFromDB = await axios.get(
              asyncPath ? getURL(asyncPath) : getURL(path)
            );
            setResponse(modifyResponse(responseFromDB));
            setIsLoading(false);
          } catch (e) {
            alert(e);
          }
          break;
        case "delete":
          try {
            const responseFromDB = await axios.delete(
              asyncPath ? getURL(asyncPath) : getURL(path)
            );
            setResponse(modifyResponse(responseFromDB));
            setIsLoading(false);
          } catch (e) {
            alert(e);
          }
          break;
        default:
          console.warn("Some problems with HTTP methods");
      }
    },
    [path, method, data]
  );

  return [fetchDB, isLoading, response];
};
