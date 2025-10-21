import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const resetPassword = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
  }),
  handler: async ({ email }) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.PUBLIC_BASE_URL}/auth/change-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  },
});
