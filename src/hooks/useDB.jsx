import axios from "axios";
import { useCallback, useState } from "react";
import { initialData } from "../initialData";

export const useDB = (method, path, data) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const url = `https://triaglo-default-rtdb.firebaseio.com/${path}.json?auth=${process.env.REACT_APP_DB_KEY}`;

  const getData = (responseFromDb) => {
    let modResponse = responseFromDb.data;
    if (responseFromDb.data === null) {
      return (modResponse = initialData);
    }
    const isBoard = JSON.stringify(modResponse).substr(2).slice(0, 5);

    if (isBoard === "board") {
      return responseFromDb.data;
    }
    if (!modResponse.invited) {
      modResponse = {
        ...modResponse,
        invited: [],
      };
    }
    if (!modResponse.tasks) {
      modResponse = {
        ...modResponse,
        tasks: {},
      };
    }
    if (!modResponse.columns) {
      modResponse = {
        ...modResponse,
        columns: {},
      };
    }
    if (!modResponse.columnOrder) {
      modResponse = {
        ...modResponse,
        columnOrder: [],
      };
    }
    const columns = Object.keys(modResponse.columns).map((e) => e);
    columns.forEach((e) => {
      if (!modResponse.columns[e].taskIds) {
        modResponse.columns[e].taskIds = [];
      }
    });
    return modResponse;
  };

  const fetchDB = useCallback(async () => {
    switch (method) {
      case "put":
        try {
          const responseFromDb = await axios.put(url, data);
          setResponse(getData(responseFromDb));
          setIsLoading(false);
        } catch (e) {
          alert(e);
        }
        break;
      case "get":
        try {
          const responseFromDb = await axios.get(url);
          setResponse(getData(responseFromDb));
          setIsLoading(false);
        } catch (e) {
          alert(e);
        }
        break;
      case "delete":
        try {
          const responseFromDb = await axios.delete(url);
          setResponse(getData(responseFromDb));
          setIsLoading(false);
        } catch (e) {
          alert(e);
        }
        break;
      default:
        console.warn("Some problems with connection method");
    }
  }, [url, method, data]);

  return [fetchDB, isLoading, response];
};
