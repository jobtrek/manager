import { SubmitButton } from '@/components/form/SubmitButton.tsx'
import { TextField } from '@/components/form/TextField.tsx'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

/**
 * Custom tanstack form hook for the app
 */
export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
