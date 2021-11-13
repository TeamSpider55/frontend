export interface EventApiResult {
  eventId: string;
  title: string;
  note: string;
  start: number;
  end: number;
  type: 'personal' | 'collaborate';
  tags: string[];
  contacts: {
    confirm: Array<string>;
    pending: Array<string>;
  };
}

export interface Event {
  eventId: string;
  title: string;
  note: string;
  start: number;
  end: number;
  type: 'personal' | 'collaborate';
  tags: string[];
  contacts: EventParticipant[];
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface AddEventInput {
  title: string;
  start: number;
  end: number;
}

export interface EventParticipant {
  id: string;
  status: 'confirmed' | 'pending';
}

export interface UpdateEventInput {
  eventId: string;
  title?: string;
  note?: string;
  start?: number;
  end?: number;
  type?: 'personal' | 'collaborate';
  tags?: string[];
  contacts?: EventParticipant[];
}
