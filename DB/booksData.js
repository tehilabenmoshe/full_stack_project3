const STORAGE_KEY = "booksData";
import { getLoggedInUser, loadUsers, saveUsers } from "./usersData.js";

function ensureLoggedInUser() {
    const user = getLoggedInUser();
    if (!user) throw new Error("❌ No user logged in");
    return user;
}


// 🔹 שליפת הספרים רק למשתמש המחובר
export function getBooks() {
    const user = ensureLoggedInUser();
    const users = loadUsers();
    const loggedInUser = users.find(u => u.username === user.username);
    return loggedInUser ? loggedInUser.books || [] : [];
}


// 🔹 שמירת ספרים למשתמש המחובר בלבד
export function saveBooks(books)
 {
    const user = ensureLoggedInUser();
    const users = loadUsers();
    const loggedInUserIndex = users.findIndex(u => u.username === user.username);

    if (loggedInUserIndex !== -1) {
        users[loggedInUserIndex].books = books;
        saveUsers(users);
    }
}

// 🔹 הוספת ספר למשתמש המחובר בלבד
export function addBook(title, author, status, description, year) {
    const user = ensureLoggedInUser();
    const books = getBooks();
    const newBook = {
        id: Date.now(), // ✅ שימוש ב-ID ייחודי
        title,
        author,
        status,
        description,
        year,
    };

    books.push(newBook);
    saveBooks(books);
    return { message: "Book added successfully!", book: newBook };
}

// 🔹 עדכון ספר של משתמש מחובר
export function updateBook(bookId, updatedData) {
    const user = ensureLoggedInUser();
    const books = getBooks();
    const index = books.findIndex(book => book.id === bookId);
    if (index === -1) return { error: "Book not found" };

    books[index] = { ...books[index], ...updatedData };
    saveBooks(books);
    return books[index];
}

// 🔹 מחיקת ספר של משתמש מחובר
export function deleteBook(bookId) {
    const user = ensureLoggedInUser();
    const books = getBooks();
    const index = books.findIndex(book => book.id === bookId);
    if (index === -1) return { error: "Book not found" };

    const deletedBook = books.splice(index, 1);
    saveBooks(books);
    return deletedBook[0];
}
