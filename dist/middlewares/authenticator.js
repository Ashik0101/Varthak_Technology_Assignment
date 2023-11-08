"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const Authenticator = (req, res, next) => {
    var _a, _b;
    try {
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized: No token provided" });
        }
        // Verify the token
        jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`, (err, payload) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden: Invalid token" });
            }
            // If verification is successful, add the payload to the request body for further use
            req.body.user = payload;
            next();
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.Authenticator = Authenticator;
