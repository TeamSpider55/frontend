import React, { useState } from 'react';
import '../css/contact-detail.css';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

function ContactDetail() {
  const [editModeOn, setEditModeOn] = useState(false);
  const toggleEditMode = () => {
    setEditModeOn(!editModeOn);
  };
  return (
    <>
      <div className="contact-detail">
        <div className="edit-icon-wrapper">
          {!editModeOn && <EditIcon className="edit-icon" onClick={toggleEditMode} onKeyDown={null} role="button" tabIndex="0" />}
          {editModeOn && <DoneIcon className="done-icon" onClick={toggleEditMode} onKeyDown={null} role="button" tabIndex="0" />}
          {editModeOn && <ClearIcon className="clear-icon" onClick={toggleEditMode} onKeyDown={null} role="button" tabIndex="0" />}
        </div>
        <div className="contact-img-wrapper">
          <img
            src="https://images.unsplash.com/photo-1584673392125-f91e13c6a3cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Unknown"
          />
        </div>
        <div className="name-info-wrapper">
          <h2 id="contact-name">
            Farhan Fauzan
          </h2>
          <h6 id="contact-info">
            Available for hire
          </h6>
        </div>
        <div className="detail-wrapper">
          <h4 id="detail-email">Email</h4>
          <h4 id="detail-phone">Phone Number</h4>
          <h4 id="detail-location">Location</h4>
          <h4 id="detail-description">Description</h4>
        </div>
      </div>
    </>
  );
}

export default ContactDetail;
