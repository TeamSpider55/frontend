import { createAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { AddContactInput, Contact } from '../../dto/Contact';
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

export const deleteContactsStarted = createAction(
  'contact/deleteContactsStarted',
);
export const deleteContactsSucceeded = createAction<{
  contacts: Array<Contact>
}>('auth/deleteContactsSucceeded');
export const deleteContactsFailed = createAction<{
  err: string
}>('auth/deleteContactsFailed');

export const deleteContacts = (
  ids: string[],
) => async (dispatch: AppDispatch) => {
  dispatch(deleteContactsStarted());

  try {
    const contacts = await ContactService.deleteContacts(ids);

    dispatch(deleteContactsSucceeded({ contacts }));
  } catch (e) {
    dispatch(deleteContactsFailed({ err: 'Failed to delete contacts' }));
  }
};

// reuse action type and payload, and service call
export const deleteContact = (id: string) => deleteContacts([id]);

export const addContactStarted = createAction(
  'contact/addContactStarted',
);
export const addContactSucceeded = createAction<{
  contacts: Array<Contact>
}>('auth/addContactSucceeded');
export const addContactFailed = createAction<{
  err: string
}>('auth/addContactFailed');

export const addContact = (
  {
    email,
    givenName,
    familyName,
  }: AddContactInput,
) => async (dispatch: AppDispatch) => {
  dispatch(addContactStarted());

  try {
    const contacts = await ContactService.addContact({
      email, givenName, familyName,
    });

    dispatch(addContactSucceeded({ contacts }));
  } catch (e) {
    dispatch(addContactFailed({ err: 'Failed to add contact' }));
  }
};
