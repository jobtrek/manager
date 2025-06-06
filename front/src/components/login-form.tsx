import courbes from '@/assets/courbes.svg'
import { Card, CardContent } from '@/components/ui/card'
import { authSignInFormOpts } from '@/domain/auth/authSignInFormOpts.ts'
import { UserLoginSchema } from '@/domain/auth/authUserSchema.ts'
import { useAppForm } from '@/hooks/useAppForm.ts'
import { useAuthSignInMutation } from '@/lib/auth/authQueries'
import { cn } from '@/lib/utils'
import { useRouter } from '@tanstack/react-router'
import * as v from 'valibot'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()
  const signInMutation = useAuthSignInMutation()

  const form = useAppForm({
    ...authSignInFormOpts,
    onSubmit: async ({ value }) => {
      const validData = v.parse(UserLoginSchema, value)
      // try to Login
      try {
        await signInMutation.mutateAsync(validData)

        router.navigate({
          to: '/home',
        })
      } catch (e) {
        console.log('Failed login attempt')
        console.log(e)
      }
    },
  })

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="p-6 md:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenue</h1>
                <p className="text-muted-foreground text-balance">
                  Connectez vous à la plateforme Jobtrek
                </p>
              </div>
              <form.AppField name="email">
                {(field) => <field.TextField label="Email" type="text" />}
              </form.AppField>
              <form.AppField name="password">
                {(field) => (
                  <field.TextField label="Password" type="password">
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </field.TextField>
                )}
              </form.AppField>
              <form.AppForm>
                <form.SubmitButton label="Login" />
              </form.AppForm>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or
                </span>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={courbes}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
