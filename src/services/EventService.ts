import axios from 'axios';
import API_URL from '../util/constants';
import {
  AddEventInput, Event, EventApiResult, UpdateEventInput,
} from '../dto/Event';

let EVENTS: Array<Event> = [...Array(20)].map((_, i) => {
  const idx = i.toString();
  const start = Date.now() + i * 24 * 3600000;
  return {
    eventId: idx,
    title: `Daily Scrum Meeting ${idx}`,
    note: `this is event ${idx}`,
    start,
    end: start + 3600000,
    type: 'collaborate',
    tags: ['1', '2'],
    contacts: [
      { id: '1', status: 'confirmed' },
      { id: '3', status: 'pending' },
    ],
  };
});

class EventService {
  static async getEvents(): Promise<Array<Event>> {
    const today = Date.now();

    const result = [...Array(100 * 2)].flatMap(async (_, d) => {
      const dayIdx = d - 100;
      const time = today + dayIdx * 24 * 3600000;

      const eventResult = await axios.get(
        `${API_URL}/event/retrieve/many/${time}`,
        { withCredentials: true },
      );
      if (eventResult.data.data.statusCode === false) {
        return [];
      }

      return (eventResult.data.data.data as any).map(
        (e: EventApiResult & {_id : string}) => {
          return {
            eventId: e._id,
            title: e.title,
            note: e.note,
            start: e.start,
            end: e.end,
            type: e.type,
            tags: e.tags,
            contacts: [
              ...e.contacts.confirm.map((id) => ({ id, status: 'confirmed' })),
              ...e.contacts.pending.map((id) => ({ id, status: 'pending' })),
            ],
          };
        },
      );
    });

    return (await Promise.all(result) as Array<Array<Event>>).flat(1);
  }

  static async addEvent({
    title,
    start,
    end,
  }: AddEventInput): Promise<{ id: string, events: Array<Event>}> {
    const result = await axios.post(`${API_URL}/event/add`, {
      title,
      note: '',
      start,
      end,
      contacts: {
        confirm: [],
        pending: [],
      },
      type: 'personal',
    }, { withCredentials: true });

    const events = await this.getEvents();

    if ((result.data as any).status.statusCode === 400) {
      return {
        id: '',
        events,
      };
    }

    return {
      id: (result.data as any).status.data,
      events,
    };
  }

  static async getEventsDummy(): Promise<Array<Event>> {
    return EVENTS;
  }

  static async deleteEvent(id: string): Promise<Array<Event>> {
    EVENTS = EVENTS.filter((event) => event.eventId !== id);
    return EVENTS;
  }

  static async deleteEvents(ids: string[]): Promise<Array<Event>> {
    EVENTS = EVENTS.filter((e) => !ids.includes(e.eventId));
    return EVENTS;
  }

  static async addEventDummy({
    title,
    start,
    end,
  }: AddEventInput): Promise<{id: string, events: Array<Event>}> {
    const ids = (await this.getEvents()).map((e) => e.eventId);
    const newId = String(Number(ids[ids.length - 1]) + 1);

    EVENTS = [...EVENTS,
      {
        eventId: newId,
        title,
        note: '',
        start,
        end,
        type: 'collaborate',
        tags: [],
        contacts: [],
      },
    ];

    return {
      id: newId,
      events: EVENTS,
    };
  }

  static async updateEvent({
    eventId,
    title,
    note,
    start,
    end,
    type,
    tags,
    contacts,
  }: UpdateEventInput): Promise<Array<Event>> {
    const idx = EVENTS.findIndex((e) => e.eventId === eventId);

    if (idx === -1) {
      return EVENTS;
    }

    const oldEvent = EVENTS[idx];

    EVENTS = EVENTS.map((e) => {
      if (e.eventId === oldEvent.eventId) {
        return {
          ...e,
          title: title !== undefined ? title : e.title,
          note: note !== undefined ? note : e.note,
          start: start !== undefined ? start : e.start,
          end: end !== undefined ? end : e.end,
          type: type !== undefined ? type : e.type,
          tags: tags !== undefined ? tags : e.tags,
          contacts: contacts !== undefined ? contacts : e.contacts,
        };
      }
      return e;
    });

    return EVENTS;
  }

  static getDummyEvents(n: number = 24): Array<Event> {
    return [...Array(n)].map((_, i) => {
      const idx = i.toString();
      return {
        eventId: idx,
        title: `event${idx}`,
        note: 'this is an event',
        start: Date.now(),
        end: Date.now() + 3600000,
        type: 'collaborate',
        tags: ['1', '2'],
        contacts: [],
      };
    });
  }
}

export default EventService;
