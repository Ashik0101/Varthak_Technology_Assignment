"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
//Registration Controller is here..
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, roles } = req.body;
        //validating req body
        const schema = joi_1.default.object({
            username: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(5).max(30).required(),
            roles: joi_1.default.array().items(joi_1.default.string().valid("CREATOR", "VIEWER", "VIEW_ALL")),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        //check if user already exists
        const emailExists = yield User_1.default.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        // Hashing the user's password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // If roles are not provided, set a default role of 'CREATOR'
        const userRoles = roles || ["CREATOR"];
        // Create a new user document with the hashed password
        const newUser = new User_1.default({
            username,
            email,
            password: hashedPassword,
            roles: userRoles,
        });
        yield newUser.save();
        return res.status(201).json({
            message: "User registered successfully.",
        });
    }
    catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //validating req body
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(5).max(30).required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        //checking if user exists
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email doesn't exist",
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        //if password doesn't match
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Wrong password",
            });
        }
        //generate token using jwt
        const token = jsonwebtoken_1.default.sign({ _id: user._id, roles: user.roles }, `${process.env.JWT_SECRET}`, {
            expiresIn: "1d",
        });
        res.status(200).json({
            message: "Login sucess",
            token,
        });
    }
    catch (error) {
        console.log("Some error while login: ", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.Login = Login;
