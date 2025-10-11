import { Request, Response } from "express";

import { AuthService } from "./auth.service.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signIn(req: Request, res: Response) {
    const { username, password } = req.body;
    const result = await this.authService.signIn({ username, password });
    if (!result) {
      res.status(401).send({ message: "Invalid credentials" });
      return;
    }
    res.status(200).send({ data: result });
    return;
  }

  async signUp(req: Request, res: Response) {
    const { username, password, avatar } = req.body;
    const result = await this.authService.signUp({
      username,
      password,
      avatar,
    });
    if (!result) {
      res.status(400).send({ message: "Error creating user" });
      return;
    }
    res.status(201).send({ data: result });
    return;
  }

  async getUser(req: Request, res: Response) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(401).send({ message: "No token provided" });
      return;
    }
    const result = await this.authService.getUser({ token });
    if (!result) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.status(200).send({ data: result });
    return;
  }
}
