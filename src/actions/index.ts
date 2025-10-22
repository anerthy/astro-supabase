import {
  changePassword,
  registerUser,
  resetPassword,
  signIn,
  signOut,
} from './auth';
import { createTeam, getTeamById, getUserTeams } from './teams';

export const server = {
  registerUser,
  signIn,
  signOut,
  resetPassword,
  changePassword,
  createTeam,
  getTeamById,
  getUserTeams,
};
