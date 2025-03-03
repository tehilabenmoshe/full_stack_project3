import { getBooks, saveBooks, addBook, updateBook, deleteBook } from "../DB/booksData.js";

// 🔹 Handle getting books for a user
export function fetchBooks(username) {
    if (!username) return { error: "User not logged in" };
    return getBooks(username); // ✅ Use `booksData.js`
}

// 🔹 Handle adding a book for a user
export function addBookToUser(username, title, author, status, description, year) {
    if (!username) return { error: "User not logged in" };
    return addBook(username, title, author, status, description, year); // ✅ Use `booksData.js`
}

// 🔹 Handle updating a book
export function updateUserBook(username, bookId, updatedData) {
    if (!username) return { error: "User not logged in" };
    return updateBook(bookId, updatedData); // ✅ Use `booksData.js`
}

// 🔹 Handle deleting a book
export function deleteUserBook(username, bookId) {
    if (!username) return { error: "User not logged in" };
    return deleteBook(bookId); // ✅ Use `booksData.js`
}
