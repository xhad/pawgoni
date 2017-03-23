import 'babel-polyfill';
import React from 'react';
import TopBar from './nav/TopBar';
import LogonData from './logons/LogonData';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <TopBar />
        <LogonData />
      </div>
    );
  }
}


