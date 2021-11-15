import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  TextField,
  Paper,
  Avatar,
  Badge,
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
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DateTimePicker';
import Spinner from '../components/Spinner';
import ConfirmEditEventModal from '../components/events/ConfirmEditEventModal';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteEvent, getEvents, updateEvent } from '../redux/action/eventAction';
import { getContacts } from '../redux/action/contactAction';
import { EventParticipant } from '../dto/Event';

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
  participantSubTitle: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(6),
    marginBottom: theme.spacing(2),
    fontSize: '12px',
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

// const getParticipants = (event: Event, contacts: Array<Contact>) => {
//   return contacts
//     .filter((c) => event.contacts.map((x) => x.id).includes(c.contactId));
// };

const EventDetail = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [editModeOn, setEditModeOn] = useState(false);

  const [title, setTitle] = useState('');

  const [startDateTime, setStartDateTime] = useState(0);
  const [endDateTime, setEndDateTime] = useState(0);

  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [participants, setParticipants] = useState<EventParticipant[]>([]);

  // email addresses to be invited
  const [invitees, setInvitees] = useState<string[]>([]);

  // new participant is just an email: could be a user's contact or external,
  // i.e. just an email
  const [newParticipant, setNewParticipant] = useState<string | null>(null);

  // get from URL path params
  const { eventId } = useParams<{ eventId: string }>();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.event.isLoading);
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
    setEditModeOn(true);
    if (!event || !contacts) return;
    setInvitees([]);
    setTitle(event.title);
    setStartDateTime(event.start);
    setEndDateTime(event.end);
    setDescription(event.note);
    setParticipants(event.contacts);
  };

  const editModeCancel = () => {
    setEditModeOn(false);
    setInvitees([]);
    setNewParticipant(null);
  };

  const editModeConfirm = () => {
    setEditModeOn(false);
    setInvitees([]);

    dispatch(updateEvent({
      eventId,
      title,
      start: startDateTime,
      end: endDateTime,
      note: description,
      contacts: participants,
    }));
  };
  const removeEvent = () => {
    dispatch(deleteEvent(eventId));
    history.push('/events');
  };

  const addEmptyParticipant = () => {
    setNewParticipant('');
  };

  const saveNewParticipant = () => {
    if (!contacts || !newParticipant) return;
    setInvitees([...invitees, newParticipant]);
    setParticipants(
      [...participants, { id: newParticipant, status: 'pending' }],
    );
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
        <ConfirmEditEventModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title="Confirm Edit Event"
          message={
            invitees.length === 0
              ? 'Are you sure you want to update the event\'s details?'
              : `Are you sure you want to update the event's details, and send ${invitees.join(', ')} a confirmation email to this event?`
          }
          buttonText="Yes"
          buttonOnClick={() => {
            editModeConfirm();
            setIsModalOpen(false);
          }}
          secondButtonText="No"
          secondButtonOnClick={() => {
            setIsModalOpen(false);
          }}
        />
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
            onClick={removeEvent}
            style={{ marginRight: theme.spacing(1), backgroundColor: theme.palette.warning.dark }}
            disabled={isLoading}
          >
            <DeleteIcon />
            CANCEL EVENT
          </Button>
          )}
          {!editModeOn && (
          <Button
            variant="contained"
            color="primary"
            onClick={toggleEditMode}
            disabled={isLoading}
          >
            <EditIcon />
            EDIT EVENT
          </Button>
          )}
          {editModeOn && (
          <Button
            variant="contained"
            color="primary"
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
            onClick={() => setIsModalOpen(true)}
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
                    disabled
                    onChange={(newValue) => {
                      setStartDateTime(newValue as number);
                    }}
                    disablePast
                  />
                </LocalizationProvider>
              </Box>
              <Box className={classes.eventDateTime}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End"
                    value={editModeOn ? endDateTime : event.end}
                    disabled
                    onChange={(newValue) => {
                      setEndDateTime(newValue as number);
                    }}
                    disablePast
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
              <Box className={classes.participantSubTitle}>
                <Box display="flex" alignItems="center">
                  <PendingIcon
                    sx={{ width: 20, height: 20 }}
                  />
                  : Pending confirmation
                </Box>
                <Box display="flex" alignItems="center">
                  <CheckCircleIcon
                    sx={{ width: 20, height: 20 }}
                  />
                  : Confirmed
                </Box>
              </Box>
              <Box>
                <Paper className={classes.participantScrollable}>
                  {(editModeOn
                    ? participants
                    : event.contacts).map((participant) => {
                    const { id, status } = participant;
                    return (
                      <Box className={classes.participantContainer}>
                        <Box display="flex">
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            badgeContent={
                              status === 'confirmed'
                                ? (
                                  <CheckCircleIcon
                                    sx={{ width: 20, height: 20 }}
                                  />
                                ) : (
                                  <PendingIcon
                                    sx={{ width: 20, height: 20 }}
                                  />
                                )
                            }
                          >
                            <Avatar
                              className={classes.participantAvatar}
                              alt={id}
                              src="dummy"
                            />
                          </Badge>
                          <Box
                            paddingLeft={2}
                          >
                            {id}
                          </Box>
                        </Box>
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

export default EventDetail;
