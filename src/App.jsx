import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Account from './pages/Account';
import ContactDetail from './pages/ContactDetail';
import ForgotPassword from './pages/ForgotPassword';
import ContactList from './pages/ContactList';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import ThemeConfig from './theme';

function App() {
  return (
    <ThemeConfig>
      <Router>
        <Switch>
          <Route exact path="/">
            <DashboardLayout showHeaderBar showSideBar>
              <PageNotFound />
            </DashboardLayout>
          </Route>
          <Route path="/dashboard">
            <DashboardLayout showHeaderBar showSideBar>
              <PageNotFound />
            </DashboardLayout>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/events">
            <DashboardLayout showHeaderBar showSideBar>
              <EventList />
            </DashboardLayout>
          </Route>
          <Route path="/event/1">
            <DashboardLayout showHeaderBar showSideBar>
              <EventDetail />
            </DashboardLayout>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/contacts">
            <DashboardLayout showHeaderBar showSideBar>
              <ContactList />
            </DashboardLayout>
          </Route>
          <Route exact path="/contacts/1">
            <DashboardLayout showHeaderBar showSideBar>
              <ContactDetail />
            </DashboardLayout>
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/memos">
            <DashboardLayout showHeaderBar showSideBar>
              <PageNotFound />
            </DashboardLayout>
          </Route>
          <Route path="/account">
            <DashboardLayout showHeaderBar showSideBar={false}>
              <Account />
            </DashboardLayout>
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route>
            {/* matches any other route: page for 404 error */}
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeConfig>
  );
}

export default App;
