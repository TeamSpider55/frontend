import React from 'react';
import { useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

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
  numSelected: number;
  filterName: string;
  onFilterName: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
}

export default function UserListToolbar({ numSelected, filterName, onFilterName }: Props) {
  const theme = useTheme();
  return (
    <Box
      component={Toolbar}
      height={96}
      display="flex"
      justifyContent="space-between"
      padding={theme.spacing(0, 1, 0, 3)}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {`${numSelected} selected`}
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
}
