# 📚 MongoDB Data Layer Fundamentals and Advanced Techniques

This project demonstrates how to use **MongoDB Atlas** with **Node.js** to perform:

- Basic CRUD operations
- Advanced queries with filtering, projection, sorting, and pagination
- Aggregation pipelines
- Indexing for performance optimization

The sample dataset is a **Bookstore** with multiple book documents.

---

## 🚀 Project Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd mongodb-data-layer-fundamentals-and-advanced-techniques

### 2. Install Dependencies
npm install

### 3. Configure Environment Variables
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/plp_bookstore?retryWrites=true&w=majority

### 4. 📂 Project Structure
mongodb-data-layer-fundamentals-and-advanced-techniques/
│
├── insert_books.js   # Inserts sample book documents into MongoDB
├── queries.js        # Contains MongoDB queries (CRUD, advanced, aggregation)
├── .env              # Environment variables
├── package.json
└── README.md

### 5. Insert Sample Data
node insert_books.js

### 6. Run Queries
node queries.js

### 7. Check Data in Compass
- Open MongoDB Compass
- Paste your connection string
- Explore the plp_bookstore → books collection
