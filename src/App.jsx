import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import PageNotFound from './pages/PageNotFound';
import ThemeConfig from './theme';

function App() {
  return (
    <ThemeConfig>
      <Router>
        <Switch>
          <Route exact path="/">
            <DashboardLayout />
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
