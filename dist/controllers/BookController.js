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
exports.viewAllBooks = exports.viewOwnBook = exports.createBook = void 0;
const joi_1 = __importDefault(require("joi"));
const Book_1 = __importDefault(require("../models/Book"));
// Defining a Joi schema for validating req.body
const createBookSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    price: joi_1.default.number().required().min(0),
});
// Controller to create a new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, user } = req.body;
        // Validating the request body
        const { error } = createBookSchema.validate({ title, price });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        // Create a new book document
        const newBook = new Book_1.default({
            title,
            price,
            user,
        });
        yield newBook.save();
        return res
            .status(201)
            .json({ message: "Book created successfully.", book: newBook });
    }
    catch (error) {
        console.error("Error while creating a book:", error);
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
});
exports.createBook = createBook;
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
const viewOwnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = [];
        if (req.query.old === "1") {
            // Calculate the date 10 minutes ago
            const tenMinutesAgo = new Date();
            tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
            // Find books created 10 minutes ago or more for the specific user
            books = yield Book_1.default.find({
                user: req.body.user,
                createdAt: { $lte: tenMinutesAgo },
            });
        }
        else if (req.query.new === "1") {
            // Calculate the date 10 minutes ago
            const tenMinutesAgo = new Date();
            tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
            // Find books created less than 10 minutes ago for the specific user
            books = yield Book_1.default.find({
                user: req.body.user,
                createdAt: { $gt: tenMinutesAgo },
            });
        }
        else {
            // If no query parameter is provided
            books = yield Book_1.default.find({ user: req.body.user });
        }
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.viewOwnBook = viewOwnBook;
//Controller to see all the created books
const viewAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = [];
        if (req.query.old === "1") {
            const tenMinutesAgo = new Date();
            tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
            //Find books created 10 minutes ago or more
            books = yield Book_1.default.find({
                createdAt: { $lte: tenMinutesAgo },
            });
        }
        else if (req.query.new === "1") {
            const tenMinutesAgo = new Date();
            tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
            // Find books created less than 10 minutes ago
            books = yield Book_1.default.find({
                createdAt: { $gt: tenMinutesAgo },
            });
        }
        else {
            // If no query parameter is provided
            books = yield Book_1.default.find({});
        }
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.viewAllBooks = viewAllBooks;
