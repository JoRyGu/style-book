import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../Authentication/AuthenticateUser';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    }

    this.printNames = this.printNames.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  printNames() {
    return this.context.userFirstName;
  }

  logOut() {
    this.setState({ menuOpen: false });
    this.toggleMenu();
    localStorage.removeItem('stylistToken');
    window.location.reload();
  }

  toggleMenu() {
    const toggleDiv = document.querySelector('.fa-caret-down');
    const menu = document.querySelector('.menu');
    const openMenu = `
      transform: rotate(-180deg);
    `;

    const closeMenu = `
      transform: none;
    `;

    const openLogout = `
      height: 2.5rem;
      visibility: visible;
    `;

    const closeLogout = `
      height: 0;
    `;

    if(!this.state.menuOpen) {
      toggleDiv.style = openMenu;
      menu.style = openLogout;
      this.setState({ menuOpen: true });
    } else {
      toggleDiv.style = closeMenu;
      menu.style = closeLogout;
      this.setState({ menuOpen: false });
    }
  }

  render() {
    let value = this.context;
    
    return (
      <StyledNav>
        <Link to={`/dashboard`} className="logo">
          <Logo>SB</Logo>
        </Link>
        <Link to={`/dashboard/clients`}>
          <NavIcon className="fas fa-user" />
          <NavText>Clients</NavText>
        </Link>
        <NavIcon className="far fa-calendar-alt">
          <NavText>Appointments</NavText>
        </NavIcon>
        <NavIcon className="fas fa-dollar-sign">
          <NavText>Services</NavText>
        </NavIcon>
        <UserDiv onClick={ this.toggleMenu } >
          <UserName>{ `${value.userFirstName} ${value.userLastName}` }</UserName>
          <DropDown className="fas fa-caret-down"></DropDown>
        </UserDiv>
        <Menu className="menu">
          <LogOut onClick={ this.logOut }>Log Out</LogOut>
        </Menu>
      </StyledNav>
    )
  }
}
// Play with media queries to make more responsive
const StyledNav = styled.nav`
  height: 6rem;
  background: #2e2f30;
  color: #FFFFFF;
  display: grid;
  grid-template-columns: repeat(22, 1fr);
  grid-template-rows: repeat(2, 6rem);

  & > a {
    color: white;
    text-decoration: none;
    justify-self: center;
    align-self: center;
  }

  & > .logo {
    grid-column: 1 / span 2;
  }



  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(9, 1fr);
  }
`;

const Logo = styled.h1`
  font-size: 5rem;
`;

const NavIcon = styled.i`
  font-size: 3rem;
  justify-self: center;
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  & > p {
    font-family: Philosopher;
  }

  &:hover {
    cursor: pointer;
  }
`;

const NavText = styled.p`
  font-size: 1.4rem;
  margin-top: 0.4rem;
`;

const UserDiv = styled.div`
  grid-column-start: 20;
  grid-column-end: 23;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const UserName = styled.h2`
  font-size: 1.6rem;
  margin: 3px;
`;

const DropDown = styled.span`
  font-size: 2rem;
  margin: 10px;
  transition: transform 250ms ease-in;
`;

const Menu = styled.div`
  grid-column: 20 / span 3;
  grid-row: 2 / span 1;
  width: 200px;
  background: #2e2f30;
  justify-self: center;
  align-items: center;
  height: 0;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  transition: height 250ms ease-in, visibility 250ms ease-in;
  visibility: hidden;

  & > h2 {
    font-size: 2rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const LogOut = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Navbar;