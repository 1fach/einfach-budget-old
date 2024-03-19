import { useEffect } from 'react'

import { Card } from '@einfach-ui/react'
import { Container } from '@einfach-ui/styled/jsx'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { ForgotPasswordForm } from 'src/components/Form'

const ForgotPasswordPage = () => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  return (
    <>
      <Metadata title="Forgot Password" />

      <Container
        h="screen"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card.Root w="400px">
          <Card.Header pb="8">
            <Card.Title>Forgot password</Card.Title>
          </Card.Header>
          <Card.Content>
            <ForgotPasswordForm />
          </Card.Content>
        </Card.Root>
      </Container>
    </>
  )
}

export default ForgotPasswordPage
