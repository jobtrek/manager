import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { useFieldContext } from '@/hooks/useAppForm.tsx'
import React from 'react'

/**
 * You can pass a children form like :
 * <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
 *   Forgot your password?
 * </a>
 */
export const TextField = ({
  label,
  children,
  ...props
}: React.ComponentProps<'input'> & { label: string }) => {
  const field = useFieldContext<string>()
  console.log(field.state.meta.errors)
  return (
    <div className="grid gap-3">
      <div className="flex items-center">
        <Label htmlFor={field.name}>{label}</Label>
        {children}
      </div>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
      {!field.state.meta.isValid && (
        <p className="text-red-500">
          {field.state.meta.errors.map((e) => e.message).join(', ')}
        </p>
      )}
    </div>
  )
}
