import { useEffect } from 'react'

import { Button, Anchor, Paper, Title, Text, Container } from '@mantine/core'

import { Form, Submit, useForm } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import {
  EmailField,
  PasswordField,
  TextField,
  CheckboxField,
} from 'src/components/Form'

const SignupPage = () => {
  const formMethods = useForm()
  const { isAuthenticated, signUp } = useAuth()

  const { setFocus } = formMethods
  useEffect(() => {
    setFocus('name')
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated, setFocus])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.email,
      name: data.name,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    }
  }

  return (
    <>
      <MetaTags title="Sign up" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <Container size={420} my={40}>
          <Title ta="center">Sign up</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{' '}
            <Anchor component={Link} size="sm" to={routes.login()}>
              Login
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Form onSubmit={onSubmit} formMethods={formMethods}>
              <TextField name="name" label="Name" id="name" required />
              <EmailField
                name="email"
                label="Email"
                id="email"
                mt="md"
                required
              />
              <PasswordField
                name="password"
                label="Password"
                id="password"
                mt="md"
                required
              />

              <CheckboxField
                name="tos"
                id="tos"
                label="I accept terms and conditions"
                mt="lg"
                mustChecked
              />

              <Button fullWidth mt="xl" component={Submit}>
                Sign up
              </Button>
            </Form>
          </Paper>
        </Container>
      </main>
    </>
  )
}

export default SignupPage
