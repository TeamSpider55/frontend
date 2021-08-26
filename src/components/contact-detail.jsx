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
          {editModeOn && <ClearIcon className="clear-icon" onClick={toggleEditMode} onKeyDown={null} role="button" tabIndex="0" />}
          {editModeOn && <DoneIcon className="done-icon" onClick={toggleEditMode} onKeyDown={null} role="button" tabIndex="0" />}
        </div>
        <div className="img-name-wrapper">
          <div className="contact-img-wrapper">
            <img
              src="https://images.unsplash.com/photo-1584673392125-f91e13c6a3cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Unknown"
            />
          </div>
          <div className="name-info-wrapper">
            <div id="contact-name">
              Farhan Fauzan
            </div>
            <div id="contact-info">
              Available for hire
            </div>
          </div>
        </div>
        <div className="detail-label-wrapper">
          <div id="detail-label-email">Email</div>
          <div id="detail-label-phone">Phone Number</div>
          <div id="detail-label-location">Address 1</div>
          <div id="detail-label-location">Address 2</div>
          <div id="detail-label-location">Address 3</div>
          <div id="detail-label-description">Description</div>
        </div>
        <div className="detail-wrapper">
          <div>
            <input
              type="email"
              name="email"
              id="detail-email"
              defaultValue="Example@123.com"
              readOnly={!editModeOn}
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              id="detail-phone"
              maxLength={12}
              defaultValue="+61123456789"
              readOnly={!editModeOn}
            />
          </div>
          <div>
            <input
              type="text"
              name="address1"
              id="detail-address1"
              readOnly={!editModeOn}
            />
          </div>
          <div>
            <input
              type="text"
              name="address2"
              id="detail-address2"
              readOnly={!editModeOn}
            />
          </div>
          <div>
            <input
              type="text"
              name="address3"
              id="detail-address3"
              readOnly={!editModeOn}
            />
          </div>
          <textarea className="detail-description-wrapper" rows="5" readOnly={!editModeOn} />
        </div>

      </div>
    </>
  );
}

export default ContactDetail;
