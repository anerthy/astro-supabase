import type { Team } from '@/interfaces/team-entity';
import { supabase } from '@/lib/supabase';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const getTeamById = defineAction({
  accept: 'json',
  input: z.object({
    id: z.string().uuid(),
  }),
  handler: async ({ id }): Promise<Team | null> => {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.log(error.message);
      throw new Error('Failed to fetch team');
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      owner_id: data.owner_id,
    };
  },
});
