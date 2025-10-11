import jwt from "jsonwebtoken";
import { envs } from "./env.js";

type Payload = { [key: string]: any };

export class Jwt {
  static async create(
    payload: Payload,
    expiresIn: number
  ): Promise<string | null> {
    const signable = JSON.stringify(payload);
    return new Promise<string>((res, rej) => {
      jwt.sign(signable, envs.JWT_SECRET, { expiresIn }, (err, token) => {
        if (err || !token) return rej(err);
        res(token);
      });
    });
  }

  static async verify(token: string) {
    return new Promise<Payload | null>((res, rej) => {
      try {
        const decoded = jwt.decode(token);
        if (typeof decoded !== "string" || !decoded) return res(null);
        const payload = (JSON.parse(decoded) as jwt.JwtPayload) || null;
        res(payload);
      } catch (err) {
        rej(err);
      }
    });
  }
}
