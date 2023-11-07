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
// export const viewOwnBook = async (req: Request, res: Response) => {
//   try {
//     const books = await Book.find({ user: req.body.user }, { user: 0, __v: 0 });
//     res.status(200).json(books);
//   } catch (error: any) {
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// Controller to view the books of a particular user
export const viewOwnBook = async (req: Request, res: Response) => {
  try {
    let books: IBook[] = [];

    if (req.query.old === "1") {
      // Calculate the date 10 minutes ago
      const tenMinutesAgo = new Date();
      tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

      // Find books created 10 minutes ago or more for the specific user
      books = await Book.find({
        user: req.body.user,
        createdAt: { $lte: tenMinutesAgo },
      });
    } else if (req.query.new === "1") {
      // Calculate the date 10 minutes ago
      const tenMinutesAgo = new Date();
      tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

      // Find books created less than 10 minutes ago for the specific user
      books = await Book.find({
        user: req.body.user,
        createdAt: { $gt: tenMinutesAgo },
      });
    } else {
      // If no query parameter is provided
      books = await Book.find({ user: req.body.user });
    }

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
    let books: IBook[] = [];

    if (req.query.old === "1") {
      const tenMinutesAgo = new Date();
      tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

      //Find books created 10 minutes ago or more
      books = await Book.find({
        createdAt: { $lte: tenMinutesAgo },
      });
    } else if (req.query.new === "1") {
      const tenMinutesAgo = new Date();
      tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

      // Find books created less than 10 minutes ago
      books = await Book.find({
        createdAt: { $gt: tenMinutesAgo },
      });
    } else {
      // If no query parameter is provided
      books = await Book.find({});
    }

    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
