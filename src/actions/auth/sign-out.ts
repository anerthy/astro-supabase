import { defineAction } from 'astro:actions';

export const signOut = defineAction({
  accept: 'json',
  handler: async ({ }, { cookies, rewrite }) => {
    cookies.delete('sb-access-token', { path: '/' });
    cookies.delete('sb-refresh-token', { path: '/' });
    rewrite('/sign-in');
    return { success: true };
  },
});