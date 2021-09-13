import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ContactDetail from './pages/ContactDetail';
import ContactList from './pages/ContactList';
import PageNotFound from './pages/PageNotFound';
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
          <Route path="/calendar">
            <DashboardLayout>
              <PageNotFound />
            </DashboardLayout>
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
          <Route path="/memos">
            <DashboardLayout>
              <PageNotFound />
            </DashboardLayout>
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
