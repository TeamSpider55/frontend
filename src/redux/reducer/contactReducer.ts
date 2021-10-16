import { createReducer } from '@reduxjs/toolkit';
import { Contact } from '../../dto/Contact';
import {
  getContactsStarted,
  getContactsSucceeded,
  getContactsFailed,
  deleteContactStarted,
  deleteContactSucceeded,
  deleteContactFailed,
} from '../action/contactAction';

interface ContactState {
  isLoading: boolean;
  contacts: Array<Contact> | null;
  error: string | null;
}

const initialState: ContactState = {
  isLoading: true,
  contacts: null,
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getContactsStarted, (state, _action) => {
      state.isLoading = true;
      state.contacts = null;
    })
    .addCase(getContactsSucceeded, (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload.contacts;
    })
    .addCase(getContactsFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.err;
    })
    .addCase(deleteContactStarted, (state, _action) => {
      state.isLoading = true;
      state.contacts = null;
    })
    .addCase(deleteContactSucceeded, (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload.contacts;
    })
    .addCase(deleteContactFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.err;
    });
});
