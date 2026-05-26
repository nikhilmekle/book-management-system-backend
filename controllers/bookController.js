import Book from "../models/Book.js";

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Extract validation errors from a Mongoose ValidationError and return
 * a flat object: { fieldName: "message", ... }
 */
const formatValidationErrors = (err) => {
  const errors = {};
  Object.keys(err.errors).forEach((key) => {
    errors[key] = err.errors[key].message;
  });
  return errors;
};

// ─── GET /api/books ──────────────────────────────────────────────────────────

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error);
  }
};

// ─── GET /api/books/:id ──────────────────────────────────────────────────────

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    // Invalid ObjectId format → treat as 404
    if (error.name === "CastError") {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST /api/books ─────────────────────────────────────────────────────────

export const createBook = async (req, res) => {
  try {
    // Accept only the four fields the frontend sends
    const { title, author, genre, publicationYear } = req.body;

    const newBook = new Book({ title, author, genre, publicationYear });
    const savedBook = await newBook.save();

    // Return the created book directly (frontend reads response.data)
    res.status(201).json(savedBook);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formatValidationErrors(error),
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── PUT /api/books/:id ──────────────────────────────────────────────────────

export const updateBook = async (req, res) => {
  try {
    const { title, author, genre, publicationYear } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publicationYear },
      {
        new: true, // return the updated document
        runValidators: true, // run schema validators on update too
      },
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formatValidationErrors(error),
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── DELETE /api/books/:id ───────────────────────────────────────────────────

export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
