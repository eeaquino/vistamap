import React, { Component } from 'react';
import {  Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Fa } from 'mdbreact';
import '../CSS/menu.css';
class MapNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.onClick = this.onClick.bind(this);
    }


onClick(){
  this.setState({
      collapse: !this.state.collapse,
    });
}
render() {
    return(
        
        <Navbar dark expand="md" scrolling fixed="top">
          <NavbarBrand href="/">
              <strong>Vista, CA</strong>
          </NavbarBrand>
          <NavbarToggler onClick={ this.onClick } />
          <Collapse isOpen = { this.state.collapse } navbar>
            <NavbarNav left>
              <NavItem >
                 <NavLink to="/Food" onClick={() =>this.props.changeLocation('Food')}><Fa icon="cutlery"/> Food</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink to="/Parks"  onClick={() =>this.props.changeLocation('parks')}><Fa icon="bed"/> Parks</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink to="/Gas"  onClick={() =>this.props.changeLocation('Gas')}><Fa icon="car"/>Gas</NavLink>
              </NavItem>
             
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <NavLink to="#" onClick={() =>this.props.openSearch()}><Fa icon="search" /></NavLink>
                
              </NavItem>
    <NavItem>
                
    </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
    );
  }
}

export default MapNavBar;

