const Book = require('../models/books.js');

// Add new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, price, genre } = req.body;
    const newBook = new Book({ title, author, price, genre });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json({ message: 'Book updated successfully', book: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
