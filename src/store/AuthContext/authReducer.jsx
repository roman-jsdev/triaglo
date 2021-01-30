import { AUTH_SUCCESS, AUTH_LOGOUT } from "../types";

const handlers = {
  [AUTH_SUCCESS]: (state, { payload }) => ({
    ...state,
    token: payload,
  }),
  [AUTH_LOGOUT]: (state) => ({
    ...state,
    token: null,
  }),
  DEFAULT: (state) => state,
};

export const authReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
