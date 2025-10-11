import { Encrypt } from "../../utils/hashing.js";
import { Jwt } from "../../utils/jwt.js";
import { User } from "../user/user.entity.js";
import { UserServiceMongoose } from "../user/user.service.js";
import { AuthRepository } from "./auth.repository.js";

export class AuthService implements AuthRepository {
  constructor(
    private readonly userService: UserServiceMongoose,
    private readonly expire: number
  ) {}

  async signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{ token: string } | null> {
    const userFound = await this.userService.find({ search: { username } });
    if (!userFound) return null;

    const isPasswordValid = await Encrypt.verify(password, userFound.password);
    if (!isPasswordValid) return null;

    const token = await Jwt.create({ id: userFound._id }, this.expire);
    if (!token) return null;

    return { token };
  }

  async signUp({
    username,
    password,
    avatar,
  }: {
    username: string;
    password: string;
    avatar?: string;
  }): Promise<{ token: string } | null> {
    const newUser = await this.userService.create({
      username,
      password,
      avatar,
    });

    if (!newUser) return null;
    const token = await Jwt.create({ id: newUser._id }, this.expire);

    if (!token) return null;
    return { token };
  }

  async validate({ token }: { token: string }): Promise<boolean> {
    const isValid = await Jwt.verify(token);
    return !!isValid;
  }

  async getUser({ token }: { token: string }): Promise<{ user: User } | null> {
    const payload = await Jwt.verify(token);
    if (!payload) return null;

    const userId = payload.id;
    if (!userId) return null;

    const user = await this.userService.findById({ id: userId });
    if (!user) return null;
    return { user };
  }
}
