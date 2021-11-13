import React from 'react';
import {
  Modal, Box, Button, Typography, TextField, Alert,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import enAuLocale from 'date-fns/locale/en-AU';
import { useTheme } from '@mui/material/styles';
import isAfter from 'date-fns/isAfter';
import setDayOfYear from 'date-fns/setDayOfYear';
import getDayOfYear from 'date-fns/getDayOfYear';
import setHours from 'date-fns/setHours';
import getHours from 'date-fns/getHours';
import setMinutes from 'date-fns/setMinutes';
import getMinutes from 'date-fns/getMinutes';
import { DateRange } from '../../dto/Event';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonOnClick: () => void;
  newEventDateTime: DateRange;
  setNewEventDateTime: React.Dispatch<React.SetStateAction<DateRange>>,
}

const AddEventModal = ({
  isModalOpen,
  setIsModalOpen,
  buttonOnClick,
  newEventDateTime,
  setNewEventDateTime,
}: Props) => {
  const theme = useTheme();

  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '4px',
        pt: 2,
        px: 4,
        pb: 3,
      }}
      >
        <Typography variant="h6" component="h2">
          Add event
        </Typography>
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          marginY={2}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={enAuLocale}>
            <DatePicker
              label="Event Date"
              value={newEventDateTime.from}
              onChange={(newDate) => {
                if (newDate) {
                  setNewEventDateTime({
                    from: setDayOfYear(
                      newEventDateTime.from,
                      getDayOfYear(newDate),
                    ),
                    to: setDayOfYear(
                      newEventDateTime.to,
                      getDayOfYear(newDate),
                    ),
                  });
                }
              }}
              renderInput={(params) => <TextField {...params} />}
              disablePast
            />
            <TimePicker
              label="Start time"
              value={newEventDateTime.from}
              onChange={(newValue) => {
                if (newValue) {
                  setNewEventDateTime({
                    from: setMinutes(
                      setHours(newEventDateTime.from, getHours(newValue)),
                      getMinutes(newValue),
                    ),
                    to: newEventDateTime.to,
                  });
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End time"
              value={newEventDateTime.to}
              onChange={(newValue) => {
                if (newValue) {
                  setNewEventDateTime({
                    from: newEventDateTime.from,
                    to: setMinutes(
                      setHours(newEventDateTime.to, getHours(newValue)),
                      getMinutes(newValue),
                    ),
                  });
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        {
          isAfter(newEventDateTime.from, newEventDateTime.to)
            ? (
              <Alert
                severity="error"
                sx={{ marginBottom: theme.spacing(4) }}
              >
                Start time must be before end time.
              </Alert>
            )
            : null
        }
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Button
            onClick={buttonOnClick}
            variant="contained"
          >
            Add Event
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEventModal;
