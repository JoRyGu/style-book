import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

class AuthenticateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: undefined,
      userFirstName: undefined,
      userLastName: undefined
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('stylistToken');

    if(!token) {
      this.props.history.push('/login');
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      console.log('Current Time:', currentTime, 'Expiration Time:', decodedToken.exp);
      if(currentTime > decodedToken.exp) {
        localStorage.removeItem('stylistToken');
        this.props.history.push('/login');
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(AuthenticateUser);