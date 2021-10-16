import { createAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { Contact } from '../../dto/Contact';
import ContactService from '../../services/ContactService';

export const getContactsStarted = createAction('contact/getContactsStarted');
export const getContactsSucceeded = createAction<{
  contacts: Array<Contact>
}>('auth/getContactsSucceeded');
export const getContactsFailed = createAction<{
  err: string
}>('auth/getContactsFailed');

export const getContacts = () => async (dispatch: AppDispatch) => {
  dispatch(getContactsStarted());

  try {
    const contacts = await ContactService.getContacts();

    dispatch(getContactsSucceeded({ contacts }));
  } catch (e) {
    dispatch(getContactsFailed({ err: 'Failed to get contacts' }));
  }
};

// synchronous logic: no need for thunks
// get dummy contacts (used in UI integration tests) without async requests
export const getDummyContacts = getContactsSucceeded({
  contacts: ContactService.getDummyContacts(),
});

export const deleteContactStarted = createAction(
  'contact/deleteContactStarted',
);
export const deleteContactSucceeded = createAction<{
  contacts: Array<Contact>
}>('auth/deleteContactSucceeded');
export const deleteContactFailed = createAction<{
  err: string
}>('auth/deleteContactFailed');

export const deleteContact = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(deleteContactStarted());

  try {
    const contacts = await ContactService.deleteContact(id);

    dispatch(deleteContactSucceeded({ contacts }));
  } catch (e) {
    dispatch(deleteContactFailed({ err: 'Failed to get contacts' }));
  }
};
