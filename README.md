# 📚 Bibliotheca — Book Inventory API

Express + MongoDB REST API backend for the Bibliotheca Book Management System.

---

## 🔄 What Changed from v1

| Field (old) | Field (new) | Reason |
|---|---|---|
| `email` | ❌ Removed | Not used by frontend |
| `stockCount` | ❌ Removed | Not used by frontend |
| `publisher` | ❌ Removed | Not used by frontend |
| `description` | ❌ Removed | Not used by frontend |
| `publishedDate` (Date) | ✅ `publicationYear` (Number) | Frontend stores a 4-digit year |
| — | ✅ `genre` (String, enum) | Frontend genre filter |
| `createBook` returned `{ success, message, savedBook }` | Returns book directly | Frontend reads `response.data` as the book |

---

## 📦 Book Object

```json
{
  "id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publicationYear": 1925,
  "createdAt": "2024-01-25T12:00:00.000Z",
  "updatedAt": "2024-01-25T12:00:00.000Z"
}
```

## 🚀 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get one book |
| POST | `/api/books` | Create a book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

---

## ⚙️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env`:
```
PORT=8080
MONGO_URL=mongodb://localhost:27017/book_inventory
ALLOWED_ORIGINS=http://localhost:5173
```

### 3. (Optional) Seed sample data
```bash
npm run seed
```

### 4. Start the server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

---

## 🌐 Connect the Frontend

In your Bibliotheca frontend `.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

> The frontend calls `/books` — so the full URL becomes `http://localhost:8080/api/v1/books`.
> If you keep the route as `/api/books`, set `VITE_API_BASE_URL=http://localhost:8080/api`.

---

## ✅ Valid Genres

`Fiction` · `Non-Fiction` · `Science Fiction` · `Fantasy` · `Mystery` · `Thriller` · `Romance` · `Horror` · `Biography` · `History` · `Self-Help` · `Philosophy` · `Poetry` · `Children` · `Graphic Novel` · `Other`

---

## ☁️ Deploy to Render

1. Push to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add environment variables: `MONGO_URL`, `PORT`, `ALLOWED_ORIGINS`
