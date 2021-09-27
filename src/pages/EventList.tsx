import React, { useState, useEffect } from 'react';
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Avatar,
  AvatarGroup,
  Card,
  Table,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Page from '../components/Page';
import EventService from '../services/EventService';
import MoreMenu from '../components/MoreMenu';
import EventListToolbar from '../components/events/EventListToolbar';
import TableHeader from '../components/TableHeader';
import DateSearchNotFound from '../components/events/DateSearchNotFound';
import DateSearchInvalid from '../components/events/DateSearchInvalid';
import getComparator from '../util/comparator';
import { Event, DateRange } from '../dto/Event';
import {
  DAYDATE_FORMAT,
  isValidDateRange,
  TIME_FORMAT,
} from '../util/datetime';

const StyledContainer = styled(Container)((
  {
    theme,
  }: {
    theme: Theme
  },
) => ({
  marginTop: theme.spacing(6),
}));

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'start', label: 'Time', alignRight: false },
  { id: 'contacts', label: 'Participants', alignRight: true },
];

const applySortFilter = (
  array: Event[],
  comparator: (a: Event, b: Event) => number,
  dateRange: DateRange,
) => {
  // ensure that equivalent items keep there original order, i.e. stable
  const stabilizedArray = array.map(
    (el: Event, index: number): [Event, number] => [el, index],
  );
  stabilizedArray.sort((a: [Event, number], b: [Event, number]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (dateRange) {
    // find event with dates within input range
    return array.filter((event) => {
      return new Date(event.start) >= dateRange.from
          && new Date(event.end) <= dateRange.to;
    });
  }
  return stabilizedArray.map((el: [any, number]) => el[0]);
};

const EventList = () => {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc'|'desc'>('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const now = new Date();
  const [dateRange, setDateRange] = useState<DateRange>(
    {
      from: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
    },
  );

  const [events, setEvents] = useState<Event[] | null>(null);

  const fetchEvents = async () => {
    setEvents(await EventService.getEvents());
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const theme = useTheme();

  const history = useHistory();

  const deleteEvent = (id: string) => {
    if (events === null) return;
    const newEvents = events.filter((e) => e.eventId !== id);
    setEvents(newEvents);
  };

  const deleteEvents = (ids: string[]) => {
    if (events === null) return;
    const newEvents = events?.filter((e) => !ids.includes(e.eventId));
    setEvents(newEvents);
    setSelected([]);
  };

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = () => {
    if (events === null) return;
    if (selected.length === 0) {
      // select all
      const newSelecteds = events.map((n) => n.eventId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, contactId: string) => {
    const selectedIndex = selected.indexOf(contactId);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, contactId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const onChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const goToEvent = (id: string) => {
    history.push(`/events/${id}`);
  };

  let emptyRows = null;
  let filteredEvents = null;
  if (events !== null) {
    filteredEvents = applySortFilter(
      events,
      getComparator(order, orderBy),
      dateRange,
    );
    emptyRows = page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;
  }

  return (
    <Page title="Events - OneThread">
      <StyledContainer theme={theme}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingTop={4}
          paddingBottom={2}
        >
          <Typography variant="h2">
            Schedule
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="#"
          >
            <AddIcon />
            ADD NEW EVENT
          </Button>
        </Box>
        <Card>
          <EventListToolbar
            selected={selected}
            deleteMany={deleteEvents}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          {filteredEvents === null ? (
            <Typography variant="subtitle2" noWrap>
              Loading
            </Typography>
          ) : (
            <Box>
              <TableContainer>
                <Table>
                  <TableHeader
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={filteredEvents.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredEvents
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row: Event) => {
                        const
                          {
                            eventId,
                            title,
                            start,
                            end,
                          } = row;
                        const isItemSelected = selected
                          .indexOf(eventId) !== -1;

                        return (
                          <TableRow
                            hover
                            key={eventId}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={
                                  (event) => handleClick(event, eventId)
                                }
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={() => goToEvent('1')}
                            >
                              <Box display="flex" alignItems="center">
                                <Box
                                  component={Typography}
                                  fontWeight="bold"
                                  noWrap
                                >
                                  {title}
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell onClick={() => goToEvent('1')}>
                              <Box>
                                {DAYDATE_FORMAT.format(start)}
                              </Box>
                              <Box>
                                {TIME_FORMAT.format(start)}
                                {' - '}
                                {TIME_FORMAT.format(end)}
                              </Box>
                            </TableCell>
                            <TableCell onClick={() => goToEvent('1')}>
                              {/* FIXME: hardcoded avatars and
                                  non-functioning sort
                              */}
                              <AvatarGroup max={4}>
                                <Avatar alt="Remy Sharp" />
                                <Avatar alt="Travis Howard" />
                                <Avatar alt="Cindy Baker" />
                                <Avatar alt="Agnes Walker" />
                                <Avatar alt="Trevor Henderson" />
                              </AvatarGroup>
                            </TableCell>
                            <TableCell align="right">
                              <MoreMenu
                                id={eventId}
                                deleteOne={deleteEvent}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows ? emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    ) : null}
                  </TableBody>
                  {filteredEvents.length === 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          {
                            isValidDateRange(dateRange)
                              ? <DateSearchNotFound searchQuery={dateRange} />
                              : <DateSearchInvalid />
                          }
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredEvents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
            </Box>
          )}
        </Card>
      </StyledContainer>
    </Page>
  );
};

export default EventList;
