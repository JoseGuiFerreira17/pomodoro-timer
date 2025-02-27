import { ButtonConatiner, ButtonVariant } from './Button.styles'

interface ButtonProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonConatiner variant={variant}>Click me</ButtonConatiner>
}
