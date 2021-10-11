import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Account from './pages/Account';
import ContactDetail from './pages/ContactDetail';
import ForgotPassword from './pages/ForgotPassword';
import ContactList from './pages/ContactList';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import ThemeConfig from './theme';
import { useAppSelector } from './redux/store';

const PrivateRoute = ({
  children, ...rest
}: any) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user
          ? children
          : (
            <Redirect to={{
              pathname: '/login',
              state: { from: location },
            }}
            />
          );
      }}
    />
  );
};

function App() {
  return (
    <ThemeConfig>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <DashboardLayout showHeaderBar showSideBar>
                <Dashboard />
              </DashboardLayout>
            )}
          />
          <Route
            path="/dashboard"
            render={() => (
              <DashboardLayout showHeaderBar showSideBar>
                <Dashboard />
              </DashboardLayout>
            )}
          />
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/events">
            <DashboardLayout showHeaderBar showSideBar>
              <EventList />
            </DashboardLayout>
          </Route>
          <Route exact path="/events/:eventId">
            <DashboardLayout showHeaderBar showSideBar>
              <EventDetail />
            </DashboardLayout>
          </Route>
          <Route
            path="/login"
            render={() => <Login />}
          />
          <Route exact path="/contacts">
            <DashboardLayout showHeaderBar showSideBar>
              <ContactList />
            </DashboardLayout>
          </Route>
          <Route exact path="/contacts/:contactId">
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
          <PrivateRoute path="/momo">
            <DashboardLayout showHeaderBar showSideBar>
              ASDJSALKDj
            </DashboardLayout>
          </PrivateRoute>
          <PrivateRoute path="/account">
            <DashboardLayout showHeaderBar showSideBar={false}>
              <Account />
            </DashboardLayout>
          </PrivateRoute>
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
