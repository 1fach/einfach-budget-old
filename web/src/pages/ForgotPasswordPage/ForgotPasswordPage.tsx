import { useEffect } from 'react'

import {
  Paper,
  Title,
  Text,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { Form, Submit, useForm } from '@redwoodjs/forms'
import { navigate, routes, Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { EmailField } from 'src/components/Form'

import classes from './ForgotPassword.module.css'

const ForgotPasswordPage = () => {
  const formMethods = useForm()
  const { isAuthenticated, forgotPassword } = useAuth()

  const { setFocus } = formMethods
  useEffect(() => {
    setFocus('email')
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated, setFocus])

  const onSubmit = async (data: { email: string }) => {
    await forgotPassword(data.email).then((response) => {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      // For the security reasons, don't let user know whether the user exists or not.
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      formMethods.reset({ email: '' })
    })
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

        <Container size={460} my={30}>
          <Title className={classes.title} ta="center">
            Forgot your password?
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Enter your email to get a reset link
          </Text>

          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <Form onSubmit={onSubmit} formMethods={formMethods}>
              <EmailField name="email" label="Email" id="email" required />
              <Group
                justify="space-between"
                mt="lg"
                className={classes.controls}
              >
                <Anchor c="dimmed" size="sm" className={classes.control}>
                  <Center inline>
                    <IconArrowLeft
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                    <Box ml={5}>
                      <Anchor component={Link} size="sm" to={routes.login()}>
                        Back to the login page
                      </Anchor>
                    </Box>
                  </Center>
                </Anchor>
                <Button component={Submit} className={classes.control}>
                  Reset password
                </Button>
              </Group>
            </Form>
          </Paper>
        </Container>
      </main>
    </>
  )
}

export default ForgotPasswordPage
