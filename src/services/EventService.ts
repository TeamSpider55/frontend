import { AddEventInput, Event } from '../dto/Event';

let EVENTS: Array<Event> = [...Array(3)].map((_, i) => {
  const idx = i.toString();
  return {
    eventId: idx,
    title: `event${idx}`,
    note: `this is event ${idx}`,
    start: Date.now(),
    end: Date.now() + 3600000,
    type: 'collaborate',
    tags: ['1', '2'],
    contacts: [],
  };
});

class EventService {
  static async getEvents(): Promise<Array<Event>> {
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

  static async addEvent({
    title,
    start,
    end,
  }: AddEventInput): Promise<Array<Event>> {
    const ids = (await this.getEvents()).map((e) => e.eventId);
    const newId = ids[ids.length - 1] + 1;

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
