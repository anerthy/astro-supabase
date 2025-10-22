import { defineAction } from 'astro:actions';
import { supabase } from '../../lib/supabase';
import type { Team } from '@/interfaces/team-entity';

export const getUserTeams = defineAction({
  accept: 'json',
  handler: async (_, { locals }): Promise<Team[] | null> => {
    const { id } = locals.user;

    const { data: teams, error } = await supabase
      .from('teams')
      .select('*')
      .eq('owner_id', id);

    if (error) {
      console.error('Error fetching user teams:', error);
      throw new Error('Failed to fetch user teams');
    }

    const userTeams: Team[] = teams.map(
      ({ id, name, description, owner_id }) => ({
        id,
        name,
        description,
        ownerId: owner_id,
      })
    );

    return userTeams as Team[];
  },
});
