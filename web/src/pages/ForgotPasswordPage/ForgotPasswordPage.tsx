import { useEffect } from 'react'

import { Container } from '@one-ui/styled-system/jsx'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { ForgotPasswordForm } from 'src/components/Form'

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'

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
        <Card w="400px">
          <CardHeader pb="8">
            <CardTitle>Forgot password</CardTitle>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default ForgotPasswordPage
