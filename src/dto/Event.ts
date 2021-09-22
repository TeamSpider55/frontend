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
