import mongoose from "mongoose";

// Book schema aligned with the Bibliotheca frontend field structure:
// { id, title, author, genre, publicationYear }
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      minlength: [2, "Author must be at least 2 characters"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
      enum: {
        values: [
          "Fiction",
          "Non-Fiction",
          "Science Fiction",
          "Fantasy",
          "Mystery",
          "Thriller",
          "Romance",
          "Horror",
          "Biography",
          "History",
          "Self-Help",
          "Philosophy",
          "Poetry",
          "Children",
          "Graphic Novel",
          "Other",
        ],
        message: "'{VALUE}' is not a valid genre",
      },
    },
    publicationYear: {
      type: Number,
      required: [true, "Publication year is required"],
      min: [1000, "Year must be after 1000"],
      max: [new Date().getFullYear(), `Year cannot exceed ${new Date().getFullYear()}`],
    },
  },
  {
    timestamps: true,
    // Expose _id as id in JSON so the frontend can use book.id directly
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("Book", bookSchema);
