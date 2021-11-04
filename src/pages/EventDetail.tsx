import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  TextField,
  Paper,
  Avatar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link, useParams, useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DateTimePicker';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteEvent, getEvents, updateEvent } from '../redux/action/eventAction';
import { getContacts } from '../redux/action/contactAction';
import { Contact } from '../dto/Contact';
import { Event } from '../dto/Event';

const useStyles = makeStyles((theme: any) => ({
  eventButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(8),
    // paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(5),
  },
  eventsButton: {
    fontSize: '36px',
    marginLeft: theme.spacing(3),
    paddingRight: theme.spacing(4),
    color: theme.palette.primary.dark,
  },
  arrowLeftIcon: {
    cursor: 'pointer',
    fontSize: '36px',
  },
  eventDetail: {
    display: 'inline-block',
    height: '75%',
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
  eventName: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(4),
    '& input': {
      fontWeight: 'bolder',
      fontSize: '24px',
      fontFamily: 'Cairo',
      border: 'none',
      width: '90%',
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
  eventDateTime: {
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  eventDescription: {
    display: 'inline-block',
    verticalAlign: 'top',
    height: '75%',
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
    '& textarea': {
      fontFamily: 'Cairo',
      fontSize: '1em',
      fontWeight: 'lighter',
      border: 'none',
      height: '65%',
      width: '80%',
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(6),
      padding: theme.spacing(0),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      lineHeight: 'unset',
      resize: 'none',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  descriptionTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    fontWeight: 'bolder',
    fontSize: '24px',
    color: theme.palette.common.black,
  },
  participantTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(6),
    fontWeight: 'bolder',
    fontSize: '16px',
    color: theme.palette.common.black,
  },
  inviteButton: {
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  emailIcon: {
    height: '16px',
    width: '16px',
  },
  cancelIcon: {
    height: '16px',
    width: '16px',
    color: 'black',
  },
  participantAvatar: {
    height: '32px',
    width: '32px',
  },
  participantContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(7),
    marginBottom: theme.spacing(1),
  },
  participantScrollable: {
    maxHeight: '192px',
    overflow: 'auto',
    boxShadow: 'none',
    marginBottom: theme.spacing(16),
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

const getParticipants = (event: Event, contacts: Array<Contact>) => {
  return contacts.filter((c) => event.contacts.includes(c.contactId));
};

const EventDetail = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [editModeOn, setEditModeOn] = useState(false);

  const [title, setTitle] = useState('');

  const [startDateTime, setStartDateTime] = useState(0);
  // const [newStartDateTime, setNewStartDateTime] = useState(currentDateTime);
  const [endDateTime, setEndDateTime] = useState(0);
  // const [newEndDateTime, setNewEndDateTime] = useState(currentDateTime);

  // assuming note in the backend is description
  const [description, setDescription] = useState('');

  const [participants, setParticipants] = useState<Contact[]>([]);
  // const [newParticipants, setNewParticipants] = useState<Contact[]>([]);

  const [newParticipant, setNewParticipant] = useState<string | null>(null);

  // get from URL path params
  const { eventId } = useParams<{ eventId: string }>();

  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => {
    return state.event.events?.find((e) => e.eventId === eventId);
  });
  const contacts = useAppSelector((state) => state.contact.contacts);
  const history = useHistory();

  // fetch data from store to initialise
  useEffect(() => {
    dispatch(getEvents());
    dispatch(getContacts());
  }, []);

  const toggleEditMode = () => {
    if (!event || !contacts) return;
    setTitle(event.title);
    setStartDateTime(event.start);
    setEndDateTime(event.end);
    setDescription(event.note);
    setParticipants(getParticipants(event, contacts));

    // setDescription(document.getElementById('description').value);
    // if (document.getElementById('eventStartDateTime')) {
    //   setStartDateTime(document.getElementById('eventStartDateTime').value);
    //   setNewStartDateTime(document.getElementById('eventStartDateTime').value);
    // }
    // if (document.getElementById('eventEndDateTime')) {
    //   setEndDateTime(document.getElementById('eventEndDateTime').value);
    //   setNewEndDateTime(document.getElementById('eventEndDateTime').value);
    // }
    setEditModeOn(true);
  };
  const editModeCancel = () => {
    // document.getElementById('description').value = description;
    // if (document.getElementById('eventStartDateTime')) {
    //   document.getElementById('eventStartDateTime').value = startDateTime;
    // }
    // if (document.getElementById('eventEndDateTime')) {
    //   document.getElementById('eventEndDateTime').value = endDateTime;
    // }
    // setNewStartDateTime(startDateTime);
    // setNewEndDateTime(endDateTime);
    // setNewParticipants(participants);

    setEditModeOn(false);
    setNewParticipant(null);
  };
  const editModeConfirm = () => {
    // setDescription(document.getElementById('description').value);
    // setStartDateTime(newStartDateTime);
    // setEndDateTime(newEndDateTime);
    // setParticipants(newParticipants);

    setEditModeOn(false);

    dispatch(updateEvent({
      eventId,
      title,
      start: startDateTime,
      end: endDateTime,
      note: description,
      contacts: participants.map((p) => p.contactId),
    }));
  };
  const removeEvent = () => {
    /* FIXME: functionality of cancel event button and redirect. */
    dispatch(deleteEvent(eventId));
    history.push('/events');
  };

  // const fetchParticipants = (async () => {
  //   /* FIXME: setParticipants(await (await fetch('')).json()); */
  //   const list = await ContactService.getContacts();
  //   setParticipants(list);
  //   setNewParticipants(list);
  // });
  // useEffect(() => {
  //   fetchParticipants();
  // }, []);

  const deleteParticipant = (email: string) => {
    if (participants === null) return;
    // setNewParticipants(participants.filter((c) => c.email !== email));
    setParticipants(participants.filter((c) => c.email !== email));
  };

  // const addParticipant = (id: string) => {
  //   setParticipants([...participants, id]);
  // };

  const addEmptyParticipant = () => {
    // setParticipants([...participants, '3']);
    // console.log(participants);
    setNewParticipant('');
  };

  // FIXME:
  const saveNewParticipant = () => {
    if (!contacts || !newParticipant) return;
    const contact = contacts.find((c) => c.email === newParticipant);
    if (contact !== undefined) {
      setParticipants([...participants, contact]);
    }
    setNewParticipant(null);
  };

  return (
    <>
      <Box
        className={classes.eventButtonsContainer}
        style={{
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
        }}
      >
        <Link to="/events">
          <Button className={classes.eventsButton}>
            <ArrowLeftIcon className={classes.arrowLeftIcon} />
            Schedule
          </Button>
        </Link>
        <Box>
          {!editModeOn && (
          <Button
            variant="contained"
            color="primary"
            /* FIXME: add components */
            onClick={removeEvent}
            style={{ marginRight: theme.spacing(1), backgroundColor: theme.palette.warning.dark }}
          >
            <DeleteIcon />
            CANCEL EVENT
          </Button>
          )}
          {!editModeOn && (
          <Button
            variant="contained"
            color="primary"
            /* FIXME: add components */
            onClick={toggleEditMode}
          >
            <EditIcon />
            EDIT EVENT
          </Button>
          )}
          {editModeOn && (
          <Button
            variant="contained"
            color="primary"
            /* FIXME: add components */
            onClick={editModeCancel}
            style={{ marginRight: theme.spacing(1), backgroundColor: theme.palette.error.dark }}
          >
            <ClearIcon />
            CANCEL
          </Button>
          )}
          {editModeOn && (
          <Button
            variant="contained"
            color="primary"
            /* FIXME: add components */
            onClick={editModeConfirm}
            style={{ backgroundColor: theme.palette.success.dark }}
          >
            <DoneIcon />
            CONFIRM
          </Button>
          )}
        </Box>
      </Box>
      {
      event && contacts ? (
        <>
          <Box className={classes.eventDetail}>
            <Box>
              <Box className={classes.eventName}>
                <Input
                  type="text"
                  value={editModeOn ? title : event.title}
                  disableUnderline={!editModeOn}
                  readOnly={!editModeOn}
                  spellCheck="false"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box className={classes.eventDateTime}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start"
                    value={editModeOn ? startDateTime : event.start}
                    disabled={!editModeOn}
                    onChange={(newValue) => {
                      setStartDateTime(newValue as number);
                    }}
                    disablePast
                    // id="eventStartDateTime"
                    // inputProps={{ readOnly: true }}
                  />
                </LocalizationProvider>
              </Box>
              <Box className={classes.eventDateTime}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End"
                    value={editModeOn ? endDateTime : event.end}
                    disabled={!editModeOn}
                    onChange={(newValue) => {
                      setEndDateTime(newValue as number);
                    }}
                    disablePast
                    // id="eventEndDateTime"
                    // inputProps={{ readOnly: true }}
                  />
                </LocalizationProvider>
              </Box>
              <Box className={classes.participantTitle}>
                Participants
                <Button
                  className={classes.inviteButton}
                  disabled={!editModeOn}
                  onClick={addEmptyParticipant}
                >
                  <EmailIcon className={classes.emailIcon} />
                  Invite
                </Button>
              </Box>
              <Box>
                <Paper className={classes.participantScrollable}>
                  {(editModeOn
                    ? participants
                    : getParticipants(event, contacts)).map((participant) => {
                    const { email } = participant;
                    return (
                      <Box className={classes.participantContainer}>
                        <Box display="flex">
                          <Avatar className={classes.participantAvatar} alt={participant.givenName} src="/#FIXME: avatarURL" />
                          <Box
                            paddingLeft={2}
                          >
                            {email}
                          </Box>
                        </Box>
                        {editModeOn && (
                          <Button
                            onClick={() => deleteParticipant(email)}
                          >
                            <CancelIcon
                              className={classes.cancelIcon}
                            />
                          </Button>
                        )}
                      </Box>
                    );
                  })}
                  {
                    newParticipant !== null
                      ? (
                        <Box className={classes.participantContainer}>
                          <TextField
                            variant="outlined"
                            value={newParticipant}
                            onChange={(e) => setNewParticipant(e.target.value)}
                          />
                          <Button
                            onClick={saveNewParticipant}
                          >
                            <CheckIcon />
                          </Button>
                        </Box>
                      ) : null
                  }
                </Paper>
              </Box>
            </Box>
          </Box>

          <Box className={classes.eventDescription}>
            <Box>
              <Box className={classes.descriptionTitle}>
                Description
              </Box>
            </Box>
            <textarea
              rows={5}
              readOnly={!editModeOn}
              value={editModeOn ? description : event.note}
              onChange={(e) => setDescription(e.target.value)}
              spellCheck="false"
              style={{ boxShadow: editModeOn ? '0 0 0 1pt lightGrey' : 'none', borderRadius: editModeOn ? '5px' : '0px' }}
            />
          </Box>
        </>
      ) : <Box>LOADING</Box>
      }
    </>
  );
};

export default EventDetail;
