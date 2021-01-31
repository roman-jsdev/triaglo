import { AUTH_SUCCESS, AUTH_LOGOUT } from "../types";

const handlers = {
  [AUTH_SUCCESS]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    id: payload.id,
    email: payload.email,
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
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
