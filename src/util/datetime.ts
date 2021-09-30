import { parse, isValid } from 'date-fns';
import { enAU } from 'date-fns/locale';
import { DateRange } from '../dto/Event';

export const DATETIME_FORMAT = new Intl.DateTimeFormat(
  'en-AU',
  {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
);

export const DAYDATE_FORMAT = new Intl.DateTimeFormat(
  'en-AU',
  {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    weekday: 'short',
  },
);

export const DATE_FORMAT = new Intl.DateTimeFormat(
  'en-AU',
  {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
);

export const TIME_FORMAT = new Intl.DateTimeFormat(
  'en-AU',
  {
    hour: '2-digit',
    minute: '2-digit',
  },
);

export const isValidDate = (day: number, month: number, year: number) => {
  const parsed = parse(
    `${day}/${month}/${year}`, 'P',
    new Date(),
    { locale: enAU },
  );
  return isValid(parsed);
};

export const isValidDateRange = (dateRange: DateRange) => {
  try {
    DATETIME_FORMAT.format(dateRange.from);
    DATETIME_FORMAT.format(dateRange.to);
  } catch {
    return false;
  }

  return isValid(dateRange.from) && isValid(dateRange.to)
    && new Date(dateRange.from) <= new Date(dateRange.to);
};
