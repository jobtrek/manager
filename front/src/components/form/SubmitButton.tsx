import { Button } from '@/components/ui/button.tsx'
import { useFormContext } from '@/hooks/useAppForm.tsx'

export const SubmitButton = ({ label }: { label: string }) => {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} type="submit" className="w-full">
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}
