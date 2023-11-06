import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User, { IUser } from "../models/User";

dotenv.config();

//Registration Controller is here..
export const Register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, roles } = req.body;

    //validating req body
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30).required(),
      roles: Joi.array().items(
        Joi.string().valid("CREATOR", "VIEWER", "VIEW_ALL")
      ),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    //check if user already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hashing the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // If roles are not provided, set a default role of 'CREATOR'
    const userRoles = roles || ["CREATOR"];

    // Create a new user document with the hashed password
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
      roles: userRoles,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (error: any) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //validating req body
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    //checking if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email doesn't exist",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    //if password doesn't match
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    //generate token using jwt
    const token = jwt.sign(
      { _id: user._id, roles: user.roles },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login sucess",
      token,
    });
  } catch (error: any) {
    console.log("Some error while login: ", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
