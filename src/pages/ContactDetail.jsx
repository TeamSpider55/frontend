import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'react-router-dom';
import Page from '../components/Page';

const useStyles = makeStyles((theme) => ({
  contactsButtonWrapper: {
    display: 'block',
    marginTop: '5%',
  },
  contactsButton: {
    fontSize: '36px',
    color: theme.palette.primary.dark,
  },
  arrowLeftIcon: {
    cursor: 'pointer',
    fontSize: '36px',
  },
  contactDetail: {
    display: 'inline-block',
    height: '75%',
    width: '45%',
    top: '30%',
    right: '50%',
    left: '20%',
    marginTop: '5%',
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
    display: 'inline-block',
    left: 'auto',
    right: '0',
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(2),
    verticalAlign: 'top',
    '& input': {
      display: 'block',
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
    height: '75%',
    width: '45%',
    top: '30%',
    right: '50%',
    left: '20%',
    marginTop: '5%',
    marginLeft: '5%',
    marginBottom: theme.spacing(4),
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
    fontSize: '40px',
    color: theme.palette.primary.dark,
  },

}));

const ContactDetail = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [editModeOn, setEditModeOn] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const toggleEditMode = () => {
    setName(document.getElementById('name').value);
    setPhone(document.getElementById('phone').value);
    setOccupation(document.getElementById('occupation').value);
    setLocation(document.getElementById('location').value);
    setDescription(document.getElementById('description').value);
    setEditModeOn(true);
  };
  const editModeCancel = () => {
    document.getElementById('name').value = name;
    document.getElementById('phone').value = phone;
    document.getElementById('occupation').value = occupation;
    document.getElementById('location').value = location;
    document.getElementById('description').value = description;

    setEditModeOn(false);
  };
  const editModeConfirm = () => {
    setName(document.getElementById('name').value);
    setPhone(document.getElementById('phone').value);
    setOccupation(document.getElementById('occupation').value);
    setLocation(document.getElementById('location').value);
    setDescription(document.getElementById('description').value);
    setEditModeOn(false);
  };

  return (
    <Page title="Account - OneThread">
      <div
        className={classes.contactsButtonWrapper}
        style={{
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
          OUserSelect: 'none',
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
          {!editModeOn && <EditIcon className={classes.editIcon} onClick={toggleEditMode} onKeyDown={null} role="button" tabIndex="0" />}
          {editModeOn && <ClearIcon className={classes.clearIcon} onClick={editModeCancel} onKeyDown={null} role="button" tabIndex="0" />}
          {editModeOn && <DoneIcon className={classes.doneIcon} onClick={editModeConfirm} onKeyDown={null} role="button" tabIndex="0" />}
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
              <input
                type="text"
                name="name"
                id="name"
                defaultValue="Farhan Fauzan"
                readOnly={!editModeOn}
                spellCheck="false"
              />

            </div>
            <div className={classes.contactInfo}>
              Available for hire
            </div>
          </div>
        </div>
        <div className={classes.detailLabelWrapper}>
          <div id="detail-label-email">Email</div>
          <div id="detail-label-phone">Phone Number</div>
          <div id="detail-label-occupation">Occupation</div>
          <div id="detail-label-location">Location</div>
          <div id="detail-label-description">Description</div>
        </div>
        <div className={classes.detailWrapper}>
          <div>
            <input
              type="email"
              name="email"
              defaultValue="Example@123.com"
              readOnly={!editModeOn}
              spellCheck="false"
              style={{ boxShadow: editModeOn ? '0 0 0 1pt lightGrey' : 'none', borderRadius: editModeOn ? '5px' : '0px' }}
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              id="phone"
              maxLength={12}
              defaultValue="+61123456789"
              readOnly={!editModeOn}
              spellCheck="false"
              style={{ 'box-shadow': editModeOn ? '0 0 0 1pt lightGrey' : 'none', 'border-radius': editModeOn ? '5px' : '0px' }}
            />
          </div>
          <div>
            <input
              type="text"
              name="occupation"
              id="occupation"
              readOnly={!editModeOn}
              spellCheck="false"
              style={{ 'box-shadow': editModeOn ? '0 0 0 1pt lightGrey' : 'none', 'border-radius': editModeOn ? '5px' : '0px' }}
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              id="location"
              readOnly={!editModeOn}
              spellCheck="false"
              style={{ 'box-shadow': editModeOn ? '0 0 0 1pt lightGrey' : 'none', 'border-radius': editModeOn ? '5px' : '0px' }}
            />
          </div>
          <textarea
            id="description"
            rows="5"
            readOnly={!editModeOn}
            spellCheck="false"
            style={{ 'box-shadow': editModeOn ? '0 0 0 1pt lightGrey' : 'none', 'border-radius': editModeOn ? '5px' : '0px' }}
          />
        </div>
      </div>

      <div className={classes.contactTimeline}>
        <div>
          <div className={classes.timelineTitle}>
            Timeline
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ContactDetail;
