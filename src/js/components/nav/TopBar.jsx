import React from 'react';
import { Button, Card, Row, Col, Navbar, NavItem, Icon } from 'react-materialize';

export default class TopBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="logo" brand='pawgoni' right />
      </div>
    );
  }
};
