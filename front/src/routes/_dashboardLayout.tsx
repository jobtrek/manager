import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboardLayout')({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    console.info('route before load', context.auth)
    // TODO: extract in a function to check auth
    // TODO: add role checking ? maybe using route context
    let shouldRedirect = false
    // All routes with the DashboardLayout must be authenticated
    if (context.auth.pendingAuth) {
      console.info('is pending auth')
      // Wait for the complete user auth request
      try {
        await context.auth.ensureAuth()
      } catch {
        console.info('not logged in')
        shouldRedirect = true
      }
    } else {
      if (!context.auth.isAuthenticated) {
        console.info('is not authenticated')
        shouldRedirect = true
      }
    }
    // Redirect to home if the user is not authenticated
    if (shouldRedirect) {
      console.info('must be redirected')
      throw redirect({
        to: '/',
      })
    }
  },
})

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
