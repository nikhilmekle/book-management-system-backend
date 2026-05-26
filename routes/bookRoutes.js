import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// GET    /api/books        → list all books
// POST   /api/books        → create a new book
// GET    /api/books/:id    → get one book
// PUT    /api/books/:id    → update a book
// DELETE /api/books/:id    → delete a book

router.get("/", getBooks);
router.post("/", createBook);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
