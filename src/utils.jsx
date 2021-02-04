export const validateEmail = (email) => [
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
    email
  ),
];

export const storage = (data) => {
  if (!data) return JSON.parse(localStorage.getItem("localUser"));
  localStorage.setItem("localUser", JSON.stringify(data));
};

export const objectFilter = (object, callback) => {
  return Object.keys(object)
    .filter(callback)
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: object[key],
      };
    }, {});
};

export const modifyResponse = ({ data }) => {
  const { userId } = storage() || { userId: null };
  const initialData = {
    owner: userId,
    invited: [],
    tasks: {},
    columns: {},
    columnOrder: [],
    bg: "#0274bb",
    boards: {},
  };

  if (data && data.email) return data;
  if (!data) data = initialData;
  if (!data.invited) data = { ...data, invited: [] };
  if (!data.tasks) data = { ...data, tasks: {} };
  if (!data.columns) data = { ...data, columns: {} };
  if (!data.columnOrder) data = { ...data, columnOrder: [] };

  Object.keys(data.columns).forEach((column) => {
    if (!data.columns[column].taskIds) data.columns[column].taskIds = [];
  });

  return data;
};
