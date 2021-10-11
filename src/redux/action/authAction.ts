import { createAction } from '@reduxjs/toolkit';
import AuthService, { LoginInput } from '../../services/AuthService';
import UserService from '../../services/UserService';
import { AppDispatch } from '../store';
import { User } from '../../dto/User';

// create well-typed action creators which when called return actions
// specifying their names (type) and payload contents
export const loginStarted = createAction('auth/loginStarted');
export const loginSucceeded = createAction<{
  user: User
}>('auth/loginSucceeded');
export const loginFailed = createAction<{ err: string }>('auth/loginFailed');

// define a thunk, can also use 'createAsyncThunk' for less boilerplate
export const login = ({
  id,
  password,
}: LoginInput) => async (dispatch: AppDispatch) => {
  dispatch(loginStarted());

  try {
    await AuthService.login({ id, password });
    const user = await UserService.getUser();

    dispatch(loginSucceeded({ user }));
  } catch (e) {
    // error message should be from API response, not hardcoded...
    dispatch(loginFailed({ err: 'Failed to login' }));
  }
};

export const logoutStarted = createAction('auth/logoutStarted');
export const logoutSucceeded = createAction('auth/logoutSucceeded');
export const logoutFailed = createAction<{
  err: string
}>('auth/logoutFailed');

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(logoutStarted());

  try {
    await UserService.logout();

    dispatch(logoutSucceeded());
  } catch (e) {
    dispatch(logoutFailed({ err: 'Failed to logout' }));
  }
};
