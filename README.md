# onethread-fe

## OneThread

This is the repository for the web interface to access **OneThread**, a personal CRM by **Team Spider55**.

Users are able to:

- register with email confirmation,  login and logout.
- view all contacts, filter by name or sort by name, date added, role, and organisation.
- add, edit, delete contact details.
- add, edit, and delete timestamped notes related to a contact.
- view all events, filter by a time range.
- invite event participants with email (only the ones that exist in contacts).

## Running the program

To run the program, at the root directory:

```_
npm install
npm start
```

## Key dependencies

- TypeScript 4.1
- Node, NPM/Yarn
- Redux: State management
- React
  - Material UI: CSS framework
  - React Router: page navigation
  - Axios: promise-based HTTP client

## Testing and deployment

To run automated integration tests with Cypress for the web interface:

```_
npm run cypress:run 
```

The OneThread application is hosted on Heroku:

https://spider55-fe.herokuapp.com

Continuous testing and deployment is set up for this repository.
