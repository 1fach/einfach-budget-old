import { useEffect } from 'react'

import {
  Button,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
} from '@mantine/core'

import { Form, Submit, useForm } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { EmailField, PasswordField } from 'src/components/Form'

const LoginPage = () => {
  const formMethods = useForm()
  const { isAuthenticated, logIn } = useAuth()

  const { setFocus } = formMethods
  useEffect(() => {
    setFocus('email')
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated, setFocus])

  const onSubmit = async (data: Record<string, string>) => {
    await logIn({
      username: data.email,
      password: data.password,
    }).then((response) => {
      if (response.message) {
        toast(response.message)
      } else if (response.error) {
        toast.error(response.error)
      }
    })
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <Container size={420} my={40}>
          <Title ta="center">Welcome back!</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor component={Link} size="sm" to={routes.signup()}>
              Create account
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Form onSubmit={onSubmit} formMethods={formMethods}>
              <EmailField name="email" label="Email" id="email" required />
              <PasswordField
                name="password"
                label="Password"
                id="password"
                mt="md"
              />

              <Group justify="space-between" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor component={Link} size="sm" to={routes.forgotPassword()}>
                  Forgot password?
                </Anchor>
              </Group>

              <Button fullWidth mt="xl" component={Submit}>
                Sign in
              </Button>
            </Form>
          </Paper>
        </Container>
      </main>
    </>
  )
}

export default LoginPage
