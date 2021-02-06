import { AUTH_SUCCESS, AUTH_LOGOUT } from "@store/types";

const cases = {
  [AUTH_SUCCESS]: (state, { payload: {  token, id, email  } }) => ({
    ...state,
    token,
    id,
    email,
  }),
  [AUTH_LOGOUT]: (state) => ({
    ...state,
    token: null,
    id: null,
    email: null,
  }),
  DEFAULT: (state) => state,
};

export const authReducer = (state, action) => {
  const reducer = cases[action.type] || cases.DEFAULT;
  return reducer(state, action);
};
