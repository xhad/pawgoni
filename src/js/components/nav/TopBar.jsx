import React from 'react';
import { Button, Card, Row, Col, Navbar, NavItem, Icon } from 'react-materialize';

export default class TopBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand='Pawgoni' right>
            {/*<NavItem href='get-started.html'>
              <Icon>search</Icon>
            </NavItem>
            <NavItem href='get-started.html'>
              <Icon>view_module</Icon>
            </NavItem>
            <NavItem href='get-started.html'>
              <Icon>refresh</Icon>
            </NavItem>
            <NavItem href='get-started.html'>
              <Icon>more_vert</Icon>
            </NavItem>*/}
        </Navbar>
      </div>
    );
  }
}

