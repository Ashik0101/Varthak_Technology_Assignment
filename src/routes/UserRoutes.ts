import express, { Router } from "express";
import { Login, Register } from "../controllers/UserController";

const UserRouter = Router();

UserRouter.post("/register", Register);
UserRouter.post("/login", Login);

export default UserRouter;
