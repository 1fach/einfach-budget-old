import { Container } from '@one-ui/styled-system/jsx'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { SignUpForm } from 'src/components/Form'

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'

const SignupPage = () => {
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  return (
    <>
      <MetaTags title="Sign up" />

      <Container
        h="screen"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card w="400px">
          <CardHeader pb="8">
            <CardTitle>Sign up</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default SignupPage
