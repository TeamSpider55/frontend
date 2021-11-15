import React, { useState, useEffect } from 'react';
import { styled, useTheme, Theme } from '@mui/material/styles';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Card,
  Table,
  Avatar,
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
import { formatISO9075, differenceInSeconds } from 'date-fns';
import Page from '../components/Page';
import NotesListToolbar from '../components/notes/NotesListToolbar';
import getComparator from '../util/comparator';
import { Contact, Note } from '../dto/Contact';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  getContacts,
  getDummyContacts,
} from '../redux/action/contactAction';
import Spinner from '../components/Spinner';
import PlainTableHeader from '../components/PlainTableHeader';

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
  { id: '', label: 'Time', alignRight: false },
  { id: '', label: 'Content', alignRight: false },
  { id: '', label: 'Related to', alignRight: false },
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
    return array.filter((contact: Contact) => {
      const fullName = `${contact.givenName} ${contact.familyName}`
        .toLowerCase();
      return fullName.indexOf(query.toLowerCase()) !== -1;
    });
  }
  return stabilizedArray.map((el: [any, number]) => el[0]);
};

const NotesList = () => {
  // check url for a query param indicating whether list is to be populated
  // with dummy data or not, this is used for automated testing: no flakiness!
  const { search } = useLocation();
  const isDummy = new URLSearchParams(search).get('dummy');

  // pagination, filtering, batch select and ordering config as local state
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order] = useState<'asc'|'desc'>('asc');
  const [orderBy] = useState('givenName');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName] = useState('');

  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contact.contacts);
  const isLoading = useAppSelector((state) => state.contact.isLoading);

  // initialise either synchronously if using dummy data, or asynchronously
  useEffect(() => {
    if (isDummy) {
      dispatch(getDummyContacts);
    } else {
      dispatch(getContacts());
    }
  }, []);

  const theme = useTheme();
  const history = useHistory();

  const goToContact = (id: string) => {
    history.push(`/contacts/${id}`);
  };

  const handleSelectAllClick = () => {
    if (contacts === null) return;
    if (selected.length === 0) {
      // select all
      const newSelecteds = contacts.map((n: { contactId: any; }) => n.contactId);
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
  let filteredContacts = null;
  if (contacts !== null) {
    filteredContacts = applySortFilter(
      contacts,
      getComparator(order, orderBy),
      filterName,
    ).flatMap((c: Contact) => {
      if (c.note !== '') {
        return JSON.parse(c.note).map((n: any) => {
          return { ...n, relatedTo: `${c.givenName} ${c.familyName}` };
        });
      }
      return [];
    });
    filteredContacts.sort((n1: any, n2:any) => {
      return differenceInSeconds(
        new Date(n2.time),
        new Date(n1.time),
      );
    });
    emptyRows = page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - contacts.length) : 0;
  }

  return (
    <Page title="Notes - OneThread">
      <StyledContainer theme={theme}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingTop={4}
          paddingBottom={2}
        >
          <Typography variant="h2">
            Notes
          </Typography>
        </Box>
        <Card>
          <NotesListToolbar
            selected={selected}
          />
          {filteredContacts === null || isLoading ? (
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
                    rowCount={filteredContacts.length}
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredContacts
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row: Note) => {
                        const
                          {
                            time,
                            content,
                            relatedTo,
                            contactId,
                          } = row;
                        const noteId = `${time}${contactId}`;
                        const isItemSelected = selected
                          .indexOf(noteId) !== -1;

                        return (
                          <TableRow
                            hover
                            key={noteId}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, noteId)}
                                disabled
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={() => goToContact(contactId)}
                            >
                              {
                                time !== ''
                                  ? formatISO9075(
                                    new Date(time),
                                  )
                                  : '-'
                              }
                            </TableCell>
                            <TableCell onClick={() => goToContact(contactId)}>
                              { content }
                            </TableCell>
                            <TableCell onClick={() => goToContact(contactId)}>
                              <Box display="flex" alignItems="center">
                                <Avatar alt={relatedTo} src="" />
                                <Box
                                  component={Typography}
                                  paddingLeft={2}
                                  fontWeight="bold"
                                  noWrap
                                >
                                  {relatedTo}
                                </Box>
                              </Box>
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
                  {filteredContacts.length === 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          No notes found.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredContacts.length}
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

export default NotesList;
