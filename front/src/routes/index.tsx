import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const auth = useAuth()

  return (
    <div className="p-2">
      <h3>Welcome {auth.user?.email || 'Guest'}</h3>
      <Button variant="outline" asChild>
        <Link to={'/home'}>Dashboard home</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link to={'/login'}>Login page</Link>
      </Button>
    </div>
  )
}
