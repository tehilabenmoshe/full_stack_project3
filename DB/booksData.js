const STORAGE_KEY = "booksData";
import { loadUsers, saveUsers, getLoggedInUser } from "./usersData.js";


// 🔹 Get books for the logged-in user
export function getBooks(username) {
    const users = loadUsers();
    const user = users.find(user => user.username === username);
    return user ? user.books : [];
}

// 🔹 Save books for the logged-in user
export function saveBooks(username, books) {
    const users = loadUsers();
    const user = users.find(user => user.username === username);

    if (user) {
        user.books = books;
        saveUsers(users);
    }
}

// 🔹 Add a new book for a user
export function addBook(username, title, author, status, description, year) {
    const books = getBooks(username);
    const newBook = {
        id: Date.now(),
        title,
        author,
        status,
        description,
        year,
    };

    books.push(newBook);
    saveBooks(username, books);
    return { message: "Book added successfully!", book: newBook };
}

// 🔹 Update a book
export function updateBook(bookId, updatedData) {
    const username = getLoggedInUser();
    let books = getBooks(username);

    const index = books.findIndex(book => book.id === bookId);
    if (index === -1) return { error: "Book not found" };

    books[index] = { ...books[index], ...updatedData };
    saveBooks(username, books);
    return books[index];
}

// 🔹 Delete a book
export function deleteBook(bookId) {
    const username = getLoggedInUser();
    let books = getBooks(username);

    const index = books.findIndex(book => book.id === bookId);
    if (index === -1) return { error: "Book not found" };

    const deletedBook = books.splice(index, 1);
    saveBooks(username, books);
    return deletedBook[0];
}
