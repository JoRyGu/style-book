import React, { Component } from 'react';
import Navbar from '../UI/Navbar';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

class ClientProfile extends Component {
  constructor(props) {
    super(props);
    this.sessionStylist = sessionStorage.getItem('clientState') ? JSON.parse(sessionStorage.getItem('clientState')).stylistId : null;
    this.authedStylist = localStorage.getItem('stylistToken') ? jwtDecode(localStorage.getItem('stylistToken')).id : null;

    if(this.sessionStylist && this.authedStylist && (this.sessionStylist === this.authedStylist)) {
      this.state = {
        stylistId: this.authedStylist,
        client: null
      }
    } else {
      this.state = {
        stylistId: null
      };
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('stylistToken');
    axios({
      url: `/api/v1/${this.state.stylistId}/clients/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        Authorization: token
      }
    }).then(client => {
      this.setState({
        client: client.data
      });
    }).catch(err => {
      console.log(err);
    })
  }
  
  render() {
    return (
      <div>
        <Navbar />
        <h1>{this.state.client.firstName} {this.state.client.lastName}</h1>
      </div>
    )
  }
}

export default ClientProfile;