import React, { useState, useEffect } from 'react';
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
import LocalStorage from './redux/LocalStorage';
import ThemeConfig from './theme';
import { User } from './dto/User';

const PrivateRoute = ({
  children, auth, ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.isAuthenticated === true
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

const REACT_APP_STORAGE_NAME = 'ONE_THREAD_STATE';

/**
 * load state from local storage
 */
const loadState = () => {
  try {
    const localStorage = LocalStorage.get(REACT_APP_STORAGE_NAME);
    if (localStorage === null) {
      return undefined;
    }
    return localStorage;
  } catch (e) {
    return undefined;
  }
};

interface AuthState {
  // is auth process finished?
  isLoading: boolean

  // is user authenticated?
  isAuthenticated: boolean

  // user data
  user: User | null
}

function App() {
  // const [auth, setAuth] = useState<AuthState>(
  //   {
  //     isLoading: false,
  //     isAuthenticated: false,
  //     user: null,
  //   },
  // );

  const [auth, setAuth] = useState<AuthState>(loadState() || {
    isLoading: false,
    isAuthenticated: false,
    user: null,
  });

  // useEffect(() => {
  //   const preloadedState = loadState();
  //   setAuth(preloadedState.user);
  // }, []);

  useEffect(() => {
    console.log('sotring state', JSON.stringify(auth.user));
    LocalStorage.store(REACT_APP_STORAGE_NAME, auth.user);
  }, [auth]);

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
          <PrivateRoute path="/momo" auth={auth}>
            <DashboardLayout showHeaderBar showSideBar>
              <PageNotFound />
            </DashboardLayout>
          </PrivateRoute>
          <Route
            path="/account"
            render={() => (
              <DashboardLayout showHeaderBar showSideBar={false}>
                <Account />
              </DashboardLayout>
            )}
          />
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
