"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
// Middleware to check if the user has a specific role
const checkRole = (role) => (req, res, next) => {
    const user = req.body.user;
    if (user.roles.includes(role)) {
        next();
    }
    else {
        res
            .status(403)
            .json({ message: `Access denied. You must have the ${role} role` });
    }
};
exports.checkRole = checkRole;
