import axios from "axios";
import { useCallback, useState } from "react";

export const useDB = (method, path, data) => {
  const [response, setResponse] = useState(null);
  const url = `https://triaglo-default-rtdb.firebaseio.com/${path}.json?auth=${process.env.REACT_APP_DB_KEY}`;

  const fetchDB = useCallback(async () => {
    switch (method) {
      case "put":
        try {
          const response = await axios.put(url, data);
          setResponse(response);
        } catch (e) {
          alert(e);
        }
        break;
      case "get":
        try {
          const response = await axios.get(url);
          setResponse(response);
        } catch (e) {
          alert(e);
        }
        break;
      case "delete":
        try {
          const response = await axios.delete(url);
          setResponse(response);
        } catch (e) {
          alert(e);
        }
        break;
      default:
        console.warn("Some problems with connection method");
    }
  }, [url, method, data]);

  return [fetchDB, response];
};
