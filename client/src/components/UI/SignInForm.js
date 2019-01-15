import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      emailErr: undefined,
      passwordErr: undefined,
      stylistErr: undefined
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleEnterPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleEnterPress);
  }

  handleEnterPress(event) {
    if(event.keyCode === 13) {
      this.submitForm(event);
    }
  }

  async submitForm(event) {
    event.preventDefault();

    try{
      const res = await axios({
        url: '/api/v1/login',
        method: 'post',
        data: {
          email: this.state.email ? this.state.email.toLowerCase() : undefined,
          password: this.state.password
        }
      });
  
      localStorage.setItem('stylistToken', res.data.token);
      this.props.history.push('/app/dashboard');
    } catch(error) {
      console.log(error.response.data);
      this.setState({
        emailErr: error.response.data.email,
        passwordErr: error.response.data.password,
        stylistErr: error.response.data.stylist
      })
    }
    
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      emailErr: undefined,
      passwordErr: undefined,
      stylistErr: undefined
    })
  }

  handleSignUp(event) {
    event.preventDefault();
    this.props.signUp();
  }

  render() {
    return (
      <StyledForm onSubmit={this.submitForm}>
        <StyledLabel htmlFor="email">Email Address</StyledLabel>
        <StyledInput type="text" id="email" name="email" onChange={this.handleChange}/>
        { this.state.emailErr ? <ErrorMessage>{ this.state.emailErr }</ErrorMessage> : null }
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput type="password" id="password" name="password" onChange={this.handleChange}/>
        { this.state.passwordErr ? <ErrorMessage>{ this.state.passwordErr }</ErrorMessage> : null }
        <ButtonDiv>
          <Button red onClick={ this.handleSignUp }>Sign Up</Button>
          <Button type="submit">Sign In</Button>
        </ButtonDiv>
        { this.state.stylistErr ? <ErrorMessage>{ this.state.stylistErr }</ErrorMessage> : null }
        
      </StyledForm>
    )
  }
}

export const ErrorMessage = styled.p`
  color: red;
  margin-top: -10px;
  font-size: 1.4rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(216, 216, 216, 0.85);
  width: 40rem;
  height: 27rem;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: 4px 4px 2px rgba(0,0,0, 0.5);

  & > label {
    align-self: flex-start;
    margin-left: 55px;
  }
`;

export const StyledInput = styled.input`
  height: 3rem;
  width: 30rem;
  font-size: 1.8rem;
  font-family: Philosopher;
  border-radius: 6px;
  border: 1px solid #979797;
  margin-bottom: 15px;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  padding: 0 8px;
`;

export const StyledLabel = styled.label`
  font-size: 2.2rem;
  margin-bottom: 3px;
`;

const ButtonDiv = styled.div`
  margin: 20px;
  & > button {
    margin: 0 10px;
  }
`;

export default withRouter(SignInForm);