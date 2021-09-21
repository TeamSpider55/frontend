import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import HeaderBarLayout from './layouts/HeaderBarLayout';
import Account from './pages/Account';
import ContactDetail from './pages/ContactDetail';
import PageNotFound from './pages/PageNotFound';
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
          <Route path="/account">
            <HeaderBarLayout>
              <Account />
            </HeaderBarLayout>
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
