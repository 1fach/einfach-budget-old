import { Card } from '@einfach-ui/react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { SignUpForm } from 'src/components/Form'

import { Container } from '@/styling/jsx'

const SignupPage = () => {
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  return (
    <>
      <Metadata title="Sign up" />

      <Container
        h="screen"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card.Root w="400px">
          <Card.Header pb="8">
            <Card.Title>Sign up</Card.Title>
          </Card.Header>
          <Card.Content>
            <SignUpForm />
          </Card.Content>
        </Card.Root>
      </Container>
    </>
  )
}

export default SignupPage
