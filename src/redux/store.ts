import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { differenceInHours } from 'date-fns';
import LocalStorage from './LocalStorage';
import authReducer from './reducer/authReducer';
import contactReducer from './reducer/contactReducer';
import eventReducer from './reducer/eventReducer';

const ONE_THREAD_LOCAL_STORAGE_NAME = 'ONE_THREAD_FE';

const loadState = () => {
  try {
    const state = LocalStorage.get(ONE_THREAD_LOCAL_STORAGE_NAME);
    if (state === null) {
      return undefined;
    }
    if (differenceInHours(new Date(), new Date(state.date)) >= 8) {
      LocalStorage.clear();
      return undefined;
    }

    return state;
  } catch (e) {
    return undefined;
  }
};

// load state from local storage if any
const localState = loadState();
const preloadedState = {
  auth: {
    isLoading: false,
    user: localState?.user,
    error: null,
    date: localState?.date,
  },
};

// create the application store, internally it adds default middleware and
// combines reducers into a single root reducer
export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    event: eventReducer,
  },
  preloadedState,
});

// save to local storage when redux state is changed, for now just want
// to keep track of logged in user for session functionality
store.subscribe(() => {
  const state = store.getState();

  LocalStorage.store(
    ONE_THREAD_LOCAL_STORAGE_NAME,
    {
      user: state.auth.user,
      date: state.auth.date,
    },
  );
});

// inferred type of the app state
export type RootState = ReturnType<typeof store.getState>;

// well-typed dispatch function to 'send' actions to reducers so they
// can modify the state
export type AppDispatch = typeof store.dispatch;

// hooks for React components to be able to dispatch actions and select
// things from the application state
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
