
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "@/lib/supabase";

export const signIn = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string(),
    password: z.string().min(6),
  }),
  handler: async ({ email, password }, {cookies}) => {
    
    const { data, error } = await supabase.auth.signInWithPassword({email,password});

    if (error) {
      throw new Error(error.message);
    }

    const { user, access_token, refresh_token } = data.session

    cookies.set("sb-access-token", access_token, {
      path: "/",
    });

    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
    });

    return { user };
  },
});