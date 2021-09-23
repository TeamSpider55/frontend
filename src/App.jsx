import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import HeaderBarLayout from './layouts/HeaderBarLayout';
import Account from './pages/Account';
import ContactDetail from './pages/ContactDetail';
import ForgotPassword from './pages/ForgotPassword';
import ContactList from './pages/ContactList';
import EventList from './pages/EventList';
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
            <DashboardLayout>
              <PageNotFound />
            </DashboardLayout>
          </Route>
          <Route path="/dashboard">
            <DashboardLayout>
              <PageNotFound />
            </DashboardLayout>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/events">
            <DashboardLayout>
              <EventList />
            </DashboardLayout>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/contacts">
            <DashboardLayout>
              <ContactList />
            </DashboardLayout>
          </Route>
          <Route exact path="/contacts/1">
            <DashboardLayout>
              <ContactDetail />
            </DashboardLayout>
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/memos">
            <DashboardLayout>
              <PageNotFound />
            </DashboardLayout>
          </Route>
          <Route path="/account">
            <HeaderBarLayout />
            <Account />
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
