import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Home from '../components/Home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // check to see if we have existing server-rendered data
    // sets the state if we do, otherwise initialize it to an empty state
    if (props.state) {
      this.state = props.state;
    } else {
      this.state = {
      }
    }
  }

  render() {
  return (
    <Switch>
      <Route path='/' render={(props) => (
        <Home {...props} />
      )}/>
    </Switch>
  )
}
}
