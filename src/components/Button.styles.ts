import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonConatinerProps {
  variant: ButtonVariant
}

const variantColors = {
  primary: '#007bff',
  secondary: '#6c757d',
  danger: '#dc3545',
  success: '#28a745',
}

export const ButtonConatiner = styled.button<ButtonConatinerProps>`
  width: 100px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 5px;
  margin-right: 3px;
  cursor: pointer;

  background: ${(porps) => porps.theme['green-500']};

  /* background: ${({ variant }) => variantColors[variant]}; */
`
