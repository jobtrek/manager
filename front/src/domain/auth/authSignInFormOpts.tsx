import { UserLoginDTO, UserLoginSchema } from '@/domain/auth/authUserSchema.ts'
import { formOptions } from '@tanstack/react-form'

/**
 * Form options for the sign-in form
 */
export const authSignInFormOpts = formOptions({
  defaultValues: {
    email: '',
    password: '',
  } satisfies UserLoginDTO,
  validators: {
    onSubmit: UserLoginSchema,
  },
})
