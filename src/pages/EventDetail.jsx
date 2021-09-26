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
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import CancelIcon from '@mui/icons-material/Cancel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DateTimePicker';
import ContactService from '../services/ContactService';

const useStyles = makeStyles((theme) => ({
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

const EventDetail = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [editModeOn, setEditModeOn] = useState(false);
  const [dateTime, setDateTime] = useState('01/01/1900 12:00 am');
  const [newDateTime, setNewDateTime] = useState('01/01/1900 12:00 am');
  const [description, setDescription] = useState('');

  const [participants, setParticipants] = useState([]);
  const [newParticipants, setNewParticipants] = useState([]);

  const toggleEditMode = () => {
    setDescription(document.getElementById('description').value);
    if (document.getElementById('eventDateTime')) {
      setDateTime(document.getElementById('eventDateTime').value);
      setNewDateTime(document.getElementById('eventDateTime').value);
    }
    setEditModeOn(true);
  };
  const editModeCancel = () => {
    document.getElementById('description').value = description;
    if (document.getElementById('eventDateTime')) {
      document.getElementById('eventDateTime').value = dateTime;
    }
    setNewDateTime(dateTime);
    setNewParticipants(participants);

    setEditModeOn(false);
  };
  const editModeConfirm = () => {
    setDescription(document.getElementById('description').value);
    setDateTime(newDateTime);
    setParticipants(newParticipants);
    setEditModeOn(false);
  };
  const removeEvent = () => {
    /* FIXME: functionality of cancel event button and redirect. */
  };

  const fetchParticipants = (async () => {
    /* FIXME: setParticipants(await (await fetch('')).json()); */
    const list = await ContactService.getContacts();
    setParticipants(list);
    setNewParticipants(list);
  });
  useEffect(() => {
    fetchParticipants();
  }, []);

  const deleteParticipant = (email) => {
    if (participants === null) return;
    setNewParticipants(participants.filter((c) => c.email !== email));
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
          OUserSelect: 'none',
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
            to="#"
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
            to="#"
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
            to="#"
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
            to="#"
          >
            <DoneIcon />
            CONFIRM
          </Button>
          )}
        </Box>
      </Box>
      <Box className={classes.eventDetail}>
        <Box>
          <Box className={classes.eventName}>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue="Meeting with Bean and Beanz"
              readOnly={!editModeOn}
              spellCheck="false"
            />
          </Box>
          <Box className={classes.eventDateTime}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Event Date and Time"
                value={newDateTime}
                disabled={!editModeOn}
                onChange={(newValue) => {
                  setNewDateTime(newValue);
                }}
                disablePast
                id="eventDateTime"
                inputProps={{ readOnly: true }}
              />
            </LocalizationProvider>
          </Box>
          <Box className={classes.participantTitle}>
            Participants
            <Button className={classes.inviteButton}>
              <EmailIcon className={classes.emailIcon} />
              Invite
            </Button>
          </Box>
          <Box>
            <Paper className={classes.participantScrollable}>
              {newParticipants.map((participant) => {
                const { email } = participant;
                return (
                  <Box className={classes.participantContainer}>
                    <Box display="flex">
                      <Avatar className={classes.participantAvatar} alt="avatarURL" src="#FIXME: avatarURL" />
                      <Box
                        paddingLeft={2}
                        noWrap
                      >
                        {email}
                      </Box>
                    </Box>
                    {editModeOn && (
                      <CancelIcon
                        className={classes.cancelIcon}
                        onClick={() => deleteParticipant(email)}
                      />
                    )}
                  </Box>
                );
              })}
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
          id="description"
          rows="5"
          readOnly={!editModeOn}
          spellCheck="false"
          style={{ boxShadow: editModeOn ? '0 0 0 1pt lightGrey' : 'none', borderRadius: editModeOn ? '5px' : '0px' }}
        />
      </Box>
    </>
  );
};

export default EventDetail;
