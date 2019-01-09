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
      console.log('no token');
      this.props.history.push('/login');
    } else {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
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