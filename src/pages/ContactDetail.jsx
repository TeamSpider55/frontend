import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'react-router-dom';

const PREFIX = 'ContactDetail';

const classes = {
  contactsButtonWrapper: `${PREFIX}-contactsButtonWrapper`,
  contactsButton: `${PREFIX}-contactsButton`,
  arrowLeftIcon: `${PREFIX}-arrowLeftIcon`,
  contactDetail: `${PREFIX}-contactDetail`,
  imgNameWrapper: `${PREFIX}-imgNameWrapper`,
  contactImgWrapper: `${PREFIX}-contactImgWrapper`,
  contactName: `${PREFIX}-contactName`,
  contactInfo: `${PREFIX}-contactInfo`,
  detailLabelWrapper: `${PREFIX}-detailLabelWrapper`,
  detailWrapper: `${PREFIX}-detailWrapper`,
  editIconWrapper: `${PREFIX}-editIconWrapper`,
  editIcon: `${PREFIX}-editIcon`,
  doneIcon: `${PREFIX}-doneIcon`,
  clearIcon: `${PREFIX}-clearIcon`,
};

const Root = styled('div')(() => ({
  [`& .${classes.contactsButtonWrapper}`]: {
    display: 'block',
    marginTop: '5%',
  },

  [`& .${classes.contactsButton}`]: {
    fontSize: '36px',
  },

  [`& .${classes.arrowLeftIcon}`]: {
    cursor: 'pointer',
    fontSize: '36px',
  },

  [`& .${classes.contactDetail}`]: {
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

  [`& .${classes.imgNameWrapper}`]: {
    display: 'flex',
    flexDirection: 'row',
  },

  [`& .${classes.contactImgWrapper}`]: {
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

  [`& .${classes.contactName}`]: {
    margin: '0 32px',
    fontWeight: 'bolder',
    fontSize: '32px',
  },

  [`& .${classes.contactInfo}`]: {
    margin: '0 32px',
    fontSize: '16px',
  },

  [`& .${classes.detailLabelWrapper}`]: {
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

  [`& .${classes.detailWrapper}`]: {
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

  [`& .${classes.editIconWrapper}`]: {
    width: '100%',
    paddingTop: '8px',
    textAlign: 'right',
  },

  [`& .${classes.editIcon}`]: {
    cursor: 'pointer',
    outline: 'none',
    marginLeft: '8px',
    marginRight: '8px',
  },

  [`& .${classes.doneIcon}`]: {
    display: 'inline-flex',
    cursor: 'pointer',
    outline: 'none',
    marginLeft: '8px',
    marginRight: '8px',
  },

  [`& .${classes.clearIcon}`]: {
    cursor: 'pointer',
    outline: 'none',
    marginLeft: '8px',
    marginRight: '8px',
  },
}));

const ContactDetail = () => {
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
    <Root>
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
    </Root>
  );
};

export default ContactDetail;
