import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// export interface TokenPayload {
//   _id: string;
//   roles: string[];
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user?: TokenPayload;
//     }
//   }
// }

export const Authenticator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }

      // If verification is successful, add the payload to the request for further use
      req.body.user = payload;

      console.log("payload is: ", payload);

      next();
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
