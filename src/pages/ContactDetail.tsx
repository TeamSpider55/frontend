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
import { Link, useParams } from 'react-router-dom';
import { Input } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getContacts, updateContact } from '../redux/action/contactAction';

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
      marginTop: theme.spacing(1),
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

const LinkBackToContactList = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Link to="/contacts">
      <Button className={classes.contactsButton}>
        <ArrowLeftIcon className={classes.arrowLeftIcon} />
        Contacts
      </Button>
    </Link>
  );
};

const ContactDetail = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [editModeOn, setEditModeOn] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [description, setDescription] = useState('');

  // check url for a path param indicating which contact is to be fetched
  const { contactId } = useParams<{ contactId: string }>();

  const dispatch = useAppDispatch();
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
  };
  const editModeCancel = () => {
    setEditModeOn(false);
  };
  const editModeConfirm = () => {
    setEditModeOn(false);

    dispatch(updateContact({
      contactId,
      email,
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
            </div>
            <div className={classes.contactDetail}>
              <div className={classes.editIconWrapper}>
                {
                  !editModeOn && (
                    <Button
                      className={classes.editIcon}
                      onClick={toggleEditMode}
                    >
                      <EditIcon />
                    </Button>
                  )
                }
                {
                  editModeOn && (
                    <>
                      <Button
                        className={classes.clearIcon}
                        onClick={editModeCancel}
                      >
                        <ClearIcon />
                      </Button>
                      <Button
                        className={classes.doneIcon}
                        onClick={editModeConfirm}
                      >
                        <DoneIcon />
                      </Button>
                    </>
                  )
                }
              </div>
              <div className={classes.imgNameWrapper}>
                <div className={classes.contactImgWrapper}>
                  <img
                    src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                    alt="Unknown"
                    height="144px"
                    width="144px"
                  />
                </div>
                <div>
                  <div className={classes.contactName}>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue="Farhan Fauzan"
                      disableUnderline={!editModeOn}
                      readOnly={!editModeOn}
                      spellCheck="false"
                    />
                  </div>
                  <div className={classes.contactInfo}>
                    Available for hire
                  </div>
                </div>
              </div>
              <div className={classes.detailWrapper}>
                <Grid container rowSpacing={1}>
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
                      value={contact.phone}
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={{ ...editModeShadow(editModeOn) }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Role</Grid>
                  <Grid item xs={7}>
                    <Input
                      defaultValue="ROLE"
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={{ ...editModeShadow(editModeOn) }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Organisation</Grid>
                  <Grid item xs={7}>
                    <Input
                      defaultValue="ORG"
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={{ ...editModeShadow(editModeOn) }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={labelStyle}>Location</Grid>
                  <Grid item xs={7}>
                    <Input
                      defaultValue="LOCATION"
                      disableUnderline
                      readOnly={!editModeOn}
                      spellCheck="false"
                      sx={{ ...editModeShadow(editModeOn) }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={{ ...labelStyle, alignItems: 'start' }}>
                    Description
                  </Grid>
                  <Grid item xs={7}>
                    <textarea
                      rows={5}
                      readOnly={!editModeOn}
                      spellCheck="false"
                      style={{ ...editModeShadow(editModeOn) }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </>
        ) : <Box>asdfjasd</Box>
        // FIXME: when contact not found?
      }

      <div className={classes.contactTimeline}>
        <div>
          <div className={classes.timelineTitle}>
            Timeline
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetail;
