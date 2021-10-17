import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'react-router-dom';
import { Input, TextField } from '@mui/material';

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
  },
  clearIcon: {
    cursor: 'pointer',
    outline: 'none',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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

  const toggleEditMode = () => {
    // setEmail(document.getElementById('email').value);
    // setName(document.getElementById('name').value);
    // setPhone(document.getElementById('phone').value);
    // setLocation(document.getElementById('location').value);
    // setRole(document.getElementById('role').value);
    // setOrganisation(document.getElementById('organisation').value);
    // setDescription(document.getElementById('description').value);
    setEditModeOn(true);
  };
  const editModeCancel = () => {
    // document.getElementById('email').value = email;
    // document.getElementById('name').value = name;
    // document.getElementById('phone').value = phone;
    // document.getElementById('location').value = location;
    // document.getElementById('role').value = role;
    // document.getElementById('organisation').value = organisation;
    // document.getElementById('description').value = description;

    setEditModeOn(false);
  };
  const editModeConfirm = () => {
    // setEmail(document.getElementById('email').value);
    // setName(document.getElementById('name').value);
    // setPhone(document.getElementById('phone').value);
    // setLocation(document.getElementById('location').value);
    // setRole(document.getElementById('role').value);
    // setOrganisation(document.getElementById('organisation').value);
    // setDescription(document.getElementById('description').value);
    setEditModeOn(false);
  };

  return (
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
          {editModeOn && <ClearIcon component={Button} className={classes.clearIcon} onClick={editModeCancel} role="button" tabIndex={0} />}
          {editModeOn && <DoneIcon component={Button} className={classes.doneIcon} onClick={editModeConfirm} role="button" tabIndex={0} />}
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
                defaultValue="Example@123.com"
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
                defaultValue="+61123456789"
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
