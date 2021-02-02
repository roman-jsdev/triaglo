export const initialData = {
  owner: sessionStorage.getItem('userId'),
  invited: [],
  tasks: {},
  columns: {},
  columnOrder: [],
  bg: 'rgb(0, 121, 191)',
  boards: {}
}

export const initialUserState = {
  userId: sessionStorage.getItem("userId"),
  email: sessionStorage.getItem("email"),
  isLoading: true,
  boards: {},
};
