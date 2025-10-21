import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabase';

const notAuthenticatedRoutes = [
  '/sign-in',
  '/register',
  '/change-password',
  '/reset-password',
];

export const onRequest = defineMiddleware(
  async ({ redirect, cookies, locals, url }, next) => {
    const accessToken = cookies.get('sb-access-token')?.value ?? '';
    const refreshToken = cookies.get('sb-refresh-token')?.value ?? '';

    if (!accessToken || !refreshToken) {
      locals.isLoggedIn = false;
      cookies.delete('sb-access-token', { path: '/' });
      cookies.delete('sb-refresh-token', { path: '/' });
      return next();
    }

    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      console.error('Error setting session:', error);
      cookies.delete('sb-access-token', { path: '/' });
      cookies.delete('sb-refresh-token', { path: '/' });
      return redirect('/sign-in');
    }

    const { user, session } = data;

    const isLoggedIn = !!user;
    locals.isLoggedIn = isLoggedIn;

    if (!user) {
      cookies.delete('sb-access-token', { path: '/' });
      cookies.delete('sb-refresh-token', { path: '/' });
      return redirect('/sign-in');
    } else {
      locals.user = data.user;
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/');
    }

    if (!isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/sign-in');
    }

    return next();
  }
);
