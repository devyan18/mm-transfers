import { User, UserOptional } from "./user.entity.js";

export interface UserRepository {
  create({
    username,
    password,
    avatar,
  }: {
    username: string;
    password: string;
    avatar?: string;
  }): Promise<User | null>;

  find({ search }: { search: UserOptional }): Promise<User | null>;

  findById({ id }: { id: string }): Promise<User | null>;

  update({ id, avatar }: { id: string; avatar: string }): Promise<User | null>;

  deactivate({ id }: { id: string }): Promise<User | null>;

  getAll(): Promise<User[]>;
}
