import React, { Component } from 'react';
import SignInForm from '../UI/SignInForm';
import styled from 'styled-components';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StyledDiv>
        <StyledH1>Style Book</StyledH1>
        <SignInForm />
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3900&q=80);
  background-size: cover;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);

  & > form {
    grid-column: 5 / span 4;
    grid-row: 3 /span 2;
    justify-self: center;
    align-self: center;
  }

  & > h1 {
    grid-column: 5 / span 4;
    justify-self: center;
    align-self: center;
    grid-row: 2 / span 1;
  }

  @media only screen and (max-height: 380px) {
    & > h1 {
      font-size: 4rem;
      grid-row: 1 / span 1;
    }

    & > form {
      grid-row: 2 / span 5;
    }
  }

  @media only screen and (max-width: 380px) {
    & > h1 {
      font-size: 4rem;
      grid-column: 4 / span 6;
    }

    & > form {
      width: 370px;
    }
  }
`;

const StyledH1 = styled.h1`
  font-family: philosopher;
  font-size: 9rem;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
`;


export default SignIn;