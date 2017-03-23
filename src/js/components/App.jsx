import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TopBar from './nav/TopBar';
import Home from './home/Home';
import LogonData from './logons/LogonData';
import D3js from './d3js/D3js';
import { Row, Col, NavItem } from 'react-materialize';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 'Hello',
      navLinks: ['Hello', 'Map', 'D3']
    }

    this.toggleActiveNav = this.toggleActiveNav.bind(this);
  }


  toggleActiveNav (navLink) {
      this.setState({ active: navLink });
    }

  render() {

    let activeStyle = { 'color': '#C3712F', 'borderBottom': '3px solid #C3712F' };

    return (
      <Router basename={'/'}>
        <div>
          <TopBar/>
            <Row className="nav-row">
              <div className='nav-link'>
                {this.state.navLinks.map(navLink =>
                   <Link
                      to={'/' + navLink.toLowerCase()}
                      key={navLink}
                      className="nav-link"
                      style={this.state.active === navLink ? activeStyle : {}}
                      onClick={this.toggleActiveNav.bind(this, navLink)}>
                     {navLink}
                   </Link>
                )}
              </div>
            </Row>
          <Route exact path="/" component={Home}/>
          <Route path="/hello" component={Home}/>
          <Route path="/map" component={LogonData}/>
          <Route path="/d3" component={D3js} />
        </div>
      </Router>
    );
  }
};
