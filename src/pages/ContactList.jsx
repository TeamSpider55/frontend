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
import ContactService from '../services/ContactService';

// const USERLIST = [...Array(24)].map(() => ({
//   id: 'asdasd12312',
//   avatarUrl: 'www.google.com',
//   name: 'Name',
//   company: 'Company',
//   isVerified: true,
//   status: 'active',
//   role: 'Full Stack Developer',
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
}));

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const ContactList = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [contacts, setContacts] = useState(null);

  useEffect(async () => {
    setContacts(await ContactService.getContacts());
  }, []);

  const theme = useTheme();
  const classes = useStyles(theme);
  const history = useHistory();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - contacts.length) : 0;

  const filteredContacts = contacts;

  return (
    <Page title="Contacts - OneThread">
      <Container className={classes.root}>
        <Typography variant="h2" className={classes.pageTitle}>
          Contacts
        </Typography>
        <Box textAlign="right" paddingY={2}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="#"
          >
            New User
          </Button>
        </Box>

        <Card>
          {filteredContacts === null ? (
            <Typography variant="subtitle2" noWrap>
              Loading
            </Typography>
          ) : (
            <Box>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableBody>
                    {filteredContacts
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row) => {
                        const
                          {
                            contactId,
                            nickName,
                            givenName,
                            middleName,
                            familyName,
                            email,
                            phone,
                            address,
                          } = row;
                        const name = `${givenName} ${familyName}`;
                        const isItemSelected = selected.indexOf(name) !== -1;

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
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell>
                            <Box onClick={() => history.push('/contacts/1')}>
                              <TableCell
                                component="th"
                                scope="row"
                              >
                                <Box display="flex" alignItems="center">
                                  <Avatar alt={name} src="#FIXME: URL" />
                                  <Box
                                    component={Typography}
                                    variant="subtitle2"
                                    noWrap
                                    paddingLeft={2}
                                  >
                                    {name}
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell align="left">Apple</TableCell>
                              <TableCell align="left">Software Engineer</TableCell>
                              <TableCell align="left">17 August 2021</TableCell>
                            </Box>
                            <TableCell align="right">
                              <Button>
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {filteredContacts.length === 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          {/* <SearchNotFound searchQuery={filterName} /> */}
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
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          )}
        </Card>
      </Container>
    </Page>
  );
};

export default ContactList;
