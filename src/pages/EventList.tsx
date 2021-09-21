import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Card,
  Table,
  Avatar,
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
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Page from '../components/Page';
import EventService from '../services/EventService';
import MoreMenu from '../components/MoreMenu';
import SearchBar from '../components/SearchBar';
import TableHeader from '../components/contacts/TableHeader';
import SearchNotFound from '../components/SearchNotFound';
import getComparator from '../util/comparator';
import { Event } from '../dto/Event';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
}));

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'contacts', label: 'Participants', alignRight: false },
];

const applySortFilter = (array: any, comparator: any, query: string) => {
  // ensure that equivalent items keep there original order, i.e. stable
  const stabilizedArray = array.map((el: any, index: number) => [el, index]);
  stabilizedArray.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter((event: Event) => {
      return event.title.indexOf(query.toLowerCase()) !== -1;
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

  const [events, setEvents] = useState<Event[] | null>(null);
  const [filterName, setFilterName] = useState('');

  const fetchEvents = async () => {
    setEvents(await EventService.getEvents());
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const theme = useTheme();
  const classes = useStyles(theme);
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

  const onFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const onChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const goToEvent = (id: string) => {
    history.push(`/event/${id}`);
  };

  let emptyRows = null;
  let filteredEvents = null;
  if (events !== null) {
    filteredEvents = applySortFilter(
      events,
      getComparator(order, orderBy),
      filterName,
    );
    emptyRows = page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;
  }

  return (
    <Page title="Schedule - OneThread">
      <Container className={classes.root}>
        <Typography variant="h2">
          Schedule
        </Typography>
        <Box textAlign="right" paddingY={2}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="#"
          >
            Add New Event
          </Button>
        </Box>
        <Card>
          <SearchBar
            selected={selected}
            filter={filterName}
            onFilter={onFilterByName}
            deleteMany={deleteEvents}
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
                            contacts,
                          } = row;
                        const isItemSelected = selected.indexOf(eventId) !== -1;

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
                              onClick={() => goToEvent('1')}
                            >
                              <Box display="flex" alignItems="center">
                                <Box
                                  component={Typography}
                                  paddingLeft={2}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                  >
                                    {title}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell onClick={() => goToEvent('1')}>
                              Apple
                            </TableCell>
                            <TableCell onClick={() => goToEvent('1')}>
                              Software Engineer
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
                          <SearchNotFound searchQuery={filterName} />
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
      </Container>
    </Page>
  );
};

export default EventList;
