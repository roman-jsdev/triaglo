import {
  firstDashboardSection,
  secondDashboardSection,
  thirdDashboardSection,
} from "@src/constants";

export const validateEmail = (email) => [
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
    email
  ),
];

export const storage = (data) =>
  !data
    ? JSON.parse(localStorage.getItem("localUser"))
    : localStorage.setItem("localUser", JSON.stringify(data));

export const objectFilter = (object, callback) =>
  Object.keys(object)
    .filter(callback)
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: object[key],
      };
    }, {});

export const modifyResponse = ({ data }) => {
  const { userId } = storage() || { userId: null };
  const initialData = {
    owner: userId,
    invited: [],
    tasks: {},
    columns: {},
    columnOrder: [],
    bg: "#1d76db",
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

export const getBoardsSections = (tabId) =>
  tabId === 0
    ? [firstDashboardSection, secondDashboardSection, thirdDashboardSection]
    : tabId === 1
    ? [secondDashboardSection]
    : [thirdDashboardSection];

export const setActiveClassName = (
  { current: { childNodes } },
  { classList: activeClassList }
) => {
  childNodes.forEach(({ classList }) => classList.remove("active"));
  activeClassList.add("active");
};
