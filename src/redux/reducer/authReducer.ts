import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../dto/User';
import { loginStarted, loginSucceeded } from '../action/authAction';

// equivalently, the state and reducers can be bundled up in a 'slice'

interface AuthState {
  isLoading: boolean;
  user: User | null;
}

// state for the reducer to update (immutably)
const initialState: AuthState = {
  isLoading: true,
  user: null,
};

// create well-typed reducer to act on the associated state
// statements inside appear to mutate state, but under the hood they
// are converted by Immer into logic that updates state immutably
export default createReducer(initialState, (builder) => {
  builder
    .addCase(loginStarted, (state, _action) => {
      state.isLoading = true;
    })
    .addCase(loginSucceeded, (state, action) => {
      state.user = action.payload.user;
    });
});
