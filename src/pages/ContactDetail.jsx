import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  contactsButtonWrapper: {
    display: 'block',
    marginTop: '5%',
  },
  contactsButton: {
    fontSize: '36px',
  },
  arrowLeftIcon: {
    cursor: 'pointer',
    fontSize: '36px',
  },
  contactDetail: {
    display: 'block',
    height: 'fit-content',
    width: 'fit-content',
    top: '30%',
    right: '50%',
    left: '20%',
    marginTop: '5%',
    marginBottom: '32px',
    borderRadius: '5px',
    boxShadow: '0 2px 3px rgb(0 0 0 / 0.2)',
    backgroundColor: 'white',
  },
  imgNameWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  contactImgWrapper: {
    display: 'block',
    height: '144px',
    width: '144px',
    marginLeft: '48px',
    '& img': {
      height: '100%',
      width: '100%',
      borderRadius: '10px',
    },
  },
  contactName: {
    margin: '0 32px',
    fontWeight: 'bolder',
    fontSize: '32px',
  },
  contactInfo: {
    margin: '0 32px',
    fontSize: '16px',
  },
  detailLabelWrapper: {
    display: 'inline-block',
    marginLeft: '48px',
    marginTop: '24px',
    textAlign: 'right',
    '& div': {
      marginTop: '8px',
      marginBottom: '8px',
      fontWeight: 'bold',
    },
  },
  detailWrapper: {
    display: 'inline-block',
    left: 'auto',
    right: '0',
    marginTop: '24px',
    marginRight: '32px',
    marginLeft: '16px',
    verticalAlign: 'top',
    '& input': {
      fontFamily: 'Cairo',
      fontSize: '1em',
      fontWeight: 'lighter',
      border: 'none',
      padding: '0',
      marginTop: '8px',
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
      padding: '0',
      marginTop: '8px',
      resize: 'none',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  editIconWrapper: {
    width: '100%',
    paddingTop: '8px',
    textAlign: 'right',
  },
  editIcon: {
    cursor: 'pointer',
    outline: 'none',
    marginLeft: '8px',
    marginRight: '8px',
  },
  doneIcon: {
    display: 'inline-flex',
    cursor: 'pointer',
    outline: 'none',
    marginLeft: '8px',
    marginRight: '8px',
  },
  clearIcon: {
    cursor: 'pointer',
    outline: 'none',
    marginLeft: '8px',
    marginRight: '8px',
  },

}));

const ContactDetail = () => {
  const classes = useStyles();
  const [editModeOn, setEditModeOn] = useState(false);
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [description, setDescription] = useState('');

  const toggleEditMode = () => {
    setPhone(document.getElementById('phone').value);
    setOccupation(document.getElementById('occupation').value);
    setAddress1(document.getElementById('address1').value);
    setAddress2(document.getElementById('address2').value);
    setDescription(document.getElementById('description').value);
    setEditModeOn(true);
  };
  const editModeCancel = () => {
    document.getElementById('phone').value = phone;
    document.getElementById('occupation').value = occupation;
    document.getElementById('address1').value = address1;
    document.getElementById('address2').value = address2;
    document.getElementById('description').value = description;

    setEditModeOn(false);
  };
  const editModeConfirm = () => {
    setPhone(document.getElementById('phone').value);
    setOccupation(document.getElementById('occupation').value);
    setAddress1(document.getElementById('address1').value);
    setAddress2(document.getElementById('address2').value);
    setDescription(document.getElementById('description').value);
    setEditModeOn(false);
  };

  return (
    <>
      <div className={classes.contactsButtonWrapper}>
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
              src="https://images.unsplash.com/photo-1584673392125-f91e13c6a3cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Unknown"
            />
          </div>
          <div>
            <div className={classes.contactName}>
              Farhan Fauzan
            </div>
            <div className={classes.contactInfo}>
              Available for hire
            </div>
          </div>
        </div>
        <div className={classes.detailLabelWrapper}>
          <div id="detail-label-email">Email</div>
          <div id="detail-label-phone">Phone Number</div>
          <div id="detail-label-location">Occupation</div>
          <div id="detail-label-location">Address 1</div>
          <div id="detail-label-location">Address 2</div>
          <div id="detail-label-description">Description</div>
        </div>
        <div className={classes.detailWrapper}>
          <div>
            <input
              type="email"
              name="email"
              defaultValue="Example@123.com"
              readOnly={!editModeOn}
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
            />
          </div>
          <div>
            <input
              type="text"
              name="occupation"
              id="occupation"
              readOnly={!editModeOn}
            />
          </div>
          <div>
            <input
              type="text"
              name="address1"
              id="address1"
              readOnly={!editModeOn}
            />
          </div>
          <div>
            <input
              type="text"
              name="address2"
              id="address2"
              readOnly={!editModeOn}
            />
          </div>
          <textarea id="description" rows="5" readOnly={!editModeOn} />
        </div>

      </div>
    </>
  );
};

export default ContactDetail;
