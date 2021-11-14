import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AddIcon from '@mui/icons-material/Add';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Card, Avatar, Input } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import formatISO9075 from 'date-fns/formatISO9075';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteContact, getContacts, updateContact } from '../redux/action/contactAction';
import { Note } from '../dto/Contact';
import Spinner from '../components/Spinner';

const useStyles = makeStyles((theme: any) => ({
  contactsButtonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(8),
    paddingRight: theme.spacing(4),
  },
  contactsButton: {
    fontSize: '36px',
    marginLeft: theme.spacing(3),
    paddingRight: theme.spacing(4),
    color: theme.palette.primary.dark,
  },
  arrowLeftIcon: {
    cursor: 'pointer',
    fontSize: '36px',
  },
  contactDetail: {
    display: 'inline-block',
    minHeight: '80%',
    width: '45%',
    top: '30%',
    right: '50%',
    left: '20%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(4),
    borderRadius: '5px',
    boxShadow: '0 2px 3px rgb(0 0 0 / 0.2)',
    backgroundColor: theme.palette.background.default,
  },
  imgNameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(4),
  },
  contactImgWrapper: {
    display: 'block',
    height: '144px',
    width: '144px',
    marginLeft: theme.spacing(6),
    '& img': {
      height: '100%',
      borderRadius: '10px',
    },
  },
  contactName: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    '& input': {
      fontWeight: 'bolder',
      fontSize: '32px',
      fontFamily: 'Cairo',
      border: 'none',
      width: '75%',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      padding: theme.spacing(0),
      lineHeight: 'unset',
      resize: 'none',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  contactInfo: {
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(4),
    fontSize: '16px',
  },
  detailLabelWrapper: {
    display: 'inline-block',
    marginLeft: theme.spacing(11),
    marginTop: theme.spacing(3),
    textAlign: 'right',
    '& div': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontWeight: 'bold',
    },
  },
  detailWrapper: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(4),
    '& input': {
      border: 'none',
      width: '100%',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    '& textarea': {
      fontFamily: 'Cairo',
      fontSize: '1em',
      fontWeight: 'lighter',
      border: 'none',
      width: '100%',
      padding: theme.spacing(0),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      lineHeight: 'unset',
      resize: 'none',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  editIconWrapper: {
    width: '100%',
    paddingTop: theme.spacing(1),
    textAlign: 'right',
  },
  editIcon: {
    cursor: 'pointer',
    outline: 'none',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.primary.dark,
  },
  doneIcon: {
    display: 'inline-flex',
    cursor: 'pointer',
    outline: 'none',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.primary.dark,
  },
  clearIcon: {
    cursor: 'pointer',
    outline: 'none',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.primary.dark,
  },
  contactTimeline: {
    display: 'inline-block',
    verticalAlign: 'top',
    minHeight: '80%',
    width: '45%',
    top: '30%',
    right: '50%',
    left: '20%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(7),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(4),
    borderRadius: '5px',
    boxShadow: '0 2px 3px rgb(0 0 0 / 0.2)',
    backgroundColor: theme.palette.background.default,
  },
  timelineTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    fontWeight: 'bolder',
    fontSize: '32px',
    color: theme.palette.primary.dark,
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.2em',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
    },
  },
}));

const getContactNotes = (contact: any): Array<Note> => {
  let result: Array<Note>;
  try {
    result = JSON.parse(contact.note) as Array<Note>;
  } catch {
    result = [];
  }
  return result;
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  fontWeight: 'bold',
  paddingRight: '1rem',
};

const editModeShadow = (editModeOn: boolean) => ({
  width: '100%',
  boxShadow: editModeOn ? '0 0 0 1pt lightGrey' : 'none',
  borderRadius: editModeOn ? '3px' : '0px',
});

