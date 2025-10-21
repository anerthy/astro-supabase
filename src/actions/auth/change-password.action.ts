import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const changePassword = defineAction({
  accept: 'json',
  input: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    // expiresAt: z.number(),
    // expiresIn: z.number(),
    // tokenType: z.string(),
    // type: z.string(),
    password: z.string().min(6),
  }),
  handler: async ({ accessToken, refreshToken, password }) => {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

    const { user } = sessionData;

    if (sessionError) {
      throw new Error(sessionError.message);
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      throw new Error(updateError.message);
    }

    return { user };
  },
});
