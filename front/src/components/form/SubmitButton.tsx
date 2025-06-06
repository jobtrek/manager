import { Button } from '@/components/ui/button.tsx'
import { useFormContext } from '@/hooks/useAppForm.ts'

export const SubmitButton = ({ label }: { label: string }) => {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button disabled={!canSubmit} type="submit" className="w-full">
          {isSubmitting ? '...' : label}
        </Button>
      )}
    </form.Subscribe>
  )
}
