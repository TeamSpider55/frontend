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
  selected: string[];
  filter: string;
  onFilter: React.ChangeEventHandler<HTMLInputElement |
    HTMLTextAreaElement> | undefined;
  deleteMany(ids: string[]): void;
}

const SearchBar = (
  {
    selected,
    filter,
    onFilter,
    deleteMany,
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
        <SearchStyle
          value={filter}
          onChange={onFilter}
          placeholder="Search..."
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )}
        />
      )}

      {selected.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => deleteMany(selected)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
};

export default SearchBar;
