/**
 * seed.js — populate the database with sample books
 * Run: node seed.js
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "./models/Book.js";

dotenv.config();

const sampleBooks = [
  { title: "The Great Gatsby",          author: "F. Scott Fitzgerald", genre: "Fiction",         publicationYear: 1925 },
  { title: "To Kill a Mockingbird",     author: "Harper Lee",          genre: "Fiction",         publicationYear: 1960 },
  { title: "1984",                       author: "George Orwell",       genre: "Science Fiction", publicationYear: 1949 },
  { title: "Brave New World",           author: "Aldous Huxley",       genre: "Science Fiction", publicationYear: 1932 },
  { title: "The Hobbit",                author: "J.R.R. Tolkien",      genre: "Fantasy",         publicationYear: 1937 },
  { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", genre: "Fantasy", publicationYear: 1997 },
  { title: "Gone Girl",                 author: "Gillian Flynn",        genre: "Thriller",        publicationYear: 2012 },
  { title: "And Then There Were None",  author: "Agatha Christie",     genre: "Mystery",         publicationYear: 1939 },
  { title: "Pride and Prejudice",       author: "Jane Austen",         genre: "Romance",         publicationYear: 1813 },
  { title: "The Shining",              author: "Stephen King",         genre: "Horror",          publicationYear: 1977 },
  { title: "Sapiens",                  author: "Yuval Noah Harari",   genre: "Non-Fiction",     publicationYear: 2011 },
  { title: "Atomic Habits",            author: "James Clear",          genre: "Self-Help",       publicationYear: 2018 },
  { title: "Steve Jobs",               author: "Walter Isaacson",      genre: "Biography",       publicationYear: 2011 },
  { title: "A Brief History of Time",  author: "Stephen Hawking",      genre: "Non-Fiction",     publicationYear: 1988 },
  { title: "The Alchemist",            author: "Paulo Coelho",         genre: "Fiction",         publicationYear: 1988 },
  { title: "Meditations",              author: "Marcus Aurelius",      genre: "Philosophy",      publicationYear: 180  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");

    await Book.deleteMany({});
    console.log("🗑  Cleared existing books");

    const inserted = await Book.insertMany(sampleBooks);
    console.log(`📚 Inserted ${inserted.length} books`);

    await mongoose.disconnect();
    console.log("✅ Done — database seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seed();
