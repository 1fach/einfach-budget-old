import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@one-ui/styled-system/css'
import { Flex } from '@one-ui/styled-system/jsx'
import * as z from 'zod'

import { useForm } from '@redwoodjs/forms'
import { routes, navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { Link } from '@/ui/anchor'
import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
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
  toc: z.literal(true, {
    required_error: 'Please accept terms and conditions',
  }),
})

export const SignUpForm = () => {
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
  const { signUp } = useAuth()
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
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Flex position="relative">
          <Flex position="absolute" top="0" right="0" mt="-2">
            <Link to={routes.forgotPassword()}>Forgot password?</Link>
          </Flex>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Flex>

        <Flex justify="start" alignItems="center" gap="2">
          <FormField
            control={form.control}
            name="toc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I accept terms and conditions</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Flex>

        <Flex justify="end">
          <Button type="submit">Create an account</Button>
          <Button variant="secondary" onClick={() => navigate(routes.login())}>
            Sign in
          </Button>
        </Flex>
      </Form>
    </>
  )
}
