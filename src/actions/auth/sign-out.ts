import { defineAction } from 'astro:actions';

export const signOut = defineAction({
  accept: 'json',
  handler: async (input, { cookies, rewrite, request }) => {
    cookies.delete('sb-access-token', { path: '/' });
    cookies.delete('sb-refresh-token', { path: '/' });
    return { success: true };
  },
});
