import React from 'react'
import ReactDOM from 'react-dom'
import GoogleContacts from 'react-google-contacts'

const responseCallback = (response) => {
  console.log(response)
}

//This will render the button that will let us import contacts via cookies to our database.

ReactDOM.render(
  <GoogleContacts
    clientId='429632624144-40js6mbas4r3tmjursoco68eoum0a24v.apps.googleusercontent.com'
    buttonText='Import'
    onSuccess={responseCallback}
    onFailure={responseCallback}
  />,
  document.getElementById('googleButton')
)
