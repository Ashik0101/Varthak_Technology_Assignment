import { Request, Response } from "express";
import Joi from "joi";
import Book, { IBook } from "../models/Book";

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
    const newBook: IBook = new Book({
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

//Controller to view the books of a particular user
export const viewOwnBook = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({ user: req.body.user }, { user: 0, __v: 0 });
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Controller to see all the created books
export const viewAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
