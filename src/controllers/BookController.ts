import { Request, Response } from "express";
import Joi from "joi";
import BookModel, { IBook } from "../models/Book";

// Defining a Joi schema for validating req.body
const createBookSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
});

// Controller to create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, price, user } = req.body as IBook;

    // Validating the request body
    const { error } = createBookSchema.validate({ title, price });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create a new book document
    const newBook: IBook = new BookModel({
      title,
      price,
      user,
    });

    await newBook.save();

    return res
      .status(201)
      .json({ message: "Book created successfully.", book: newBook });
  } catch (error: any) {
    console.error("Error while creating a book:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
