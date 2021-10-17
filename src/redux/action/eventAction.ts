import { createAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import {
  AddEventInput,
  Event,
  UpdateEventInput,
} from '../../dto/Event';
import EventService from '../../services/EventService';

export const getEventsStarted = createAction('event/getEventsStarted');
export const getEventsSucceeded = createAction<{
  events: Array<Event>
}>('event/getEventsSucceeded');
export const getEventsFailed = createAction<{
  err: string
}>('event/getEventsFailed');

export const getEvents = () => async (dispatch: AppDispatch) => {
  dispatch(getEventsStarted());

  try {
    const events = await EventService.getEvents();

    dispatch(getEventsSucceeded({ events }));
  } catch (e) {
    dispatch(getEventsFailed({ err: 'Failed to get events' }));
  }
};

// get dummy contacts (used in UI integration tests) without async requests
export const getDummyEvents = getEventsSucceeded({
  events: EventService.getDummyEvents(),
});

export const deleteEventsStarted = createAction(
  'contact/deleteEventsStarted',
);
export const deleteEventsSucceeded = createAction<{
  events: Array<Event>
}>('contact/deleteEventsSucceeded');
export const deleteEventsFailed = createAction<{
  err: string
}>('contact/deleteEventsFailed');

export const deleteEvents = (
  ids: string[],
) => async (dispatch: AppDispatch) => {
  dispatch(deleteEventsStarted());

  try {
    const events = await EventService.deleteEvents(ids);

    dispatch(deleteEventsSucceeded({ events }));
  } catch (e) {
    dispatch(deleteEventsFailed({ err: 'Failed to delete events' }));
  }
};

export const deleteEvent = (id: string) => deleteEvents([id]);

export const addEventStarted = createAction(
  'event/addEventStarted',
);
export const addEventSucceeded = createAction<{
  events: Array<Event>
}>('event/addEventSucceeded');
export const addEventFailed = createAction<{
  err: string
}>('event/addEventFailed');

export const addEvent = (
  {
    title,
    start,
    end,
  }: AddEventInput,
) => async (dispatch: AppDispatch) => {
  dispatch(addEventStarted());

  try {
    const events = await EventService.addEvent({
      title, start, end,
    });

    dispatch(addEventSucceeded({ events }));
  } catch (e) {
    dispatch(addEventFailed({ err: 'Failed to add event' }));
  }
};

export const updateEventStarted = createAction(
  'contact/updateEventStarted',
);
export const updateEventSucceeded = createAction<{
  events: Array<Event>
}>('contact/updateEventSucceeded');
export const updateEventFailed = createAction<{
  err: string
}>('contact/updateEventFailed');

export const updateEvent = (
  updatedEvent: UpdateEventInput,
) => async (dispatch: AppDispatch) => {
  dispatch(updateEventStarted());

  try {
    const events = await EventService.updateEvent(updatedEvent);

    dispatch(updateEventSucceeded({ events }));
  } catch (e) {
    dispatch(updateEventFailed({ err: 'Failed to update event' }));
  }
};
