import { Request, Response } from "express";
import { Jwt } from "../../utils/jwt.js";

import { AuthService } from "./auth.service.js";
import { UserServiceMongoose } from "../user/user.service.js";
import { UserRepository } from "../user/user.repository.js";

export class AuthMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: typeof Jwt,
    private readonly userService: UserRepository
  ) {}

  async validate(req: Request, res: Response, next: Function) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(401).send({ message: "No token provided" });
      return;
    }
    const isValid = await this.authService.validate({ token });
    if (!isValid) {
      res.status(401).send({ message: "Invalid token" });
      return;
    }

    const result = await this.jwt.verify(token);
    if (!result) {
      res.status(401).send({ message: "Result not found" });
      return;
    }

    const userId = result.id;
    if (!userId) {
      res.status(401).send({ message: "Invalid token payload" });
      return;
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  }
}
