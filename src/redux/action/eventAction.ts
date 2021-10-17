import { createAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import {
  Event,
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
