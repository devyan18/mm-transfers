import { User } from "../modules/user/user.entity.ts"; // o el tipo que uses

declare global {
  namespace Express {
    export interface Request {
      user?: User; // o cualquier tipo que necesites
    }
  }
}
