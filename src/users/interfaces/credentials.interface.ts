import { User } from '../user.schema';

export type UserCredentials = Pick<User, 'email' | 'password'>;
