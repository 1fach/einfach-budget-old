import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@one-ui/styled-system/css'
import { Flex } from '@one-ui/styled-system/jsx'
import * as z from 'zod'

import { useForm } from '@redwoodjs/forms'
import { routes, navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { Link } from '@/ui/anchor'
import { Button } from '@/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import { Toaster, toast } from '@/ui/toaster'

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
      <Form
        onSubmit={onSubmit}
        formMethods={form}
        className={css({ spaceY: '8' })}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem w="full" fontWeight="thin">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" h="8" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem w="full" fontWeight="thin">
              <FormLabel display="flex" justifyContent="space-between">
                Password{' '}
                <Link
                  fontSize="xs"
                  textDecoration="none"
                  _hover={{ textDecoration: 'underline' }}
                  to={routes.forgotPassword()}
                >
                  Forgot password?
                </Link>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  h="8"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
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
      </Form>
    </>
  )
}
