
import { JwtPayload } from "jsonwebtoken";
import { User } from "../userTypes";

declare global {
  namespace Express {
    interface Request {
      // user?: string | JwtPayload;
      user?: User;
    }
  }
}


