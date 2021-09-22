import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import enAuLocale from 'date-fns/locale/en-AU';

import { DateRange } from '../../dto/Event';

interface Props {
  selected: string[];
  deleteMany(ids: string[]): void;
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

const EventListToolbar = (
  {
    selected,
    deleteMany,
    dateRange,
    setDateRange,
  }: Props,
) => {
  const theme = useTheme();

  return (
    <Box
      component={Toolbar}
      height={96}
      display="flex"
      justifyContent="space-between"
      padding={theme.spacing(0, 1, 0, 3)}
    >
      {selected.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {`${selected.length} selected`}
        </Typography>
      ) : (
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            locale={enAuLocale}
          >
            <DatePicker
              label="From"
              value={dateRange.from}
              onChange={(newFromDate) => {
                if (newFromDate) {
                  setDateRange({ to: dateRange.to, from: newFromDate });
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Box marginRight={theme.spacing(2)} />
            <DatePicker
              label="To "
              value={dateRange.to}
              onChange={(newToDate) => {
                if (newToDate) {
                  setDateRange({ to: newToDate, from: dateRange.from });
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      )}

      {selected.length > 0 ? (
        // FIXME: label this button Cancel event and change the icon
        <Box>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => deleteMany(selected)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : null}
    </Box>
  );
};

export default EventListToolbar;
