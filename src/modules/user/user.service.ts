import { UserModel } from "./user.model.js";
import type { UserOptional } from "./user.entity.js";
import { UserRepository } from "./user.repository.js";

export class UserServiceMongoose implements UserRepository {
  constructor(private readonly model: typeof UserModel) {}

  async create({
    username,
    password,
    avatar,
  }: {
    username: string;
    password: string;
    avatar?: string;
  }) {
    const userExists = await this.model.findOne({ username });
    if (userExists) throw new Error("User already exists");

    try {
      const newUser = new this.model({ username, password, avatar });
      await newUser.save();
      return newUser;
    } catch (error) {
      return null;
    }
  }

  async find({ search }: { search: UserOptional }) {
    return this.model.findOne({ ...search, active: true });
  }

  async findById({ id }: { id: string }) {
    return this.model.findById(id);
  }

  async update({ id, avatar }: { id: string; avatar: string }) {
    return this.model.findByIdAndUpdate(id, { avatar: avatar }, { new: true });
  }

  async deactivate({ id }: { id: string }) {
    return this.model.findByIdAndUpdate(id, { active: false }, { new: true });
  }

  async getAll() {
    return this.model.find();
  }
}
