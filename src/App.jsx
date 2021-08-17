import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" />
        <Route>
          {/* matches any other route: page for 404 error */}
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
