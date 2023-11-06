import { Router, Request, Response } from "express";
import { Authenticator } from "../middlewares/authenticator";
import { checkRole } from "../middlewares/authorize";
import {
  createBook,
  viewAllBooks,
  viewOwnBook,
} from "../controllers/BookController";

const BookRouter = Router();

BookRouter.post("/books", Authenticator, checkRole("CREATOR"), createBook);
BookRouter.get("/books", Authenticator, checkRole("VIEWER"), viewOwnBook);
BookRouter.get(
  "/books/all",
  Authenticator,
  checkRole("VIEW_ALL"),
  viewAllBooks
);

export default BookRouter;
