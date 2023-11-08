"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserRouter = (0, express_1.Router)();
UserRouter.post("/register", UserController_1.Register);
UserRouter.post("/login", UserController_1.Login);
exports.default = UserRouter;
