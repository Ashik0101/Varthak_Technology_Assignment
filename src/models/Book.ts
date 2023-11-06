import mongoose, { Schema, Document } from "mongoose";

// Define the Book Schema
const bookSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a Book Model
export interface IBook extends Document {
  title: string;
  price: number;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const BookModel = mongoose.model<IBook>("Book", bookSchema);

export default BookModel;
