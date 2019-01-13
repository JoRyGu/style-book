import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import onClickOutside from 'react-onclickoutside';
import Button from './Button';
import { StyledInput, StyledLabel, ErrorMessage } from './SignInForm';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      firstNameErr: undefined,
      lastNameErr: undefined,
      emailErr: undefined,
      passwordErr: undefined,
      confirmPasswordErr: undefined
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Add sign-in functionality
  async handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios({
        method: 'post',
        url: '/api/v1/signup',
        data: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email ? this.state.email.toLowerCase() : undefined,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }
      });

      localStorage.setItem('stylistToken', res.data.token);
      this.props.history.push('/dashboard');

    } catch(error) {
      this.setState({
        firstNameErr: error.response.data.firstName,
        lastNameErr: error.response.data.lastName,
        emailErr: error.response.data.email,
        passwordErr: error.response.data.password,
        confirmPasswordErr: error.response.data.confirmPassword,
      });
    }
  }

  handleClickOutside() {
    this.props.signIn();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      firstNameErr: undefined,
      lastNameErr: undefined,
      emailErr: undefined,
      passwordErr: undefined,
      confirmPasswordErr: undefined
    });
  }

  render() {
    return (
      <StyledForm onSubmit={ this.handleSubmit }>
        <StyledH1>Sign Up</StyledH1>
        <StyledLabel htmlFor="firstName">First Name</StyledLabel>
        <StyledInput type="text" name="firstName" onChange={ this.handleChange } />
        { this.state.firstNameErr ? <ErrorMessage>{ this.state.firstNameErr }</ErrorMessage> : null }
        <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
        <StyledInput type="text" name="lastName" onChange={ this.handleChange } />
        { this.state.lastNameErr ? <ErrorMessage>{ this.state.lastNameErr }</ErrorMessage> : null }
        <StyledLabel htmlFor="email">Email Address</StyledLabel>
        <StyledInput type="text" name="email" onChange={ this.handleChange } />
        { this.state.emailErr ? <ErrorMessage>{ this.state.emailErr }</ErrorMessage> : null }
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput type="password" name="password" onChange={ this.handleChange } />
        { this.state.passwordErr ? <ErrorMessage>{ this.state.passwordErr }</ErrorMessage> : null }
        <StyledLabel htmlFor="confirmPassword">Confirm Password</StyledLabel>
        <StyledInput type="password" name="confirmPassword" onChange={ this.handleChange } />
        { this.state.confirmPasswordErr ? <ErrorMessage>{ this.state.confirmPasswordErr }</ErrorMessage> : null }
        <Button>Create Account</Button>
      </StyledForm>
    )
  }
}

const StyledForm = styled.form`
  background: rgb(216, 216, 216);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40rem;
  height: 52rem;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: 4px 4px 2px rgba(0,0,0, 0.5);

  & > label {
    align-self: flex-start;
    margin-left: 55px;
  }

  & > button {
    margin-top: 15px;
    font-size: 2rem;
    width: 18rem;
  }
`;

const StyledH1 = styled.h1`
  font-size: 3.7rem;
  margin-bottom: 20px;
`;

export default withRouter(onClickOutside(SignUpForm));