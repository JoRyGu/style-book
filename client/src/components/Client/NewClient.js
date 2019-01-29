import React, { Component } from 'react';
import Button from '../UI/Button';
import styled from 'styled-components';
import user from '../../static/images/user.png';
import axios from 'axios';

class NewClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      stylistId: this.props.context.userId,
      firstNameErr: null,
      lastNameErr: null,
      phoneNumberErr: null
    }
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({ stylistId: this.props.context.userId });
  }

  async handleFormSubmission() {
    const token = localStorage.getItem('stylistToken');

    try {
      const res = await axios({
        method: 'post',
        url: `/api/v1/${this.state.stylistId}/clients`,
        headers: {
          Authorization: token
        },
        data: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email,
          stylistId: this.state.stylistId
        }
      });

      this.props.handleClientCreated();
      
    } catch (e) {
      
      this.setState({
        phoneNumberErr: e.response.data.phoneNumber,
        firstNameErr: e.response.data.firstName,
        lastNameErr: e.response.data.lastName
      });
    }

    
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <NewClientContainer>
        <TopDiv>
          <StyledForm action="post" id="newClient" >
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" onChange={this.handleChange} />
            { this.state.firstNameErr ? <ErrorMessage>{ this.state.firstNameErr }</ErrorMessage> : null }
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" onChange={this.handleChange} />
            { this.state.lastNameErr ? <ErrorMessage>{ this.state.lastNameErr }</ErrorMessage> : null }
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" name="phoneNumber" onChange={this.handleChange} />
            { this.state.phoneNumberErr ? <ErrorMessage>{ this.state.phoneNumberErr }</ErrorMessage> : null }
            <label htmlFor="email">Email Address</label>
            <input type="text" name="email" onChange={this.handleChange} />
          </StyledForm>
          <PhotoDiv>
            <UserPhoto src={user} />
            <Button>Add Photo</Button>
          </PhotoDiv>
          
        </TopDiv>

        <ButtonDiv>
          <Button red onClick={this.props.handleCancelClick}>Cancel</Button>
          <Button onClick={this.handleFormSubmission}>Add Client</Button>
        </ButtonDiv>
      </NewClientContainer>
    )
  }
}

const NewClientContainer = styled.div`
  height: 450px;
  width: 40%;
  padding-top: 20px;
  background: rgb(215, 215, 215);
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -20%;
  margin-top: -275px;
`;

const TopDiv = styled.div`
  display: flex;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 350px;
  justify-content: center;

  label {
    font-size: 2.2em;
    margin: 20px 0 0 30px;
    font-weight: bold;
  }

  input {
    font-size: 2em;
    padding: 2px 10px;
    margin: 2px 0 0 30px;
  }
`;

const PhotoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  bottom: 25px;

  button {
    margin: 10px 20px;
  }
`;

const UserPhoto = styled.img`
  height: 150px;
  width: 150px;
  border: 1px solid black;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.4rem;
  margin-left: 35px;
`;

export default NewClient;