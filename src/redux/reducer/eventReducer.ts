import { createReducer } from '@reduxjs/toolkit';
import { Event } from '../../dto/Event';
import {
  getEventsStarted,
  getEventsSucceeded,
  getEventsFailed,
} from '../action/eventAction';

interface EventState {
  isLoading: boolean;
  events: Array<Event> | null;
  error: string | null;
}

const initialState: EventState = {
  isLoading: true,
  events: null,
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getEventsStarted, (state, _action) => {
      state.isLoading = true;
      state.events = null;
    })
    .addCase(getEventsSucceeded, (state, action) => {
      state.isLoading = false;
      state.events = action.payload.events;
    })
    .addCase(getEventsFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.err;
    });
});
