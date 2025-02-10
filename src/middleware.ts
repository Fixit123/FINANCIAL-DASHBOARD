import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // If there's no session and the user is trying to access a protected route
  if (!session && isProtectedRoute(request.nextUrl.pathname)) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If there's a session and the user is trying to access an auth route
  if (session && isAuthRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

// Protected routes that require authentication
function isProtectedRoute(pathname: string) {
  const protectedRoutes = [
    '/',
    '/home',
    '/analytics',
    '/banking',
    '/messages',
    '/video',
    '/team',
    '/documents',
    '/settings',
    '/calendar',
    '/sync',
    '/notifications',
    '/profile',
  ]

  return protectedRoutes.some(route => 
    pathname === route || 
    pathname.startsWith(`${route}/`)
  )
}

// Auth routes that should not be accessible when logged in
function isAuthRoute(pathname: string) {
  return pathname.startsWith('/auth/')
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 