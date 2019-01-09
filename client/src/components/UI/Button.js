import styled, { css } from 'styled-components';

const Button = styled.button`
  width: 12rem;
  height: 4rem;
  font-size: 2.2rem;
  font-family: Philosopher;
  border-radius: 6px;
  border: 1px solid #979797;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  background-color: #0E9BB8;
  color: white;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translate(2px, 2px);
    outline: none;
  }

  &:focus {
    outline: none;
  }
  
  ${props => props.red && css`
    background-color: #A41A2F;
  `}
`

export default Button;