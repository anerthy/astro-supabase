import {
  changePassword,
  registerUser,
  resetPassword,
  signIn,
  signOut,
} from './auth';

export const server = {
  registerUser,
  signIn,
  signOut,
  resetPassword,
  changePassword,
};
