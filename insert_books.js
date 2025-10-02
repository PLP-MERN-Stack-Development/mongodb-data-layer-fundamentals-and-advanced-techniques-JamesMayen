// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client and dotenv
require('dotenv').config();
console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);
const { MongoClient } = require('mongodb');

// Connection URI (loaded from .env file)
const uri = process.env.MONGO_URI;

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Create a new MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Sample book data
const books = [
  { title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", published_year: 2019, price: 15.99, in_stock: true, pages: 336, publisher: "Celadon Books" }, 
  { title: "Educated", author: "Tara Westover", genre: "Memoir", published_year: 2018, price: 13.99, in_stock: true, pages: 352, publisher: "Random House" }, 
  { title: "Dune", author: "Frank Herbert", genre: "Science Fiction", published_year: 1965, price: 18.50, in_stock: true, pages: 688, publisher: "Chilton Books" }, 
  { title: "Becoming", author: "Michelle Obama", genre: "Biography", published_year: 2018, price: 20.00, in_stock: false, pages: 448, publisher: "Crown Publishing" }, 
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", published_year: 1925, price: 10.99, in_stock: true, pages: 180, publisher: "Scribner" }, 
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1937, price: 14.50, in_stock: true, pages: 310, publisher: "George Allen & Unwin" }, 
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", published_year: 2011, price: 22.99, in_stock: true, pages: 498, publisher: "Harper" }, 
  { title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 9.99, in_stock: false, pages: 328, publisher: "Secker & Warburg" }, 
  { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Classic", published_year: 1951, price: 11.99, in_stock: true, pages: 277, publisher: "Little, Brown and Company" }, 
  { title: "Atomic Habits", author: "James Clear", genre: "Self-help", published_year: 2018, price: 16.99, in_stock: true, pages: 320, publisher: "Penguin Random House" } 
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 