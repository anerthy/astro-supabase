
import { supabase } from "@/lib/supabase";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string(),
    password: z.string().min(6),
  }),
  handler: async ({ email, password }) => {
    
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true};
  },
});