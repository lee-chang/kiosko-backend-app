import * as express from "express"
import { Payload } from "../../../features/auths/interfaces/jwt.payload.interface";

import * as jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: Payload;
    }

    interface Response {
      user: Payload;
    }
  }
  
}


