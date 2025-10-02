
// --- Task 2: Basic CRUD ---

// Find all books in a specific genre
db.books.find({ genre: "Classic" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 12.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "The Silent Patient" })

// --- Task 3: Advanced Queries ---

// Find books that are in stock AND published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sort books by price ascending
db.books.find().sort({ price: 1 })

// Sort books by price descending
db.books.find().sort({ price: -1 })

// Pagination: 5 books per page (example page 2)
db.books.find().skip(5).limit(5)

// --- Task 4: Aggregation Pipeline ---

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group books by decade and count
db.books.aggregate([
  { $project: { decade: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] } ] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

// --- Task 5: Indexing ---

// Create index on title
db.books.createIndex({ title: 1 })

// Create compound index on author + published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Use explain() to show query performance
db.books.find({ title: "Dune" }).explain("executionStats")
