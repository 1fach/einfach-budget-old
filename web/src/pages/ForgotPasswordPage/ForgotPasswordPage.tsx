import { useEffect } from 'react'

import { Container, Flex } from '@one-ui/styled-system/jsx'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { ForgotPasswordForm, FormBackground } from 'src/components/Form'

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
      <MetaTags title="Forgot Password" />

      <Container my="6px">
        <Flex direction="column" mb="9px" width="1000px">
          <Flex justify="center" position="relative" padding="100">
            <Flex
              align="center"
              justify="center"
              position="absolute"
              inset="0"
              overflow="hidden"
            >
              <FormBackground id="1" width="100%" height="200%" />
            </Flex>
          </Flex>
        </Flex>
      </Container>

      <Card w="400px">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </>
  )
}

export default ForgotPasswordPage
