import { Button, Link, Input, Toaster, toast, Form } from '@einfach-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useForm } from '@redwoodjs/forms'
import { routes, navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { css } from '@/styling/css'
import { Flex } from '@/styling/jsx'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please give a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Please give a password with at least 6 characters.',
  }),
})

export const LoginForm = () => {
  // 0. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 1. Set focus to email field.
  const { setFocus } = form
  React.useEffect(() => {
    setFocus('email')
  }, [setFocus])

  // 2. Define a submit handler.
  const { logIn } = useAuth()
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
      <Toaster />
      <Form.Root
        onSubmit={onSubmit}
        formMethods={form}
        className={css({ spaceY: '8' })}
      >
        <Form.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item w="full" fontWeight="thin">
              <Form.Label>Email</Form.Label>
              <Form.Control>
                <Input placeholder="Enter your email" h="8" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="password"
          render={({ field }) => (
            <Form.Item w="full" fontWeight="thin">
              <Form.Label display="flex" justifyContent="space-between">
                Password{' '}
                <Link
                  fontSize="xs"
                  textDecoration="none"
                  _hover={{ textDecoration: 'underline' }}
                  to={routes.forgotPassword()}
                >
                  Forgot password?
                </Link>
              </Form.Label>
              <Form.Control>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  h="8"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Flex justify="end" gap="3">
          <Button variant="secondary" h="8" px="3" type="submit">
            Sign in
          </Button>
          <Button h="8" px="3" onClick={() => navigate(routes.signup())}>
            Create an account
          </Button>
        </Flex>
      </Form.Root>
    </>
  )
}
