import { Router, Request, Response } from "express";
import { Authenticator } from "../middlewares/authenticator";
import { checkRole } from "../middlewares/authorize";
import { createBook } from "../controllers/BookController";

const BookRouter = Router();

BookRouter.post("/books", Authenticator, checkRole("CREATOR"), createBook);

export default BookRouter;
