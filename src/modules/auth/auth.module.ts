import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { UserServiceMongoose } from "../user/user.service.js";
import { UserModel } from "../user/user.model.js";
import { Router } from "express";

const authRouter = Router();

const userService = new UserServiceMongoose(UserModel);
const authService = new AuthService(userService, 60 * 60 * 24);
const authController = new AuthController(authService);

authRouter.post("/signin", authController.signIn.bind(authController));
authRouter.post("/signup", authController.signUp.bind(authController));
authRouter.get("/user", authController.getUser.bind(authController));

export { authRouter };
