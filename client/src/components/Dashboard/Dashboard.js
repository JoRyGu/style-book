import React from 'react';
import { withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const token = localStorage.getItem('stylistToken');

    if(!token) {
      this.props.history.push('/login');
    }
  }

  render() {
    return <div>I'm the dashboard!</div>
  }
}

export default withRouter(Dashboard);