import { useHistory } from 'react-router-dom';
import { createAction } from '@reduxjs/toolkit';
import AuthService, { LoginInput, RegisterInput } from '../../services/AuthService';
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

export const passwordChangeStarted = createAction('auth/passwordChangeStarted');
export const passwordChangeSucceeded = createAction('auth/passwordChangeSucceeded');
export const passwordChangeFailed = createAction<{
  err: string
}>('auth/passwordChangeFailed');

export const updatePassword = (newPassword: string) => async (dispatch: AppDispatch) => {
  dispatch(passwordChangeStarted());
  try {
    await UserService.updatePassword(newPassword);
    dispatch(passwordChangeSucceeded());
  } catch (e) {
    dispatch(passwordChangeFailed({ err: 'Failed to update password due to error' }));
  }
};

export const registerStarted = createAction('auth/registerStarted');
export const registerSucceeded = createAction('auth/registerSucceeded');
export const registerFailed = createAction<{
  err: string
}>('auth/registerFailed');

export const register = ({
  email,
  userName,
  familyName,
  givenName,
  password,
  phone,
  address,
}: RegisterInput) => async (dispatch: AppDispatch) => {
  console.log({
    email,
    userName,
    familyName,
    givenName,
    password,
    phone,
    address,
  });

  dispatch(passwordChangeStarted());
  try {
    await AuthService.register({
      email,
      userName,
      familyName,
      givenName,
      password,
      phone,
      address,
    });
    dispatch(passwordChangeSucceeded());
  } catch (e) {
    dispatch(passwordChangeFailed({ err: 'Register failed' }));
  }
};

export const cleanupError = createAction('auth/cleanupError');
