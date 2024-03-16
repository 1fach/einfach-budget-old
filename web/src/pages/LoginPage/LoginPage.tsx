import { Card } from '@einfach-ui/react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { LoginForm } from 'src/components/Form'

import { Container } from '@/styling/jsx'

const LoginPage = () => {
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  return (
    <>
      <Metadata title="Login" />

      <Container
        h="screen"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card.Root w="400px">
          <Card.Header pb="8">
            <Card.Title>Sign in</Card.Title>
          </Card.Header>
          <Card.Content>
            <LoginForm />
          </Card.Content>
        </Card.Root>
      </Container>
    </>
  )
}

export default LoginPage
