import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MiniDrawer from './components/Sidebar';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MiniDrawer />
        </Route>
        <Route>
          {/* matches any other route: page for 404 error */}
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
