export interface Event {
  eventId: string;
  title: string;
  note: string;
  start: number;
  end: number;
  type: 'personal' | 'collaborate';
  tags: string[];
  contacts: string[];
}

export interface DateRange {
  from: Date;
  to: Date
}

export interface AddEventInput {
  title: string;
  start: number;
  end: number;
}

export interface UpdateEventInput {
  eventId: string;
  title?: string;
  note?: string;
  start?: number;
  end?: number;
  type?: 'personal' | 'collaborate';
  tags?: string[];
  contacts?: string[];
}
