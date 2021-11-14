import React, { useState, useEffect } from 'react';
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import {
  Avatar,
  AvatarGroup,
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import addHours from 'date-fns/addHours';
import Page from '../components/Page';
import MoreMenu from '../components/MoreMenu';
import EventListToolbar from '../components/events/EventListToolbar';
import PlainTableHeader from '../components/PlainTableHeader';
import Spinner from '../components/Spinner';
import DateSearchNotFound from '../components/events/DateSearchNotFound';
import DateSearchInvalid from '../components/events/DateSearchInvalid';
import AddEventModal from '../components/events/AddEventModal';
import MessageModal from '../components/MessageModal';
import getComparator from '../util/comparator';
import { Event, DateRange } from '../dto/Event';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  DAYDATE_FORMAT,
  isValidDateRange,
  TIME_FORMAT,
} from '../util/datetime';
import {
  getDummyEvents,
  getEvents,
  deleteEvent,
  deleteEvents,
  addEvent,
} from '../redux/action/eventAction';

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
  // check url for a query param indicating whether list is to be populated
  // with dummy data or not, this is used for automated testing: no flakiness!
  const { search } = useLocation();
  const isDummy = new URLSearchParams(search).get('dummy');

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order] = useState<'asc'|'desc'>('asc');
  const [orderBy] = useState('title');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.event.events);

  const now = new Date();
  const [dateRange, setDateRange] = useState<DateRange>(
    {
      from: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
    },
  );

  const [newEventDateTime, setNewEventDateTime] = useState<DateRange>(
    {
      from: new Date(),
      to: addHours(new Date(), 1),
    },
  );

  // initialise either synchronously if using dummy data, or asynchronously
  useEffect(() => {
    if (isDummy) {
      dispatch(getDummyEvents);
    } else {
      dispatch(getEvents());
    }
  }, []);

  const theme = useTheme();
  const history = useHistory();

  const goToEvent = (id: string) => {
    history.push(`/events/${id}`);
  };

  const onDeleteEvent = (id: string) => {
    if (events === null) return;
    dispatch(deleteEvent(id));
  };

  const onDeleteEvents = (ids: string[]) => {
    if (events === null) return;
    dispatch(deleteEvents(ids));
    setSelected([]);
  };

  const onEditEvent = (id: string) => {
    if (events === null) return;
    goToEvent(id);
  };

  const onAddEvent = () => {
    if (events === null) return;
    dispatch(addEvent({
      title: 'new event',
      start: newEventDateTime.from.getTime(),
      end: newEventDateTime.to.getTime(),
    })).then((newEventId) => {
      if (newEventId !== null) {
        if (newEventId === '') {
          setIsErrorModalOpen(true);
        } else {
          goToEvent(newEventId);
        }
      }
    });
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
        <MessageModal
          isModalOpen={isErrorModalOpen}
          setIsModalOpen={setIsErrorModalOpen}
          title="Failed to add event"
          message="Ensure events do not overlap!"
          buttonText="OK"
          buttonOnClick={() => setIsErrorModalOpen(false)}
        />
        <AddEventModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          newEventDateTime={newEventDateTime}
          setNewEventDateTime={setNewEventDateTime}
          buttonOnClick={() => {
            if (events === null) return;
            onAddEvent();
            setIsModalOpen(false);
          }}
        />
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
            onClick={() => setIsModalOpen(true)}
            disabled={events === null}
          >
            <AddIcon />
            ADD NEW EVENT
          </Button>
        </Box>
        <Box marginBottom={theme.spacing(2)}>
          Only events stored 30 days before and 100 days after today will be
          accessible through this interface.
        </Box>
        <Card>
          <EventListToolbar
            selected={selected}
            deleteMany={onDeleteEvents}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          {filteredEvents === null ? (
            <Box sx={{
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingY: theme.spacing(5),
            }}
            >
              <Spinner dark />
            </Box>
          ) : (
            <Box>
              <TableContainer>
                <Table>
                  <PlainTableHeader
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={filteredEvents.length}
                    numSelected={selected.length}
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
                            contacts,
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
                                onChange={(event) => handleClick(event, eventId)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={() => goToEvent(eventId)}
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
                            <TableCell onClick={() => goToEvent(eventId)}>
                              <Box>
                                {DAYDATE_FORMAT.format(start)}
                              </Box>
                              <Box>
                                {TIME_FORMAT.format(start)}
                                {' - '}
                                {TIME_FORMAT.format(end)}
                              </Box>
                            </TableCell>
                            <TableCell onClick={() => goToEvent(eventId)}>
                              <AvatarGroup max={4}>
                                {
                                  contacts.map((c) => (
                                    <Avatar alt={c.id} key={c.id} />
                                  ))
                                }
                              </AvatarGroup>
                            </TableCell>
                            <TableCell align="right">
                              <MoreMenu
                                id={eventId}
                                deleteOne={onDeleteEvent}
                                editOne={onEditEvent}
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
