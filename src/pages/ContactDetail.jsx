import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  contactDetail: {
    display: 'block',
    height: 'fit-content',
    width: 'fit-content',
    top: '30%',
    right: '50%',
    left: '20%',
    marginTop: '15%',
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

  const toggleEditMode = () => {
    setEditModeOn(!editModeOn);
  };
  return (
    <>
      <div className={classes.contactDetail}>
        <div className={classes.editIconWrapper}>
          {!editModeOn && <EditIcon className={classes.editIcon} onClick={toggleEditMode} onKeyDown={null} role="button" tabIndex="0" />}
          {editModeOn && <ClearIcon className={classes.clearIcon} onClick={toggleEditMode} onKeyDown={null} role="button" tabIndex="0" />}
          {editModeOn && <DoneIcon className={classes.doneIcon} onClick={toggleEditMode} onKeyDown={null} role="button" tabIndex="0" />}
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
              maxLength={12}
              defaultValue="+61123456789"
              readOnly={!editModeOn}
            />
          </div>
          <div>
            <input
              type="text"
              name="occupation"
              readOnly={!editModeOn}
            />
          </div>
          <div>
            <input
              type="text"
              name="address1"
              readOnly={!editModeOn}
            />
          </div>
          <div>
            <input
              type="text"
              name="address2"
              readOnly={!editModeOn}
            />
          </div>
          <textarea rows="5" readOnly={!editModeOn} />
        </div>

      </div>
    </>
  );
};

export default ContactDetail;