const ContactDetail = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const history = useHistory();

  const [editModeOn, setEditModeOn] = useState(false);

  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [nickName, setNickName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState<Array<Note>>([]);

  const addNote = () => {
    const time = formatISO9075(new Date());
    const idx = notes.findIndex((n: Note) => n.time === time);
    if (idx !== -1) return;
    setNotes([...notes, {
      time,
      content: ' ',
    }]);
  };

  const editNote = (time: string, content: string) => {
    const idx = notes.findIndex((n: Note) => n.time === time);
    setNotes(notes.map((note: Note, i: number) => {
      if (i === idx) {
        return {
          time,
          content,
        };
      }
      return note;
    }));
  };

  const deleteNote = (time: string) => {
    setNotes([...notes.filter((note) => note.time !== time)]);
  };

  // check url for a path param indicating which contact is to be fetched
  const { contactId } = useParams<{ contactId: string }>();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const contact = useAppSelector((state) => {
    return state.contact.contacts?.find((c) => c.contactId === contactId);
  });

  // fetch data from store to initialise
  useEffect(() => {
    dispatch(getContacts());
  }, []);

  const toggleEditMode = () => {
    setEditModeOn(true);

    if (!contact) return;
    setEmail(contact.email);
    setGivenName(contact.givenName);
    setMiddleName(contact.middleName);
    setFamilyName(contact.familyName);
    setNickName(contact.nickName);
    setPhone(contact.phone);
    setAddress(contact.address);
    setRole(contact.role);
    setOrganisation(contact.organisation);
    setDescription(contact.description);
    setNotes(getContactNotes(contact));
  };

  const onDeleteContact = () => {
    dispatch(deleteContact(contactId));
    history.push('/contacts');
  };

  const editModeCancel = () => {
    setEditModeOn(false);
  };

  const editModeConfirm = () => {
    setEditModeOn(false);

    dispatch(updateContact({
      contactId,
      email,
      givenName,
      middleName,
      familyName,
      nickName,
      phone,
      address,
      role,
      organisation,
      description,
      note: JSON.stringify(notes),
    }));
  };

  return (
    <>
      {
        contact ? (
          <>
            <div
              className={classes.contactsButtonWrapper}
              style={{
                MozUserSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
              }}
            >
              <Link to="/contacts">
                <Button className={classes.contactsButton}>
                  <ArrowLeftIcon className={classes.arrowLeftIcon} />
                  Contacts
                </Button>
              </Link>
              <Box>
                {!editModeOn && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onDeleteContact}
                    style={{
                      marginRight: theme.spacing(1),
                      backgroundColor: theme.palette.warning.dark,
                    }}
                  >
                    <DeleteIcon />
                    DELETE CONTACT
                  </Button>
                )}
                {!editModeOn && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleEditMode}
                >
                  <EditIcon />
                  EDIT CONTACT
                </Button>
                )}
                {editModeOn && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={editModeCancel}
                  style={{
                    marginRight: theme.spacing(1),
                    backgroundColor: theme.palette.error.dark,
                  }}
                  disabled={isLoading}
                >
                  <ClearIcon />
                  CANCEL
                </Button>
                )}
                {editModeOn && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={editModeConfirm}
                  style={{ backgroundColor: theme.palette.success.dark }}
                  disabled={isLoading}
                >
                  <DoneIcon />
                  CONFIRM
                </Button>
                )}
              </Box>
            </div>
            <div className={classes.contactDetail}>
              <div className={classes.imgNameWrapper}>
                <div className={classes.contactImgWrapper}>
                  <Avatar
                    src="/fix-this-url-later.jpg"
                    alt={contact.givenName}
                    variant="rounded"
                    sx={{
                      height: '144px',
                      width: '144px',
                    }}
                  />
                </div>
                <div>
                  <div className={classes.contactName}>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={
                        contact.nickName !== ''
                          ? contact.nickName
                          : `${contact.givenName} ${contact.familyName}`
                      }
                      disableUnderline
                      readOnly
                      spellCheck="false"
                    />
                  </div>
                  <div className={classes.contactInfo}>
                    Added on
                    {' '}
                    <strong>
                      {
                      contact.dateAdded !== ''
                        ? formatISO9075(
                          new Date(contact.dateAdded),
                        )
                        : 'unknown date'
                      }
                    </strong>
                  </div>
                </div>
              </div>
              <div className={classes.detailWrapper}>
                <Grid container rowSpacing={1}>
                  <Grid item xs={5} sx={labelStyle}>Given Name</Grid>
                  <Grid item xs={7}>
                    <Input
                      value={editModeOn ? givenName : contact.givenName}
                      onChange={(e) => setGivenName(e.target.value)}
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={editModeShadow(editModeOn)}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Middle Name</Grid>
                  <Grid item xs={7}>
                    <Input
                      value={editModeOn ? middleName : contact.middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={editModeShadow(editModeOn)}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Family Name</Grid>
                  <Grid item xs={7}>
                    <Input
                      value={editModeOn ? familyName : contact.familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={editModeShadow(editModeOn)}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Nickname</Grid>
                  <Grid item xs={7}>
                    <Input
                      value={editModeOn ? nickName : contact.nickName}
                      onChange={(e) => setNickName(e.target.value)}
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={editModeShadow(editModeOn)}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Email</Grid>
                  <Grid item xs={7}>
                    <Input
                      type="email"
                      value={editModeOn ? email : contact.email}
                      onChange={(e) => setEmail(e.target.value)}
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={editModeShadow(editModeOn)}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Phone Number</Grid>
                  <Grid item xs={7}>
                    <Input
                      type="tel"
                      // maxLength={12}
                      value={editModeOn ? phone : contact.phone}
                      disableUnderline
                      onChange={(e) => setPhone(e.target.value)}
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={{ ...editModeShadow(editModeOn) }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Role</Grid>
                  <Grid item xs={7}>
                    <Input
                      value={editModeOn ? role : contact.role}
                      onChange={(e) => setRole(e.target.value)}
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={editModeShadow(editModeOn)}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Organisation</Grid>
                  <Grid item xs={7}>
                    <Input
                      value={editModeOn ? organisation : contact.organisation}
                      onChange={(e) => setOrganisation(e.target.value)}
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={editModeShadow(editModeOn)}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Address</Grid>
                  <Grid item xs={7}>
                    <Input
                      value={editModeOn ? address : contact.address}
                      onChange={(e) => setAddress(e.target.value)}
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={editModeShadow(editModeOn)}
                    />
                  </Grid>
                  <Grid item xs={5} sx={{ ...labelStyle, alignItems: 'start' }}>
                    Description
                  </Grid>
                  <Grid item xs={7}>
                    <textarea
                      rows={5}
                      readOnly={!editModeOn}
                      value={editModeOn ? description : contact.description}
                      onChange={(e) => setDescription(e.target.value)}
                      spellCheck="false"
                      style={{ ...editModeShadow(editModeOn) }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className={classes.contactTimeline}>
              <div>
                <div className={classes.timelineTitle}>
                  Timeline
                </div>
              </div>
              <div>
                {
                  (editModeOn
                    ? notes
                    : getContactNotes(contact)
                  ).map((n: Note) => {
                    return (
                      <Card sx={{
                        backgroundColor: theme.palette.grey[200],
                        marginX: theme.spacing(4),
                        padding: theme.spacing(2),
                        marginY: theme.spacing(2),
                        borderRadius: '5px',
                        boxShadow: '0 2px 3px rgb(0 0 0 / 0.2)',
                      }}
                      >
                        <Box sx={{ display: 'flex' }}>
                          <Box display="inline" sx={{ fontWeight: 'bold' }}>
                            {n.time}
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexGrow: 1,
                              justifyContent: 'right',
                            }}
                          >
                            {
                              editModeOn && (
                                <Button
                                  color="error"
                                  onClick={() => deleteNote(n.time)}
                                >
                                  <ClearIcon />
                                </Button>
                              )
                            }
                          </Box>
                        </Box>
                        <Box marginTop={theme.spacing(1)}>
                          <textarea
                            readOnly={!editModeOn}
                            value={editModeOn
                              ? n.content
                              : getContactNotes(contact).find(
                                (note: Note) => note.time === n.time,
                              )?.content}
                            onChange={(e) => editNote(
                              n.time, e.target.value,
                            )}
                            spellCheck="false"
                            style={{
                              ...editModeShadow(editModeOn),
                              fontFamily: 'Cairo',
                              fontSize: '1em',
                              fontWeight: 'lighter',
                              backgroundColor: (
                                editModeOn
                                  ? 'white'
                                  : theme.palette.grey[200]
                              ),
                              border: 'none',
                              width: '100%',
                              padding: theme.spacing(0),
                              paddingLeft: theme.spacing(1),
                              paddingRight: theme.spacing(1),
                              lineHeight: 'unset',
                              resize: 'none',
                              outline: 'none',
                            }}
                          />
                        </Box>
                      </Card>
                    );
                  })
                }
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    sx={{ marginY: theme.spacing(2) }}
                    variant="contained"
                    color="primary"
                    disabled={!editModeOn}
                    onClick={addNote}
                  >
                    <AddIcon />
                    &nbsp;
                    ADD NOTE
                  </Button>
                </Box>
              </div>
            </div>
          </>
        ) : (
          <Box sx={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Spinner dark />
          </Box>
        )
      }
    </>
  );
};

export default ContactDetail;
