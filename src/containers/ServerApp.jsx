import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router';
import database from 'firebase-database';

export default class ServerApp extends React.Component {
  constructor(props) {
    super(props);
    database.initializeApp(props.appConfig);
  }

  render() {
    return (
      <StaticRouter location={this.props.url} context={this.props.context}>
      </StaticRouter>
    );
  }
}
