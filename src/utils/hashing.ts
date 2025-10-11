import { genSalt, hash, compare } from "bcrypt";

const SALT_ROUNDS = 10;

export class Encrypt {
  static create = async (str: string): Promise<string> => {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(str, salt);
  };

  static verify = async (str: string, hashed: string): Promise<boolean> => {
    return compare(str, hashed);
  };
}
