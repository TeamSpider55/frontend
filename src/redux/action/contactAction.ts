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
    const contacts = await ContactService.getDummyContacts();

    dispatch(getContactsSucceeded({ contacts }));
  } catch (e) {
    dispatch(getContactsFailed({ err: 'Failed to get contacts' }));
  }
};

// synchronous logic: no need for thunks
export const getDummyContacts = getContactsSucceeded({
  contacts: ContactService.getDummyContacts(),
});
