import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Contacts from './pages/Contacts';
import PageNotFound from './pages/PageNotFound';
import ContactDetail from './components/contact-detail';
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
          <Route path="/calendar">
            <DashboardLayout>
              <PageNotFound />
            </DashboardLayout>
          </Route>
          <Route path="/contacts">
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
