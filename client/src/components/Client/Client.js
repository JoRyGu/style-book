import React, { Component } from 'react';
import Navbar from '../UI/Navbar';
import Button from '../UI/Button';
import NewClient from './NewClient';

import styled from 'styled-components';
import dateFns from 'date-fns';
import { AuthContext } from '../Authentication/AuthenticateUser';
import axios from 'axios';
import user from '../../static/images/user.png';
import { cookie } from 'express-validator/check';


class Client extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    if(sessionStorage.getItem('clientState')) {
      this.state = JSON.parse(sessionStorage.getItem('clientState'));
    } else {
      this.state = {
      clients: [],
      filteredClients: [],
      newClientVisible: false,
      stylistId: this.props.context.userId
      };
    }

    

    this.fetchClients = this.fetchClients.bind(this);
    this.sortClients = this.sortClients.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewClientClick = this.handleNewClientClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleNewClientCreated = this.handleNewClientCreated.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('stylistToken');
    if(!token) {
      axios.get('/app/login');
    }
  }

  componentDidMount() {
    const userId = this.state.stylistId;
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
      }, () => {
        sessionStorage.setItem('clientState', JSON.stringify(this.state));
      });
    }).catch(err => {
      console.log(err);
    })
  }

  componentWillUnmount() {
    if(!localStorage.getItem('stylistToken')) {
      axios.get('/app/login');
    }
    
  }

  fetchClients() {
    const userId = this.state.stylistId;
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
      }, () => {
        sessionStorage.setItem('clientState', JSON.stringify(this.state));
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

  handleChange(e) {
    const filteredClients = this.state.clients.filter(client => {
      const clientName = `${client.firstName.toLowerCase()} ${client.lastName.toLowerCase()}`;
      return clientName.includes(e.target.value.toLowerCase()) || 
             client.phoneNumber.includes(e.target.value.toLowerCase()) ||
             (client.email && client.email.toLowerCase().includes(e.target.value.toLowerCase()));
    });

    this.setState({
      filteredClients
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleNewClientClick() {
    this.setState({
      newClientVisible: true
    })
  }

  handleCancelClick() {
    this.setState({
      newClientVisible: false
    })
  }

  handleNewClientCreated() {
    this.setState({
      newClientVisible: false
    });
    this.fetchClients();
  }

  render() {
    return (
      <div>
        { this.state.newClientVisible ? 
        <NewClient 
          handleCancelClick={this.handleCancelClick}
          handleClientCreated={this.handleNewClientCreated}
          context={this.props.context} 
          fetch={this.fetchClients}
          emailErr={this.state.emailErr} 
          firstNameErr={this.state.firstNameErr}
          lastNameErr={this.state.lastNameErr}
          /> 
        : null }
        <Navbar />
        <PageContainer>
          <PageTitle>Clients</PageTitle>
          <SearchDiv onSubmit={this.handleSubmit}>
            <ClientSearch placeholder="Search Clients" onChange={this.handleChange} />
            <SearchButton>
              <img src="https://img.icons8.com/material/24/000000/search.png" alt="search" />
            </SearchButton>
          </SearchDiv>
          <Button red onClick={this.handleNewClientClick} >Add New Client</Button>

          <ClientContainer>
          
            {this.state.filteredClients.map(client => {
              return (
                <ClientCard key={client.phoneNumber}>
                  <ClientPhoto src={user} alt="User"/>
                  <ClientName>{client.firstName} {client.lastName}</ClientName>
                  <ClientPhoneNumber>{`(${client.phoneNumber.split('').slice(0, 3).join('')}) ${client.phoneNumber.split('').slice(3, 6).join('')}-${client.phoneNumber.split('').slice(6).join('')}`}</ClientPhoneNumber>
                  <ClientDetails>Email: {client.email || "No Email Set"}</ClientDetails>
                  <ClientDetails>Last Visit: {client.lastVisit ? dateFns.format(client.lastVisit, 'dddd, MMMM D, YYYY') : "Client's first visit."} </ClientDetails>
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
  background: url('https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2671&q=80');
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  > button {
    width: 200px;
    margin: 20px 0 10px 0;
  }
`;

const PageTitle = styled.h1`
  font-size: 4em;
  margin: 25px;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
`;

const SearchDiv = styled.form`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ClientSearch = styled.input`
  border: 1px solid black;
  border-width: 1px 0 1px 1px;
  font-size: 2em;
  width: 20%;
  padding: 0 10px 0 10px;
  border-radius: 5px 0 0 5px;
`;

const SearchButton = styled.button`
  border-radius: 0 5px 5px 0;
  height: 31.5px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  width: 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
  }
`;

const ClientContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
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