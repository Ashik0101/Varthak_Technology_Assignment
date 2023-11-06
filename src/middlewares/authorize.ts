import { Request, Response, NextFunction } from "express";

// Middleware to check if the user has a specific role
export const checkRole =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    if (user.roles.includes(role)) {
      next();
    } else {
      res
        .status(403)
        .json({ message: `Access denied. You must have the ${role} role` });
    }
  };
