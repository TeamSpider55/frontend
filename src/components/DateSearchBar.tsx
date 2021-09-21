import React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '& fieldset': {
    borderWidth: '1px !important',
    borderColor: `${theme.palette.grey} !important`,
  },
}));

interface Props {
  selected: string[];
  filter: string;
  onFilter: React.ChangeEventHandler<HTMLInputElement |
    HTMLTextAreaElement> | undefined;
  deleteMany(ids: string[]): void;
}

const DatePickerBar = (
  {
    selected,
    filter,
    onFilter,
    deleteMany,
  }: Props,
) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(null);

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
        <Box display="flex" justifyContent="space-evenly">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="To "
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
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

export default DatePickerBar;
