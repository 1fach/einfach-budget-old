import { Container } from '@one-ui/styled-system/jsx'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { LoginForm } from 'src/components/Form'

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'

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
        <Card w="400px">
          <CardHeader pb="8">
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default LoginPage
