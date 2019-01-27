import React, { Component } from 'react';
import Navbar from '../UI/Navbar';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthenticateUser';
import axios from 'axios';
import user from '../../static/images/user.png';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      filteredClients: []
    };

    this.fetchClients = this.fetchClients.bind(this);
    this.sortClients = this.sortClients.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('stylistToken');
    if(!token) {
      axios.get('/app/login');
    }

    
    
  }

  componentDidMount() {
    this.fetchClients();
    window.addEventListener('load', this.fetchClients);

  }

  componentWillUnmount() {
    if(!localStorage.getItem('stylistToken')) {
      axios.get('/app/login');
    }
    window.removeEventListener('load', this.fetchClients);
  }

  fetchClients() {
    const userId = this.props.context.userId;
    const token = localStorage.getItem('stylistToken');
    axios({
      url: `/api/v1/${userId}/clients`,
      method: 'get',
      headers: {
        Authorization: token
      }
    }).then(res => {
      const sortedClients = this.sortClients(res.data.clients);
      
      this.setState({
        clients: sortedClients,
        filteredClients: sortedClients
      });
    }).catch(err => {
      console.log(err);
    })
  }

  sortClients(clientList) {
    const sortedList = clientList.sort((a, b) => {
      const lastNameA = a.lastName.toLowerCase();
      const lastNameB = b.lastName.toLowerCase();
      const firstNameA = a.firstName.toLowerCase();
      const firstNameB = b.firstName.toLowerCase();

      let comparison = 0;

      if(lastNameA > lastNameB) {
        comparison = 1;
      } else if(lastNameA < lastNameB) {
        comparison = -1;
      }

      if(comparison === 0) {
        if(firstNameA > firstNameB) {
          comparison = 1;
        } else if(firstNameA < firstNameB) {
          comparison = -1;
        }
      }

      return comparison;
    });

    return sortedList;
  }
  
  render() {
    return (
      <div>
        <Navbar />
        <PageContainer>
          <PageTitle>Clients</PageTitle>
          <ClientContainer>
            {this.state.filteredClients.map(client => {
              return (
                <ClientCard key={client.phoneNumber}>
                  <ClientPhoto src={user} alt="User"/>
                  <ClientName>{client.firstName} {client.lastName}</ClientName>
                  <ClientPhoneNumber>{client.phoneNumber}</ClientPhoneNumber>
                  <ClientDetails>Email: {client.email || "No Email Set"}</ClientDetails>
                  <ClientDetails>Last Visit: {client.lastVisit || "Client's first visit."} </ClientDetails>
                  <ClientDetails>No Show Status: { client.noShow ? "No-Show on Record" : "OK" }</ClientDetails>
                </ClientCard>
              )
            })}
          </ClientContainer>
        </PageContainer>
        
        
      </div>
    );
  }
}

const PageContainer = styled.div`
  background: url('https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3871&q=80');
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 4em;
  margin: 25px;
  font-weight: bold;
`;

const ClientContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
`;

const ClientCard = styled.li`
  height: 400px;
  width: 22%;
  border: 1px solid black;
  margin: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  border-radius: 3px;
  background-color: rgba(215, 215, 215, 0.95);

  :hover {
    cursor: pointer;
  }
`;

const ClientPhoto = styled.img`
  height: 125px;
  width: 125px;
  margin: 10px;
  border: 1px solid black;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
`;

const ClientName = styled.h1`
  font-size: 2.5em;
  margin: 10px;
  font-weight: bold;
`;

const ClientPhoneNumber = styled.h1`
  font-size: 2em;
  margin: 10px;
`;

const ClientDetails = styled.h1`
  font-size: 1.5em;
  margin: 5px;
`;

export default Client;