import React, { useState, useEffect } from 'react';
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Page from '../components/Page';
import MoreMenu from '../components/MoreMenu';
import ContactListToolbar from '../components/contacts/ContactListToolbar';
import TableHeader from '../components/TableHeader';
import SearchNotFound from '../components/contacts/SearchNotFound';
import getComparator from '../util/comparator';
import { Contact } from '../dto/Contact';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  getContacts,
  getDummyContacts,
  deleteContact,
  deleteContacts,
  addContact,
} from '../redux/action/contactAction';
import Spinner from '../components/Spinner';

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
  { id: 'givenName', label: 'Name', alignRight: false },
  { id: 'organisation', label: 'Organisation', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  // { id: 'dateAdded', label: 'Date Added', alignRight: false },
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

const ContactList = () => {
  // check url for a query param indicating whether list is to be populated
  // with dummy data or not, this is used for automated testing: no flakiness!
  const { search } = useLocation();
  const isDummy = new URLSearchParams(search).get('dummy');

  // pagination, filtering, batch select and ordering config as local state
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc'|'desc'>('asc');
  const [orderBy, setOrderBy] = useState('givenName');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');

  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contact.contacts);

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

  const onDeleteContact = (id: string) => {
    if (contacts === null) return;
    dispatch(deleteContact(id));
  };

  const onDeleteContacts = (ids: string[]) => {
    if (contacts === null) return;
    dispatch(deleteContacts(ids));
    setSelected([]);
  };

  const onAddContact = () => {
    if (contacts === null) return;
    dispatch(addContact({
      email: 'email@email.com',
      givenName: '',
      familyName: '',
    }));
  };

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = () => {
    if (contacts === null) return;
    if (selected.length === 0) {
      // select all
      const newSelecteds = contacts.map((n) => n.contactId);
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

  const goToContact = (id: string) => {
    history.push(`/contacts/${id}`);
  };

  let emptyRows = null;
  let filteredContacts = null;
  if (contacts !== null) {
    filteredContacts = applySortFilter(
      contacts,
      getComparator(order, orderBy),
      filterName,
    );
    emptyRows = page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - contacts.length) : 0;
  }

  return (
    <Page title="Contacts - OneThread">
      <StyledContainer theme={theme}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingTop={4}
          paddingBottom={2}
        >
          <Typography variant="h2">
            Contacts
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            onClick={onAddContact}
            to="#"
          >
            <AddIcon />
            ADD NEW CONTACT
          </Button>
        </Box>
        <Card>
          <ContactListToolbar
            selected={selected}
            filter={filterName}
            onFilter={onFilterByName}
            deleteMany={onDeleteContacts}
          />
          {filteredContacts === null ? (
            <Spinner />
          ) : (
            <Box>
              <TableContainer>
                <Table>
                  <TableHeader
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={filteredContacts.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredContacts
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row: Contact) => {
                        const
                          {
                            contactId,
                            givenName,
                            familyName,
                            role,
                            organisation,
                          } = row;
                        const name = `${givenName} ${familyName}`;
                        const isItemSelected = selected
                          .indexOf(contactId) !== -1;

                        return (
                          <TableRow
                            hover
                            key={contactId}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, contactId)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={() => goToContact(contactId)}
                            >
                              <Box display="flex" alignItems="center">
                                <Avatar alt={name} src="#FIXME: URL" />
                                <Box
                                  component={Typography}
                                  paddingLeft={2}
                                  fontWeight="bold"
                                  noWrap
                                >
                                  {name}
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell onClick={() => goToContact(contactId)}>
                              { organisation }
                            </TableCell>
                            <TableCell onClick={() => goToContact(contactId)}>
                              { role }
                            </TableCell>
                            {/* <TableCell onClick={() => goToContact(contactId)}>
                              17 August 2021
                            </TableCell> */}
                            <TableCell align="right">
                              {/* FIXME: ADD EDIT ONE */}
                              <MoreMenu
                                id={contactId}
                                deleteOne={onDeleteContact}
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
                  {filteredContacts.length === 0 && (
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

export default ContactList;
