const STORAGE_KEY = "booksData";
import { loadUsers, saveUsers, getLoggedInUser } from "./usersData.js";

// 🔹 שליפת הספרים של המשתמש המחובר בלבד
export function getBooks(username) {
    const users = loadUsers();
    const user = users.find(user => user.username === username);
    return user ? user.books || [] : [];
}

// 🔹 שמירת ספרים למשתמש המחובר בלבד
export function saveBooks(username, books) {
    const users = loadUsers();
    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex !== -1) {
        users[userIndex].books = books;
        saveUsers(users);
    }
}

// 🔹 הוספת ספר למשתמש המחובר
export function addBook(username, title, author, status, description, year) {
    const books = getBooks(username);
    const newBook = {
        id: Date.now(), 
        title,
        author,
        status,
        description,
        year
    };

    books.push(newBook);
    saveBooks(username, books);
    return { message: "Book added successfully!", book: newBook };
}

// 🔹 עדכון ספר של משתמש מחובר
export function updateBook(username, bookId, updatedData) {
    const books = getBooks(username);
    const index = books.findIndex(book => book.id === bookId);
    if (index === -1) return { error: "Book not found" };

    books[index] = { ...books[index], ...updatedData };
    saveBooks(username, books);
    return books[index];
}

// 🔹 מחיקת ספר של משתמש מחובר
export function deleteBook(username, bookId) {
    const books = getBooks(username);
    const index = books.findIndex(book => book.id === bookId);
    if (index === -1) return { error: "Book not found" };

    const deletedBook = books.splice(index, 1);
    saveBooks(username, books);
    return deletedBook[0];
}

