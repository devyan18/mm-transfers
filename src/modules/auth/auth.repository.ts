import { User } from "../user/user.entity.js";

export interface AuthRepository {
  signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{ token: string } | null>;
  signUp({
    username,
    password,
    avatar,
  }: {
    username: string;
    password: string;
    avatar?: string;
  }): Promise<{ token: string } | null>;
  validate({ token }: { token: string }): Promise<boolean>;
  getUser({ token }: { token: string }): Promise<{ user: User } | null>;
}
