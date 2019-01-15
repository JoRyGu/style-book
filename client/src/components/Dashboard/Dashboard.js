import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../UI/Navbar';
import dateFns from 'date-fns';
import styled from 'styled-components';

class Dashboard extends React.Component {
  constructor({props}) {
    super(props);

    this.state = {};

    this.getDate = this.getDate.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('stylistToken');

    if(!token) {
      this.props.history.push('/app/login');
    }
  }

  getDate() {
    return dateFns.format(new Date(), 'dddd, MMMM D, YYYY'); 
  }

  render() {
    return (
      <DashboardContainer>
        <Navbar></Navbar>
        <h1>{this.getDate()}</h1>
      </DashboardContainer>
    )
  }
}

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  height: 100vh;

  & > nav {
    grid-row: 1 / span 1;
    grid-column: 1 / span 13;
  }

  & > h1 {
    grid-row: 2 / span 1;
    grid-column: 1 / span 2;
    align-self: center;
    justify-self: center;
    font-size: 2.4rem;
  }
`;

export default withRouter(Dashboard);