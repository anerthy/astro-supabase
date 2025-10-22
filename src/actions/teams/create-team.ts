import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const createTeam = defineAction({
  accept: 'json',
  input: z.object({
    name: z.string(),
    description: z.string().max(1000).optional(),
    members: z.array(z.string().email()).min(1).optional(),
  }),
  handler: async ({ name, description, members }, { locals }) => {
    const { data, error: insertError } = await supabase
      .from('teams')
      .insert([
        {
          name,
          description,
          owner_id: locals.user.id,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.log(insertError.message);
      throw new Error('Failed to create team');
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      owner_id: data.owner_id,
    };
  },
});
