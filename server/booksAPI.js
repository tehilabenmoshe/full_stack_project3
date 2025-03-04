import { getBooks, addBook, updateBook, deleteBook } from "../DB/booksData.js";
import { getLoggedInUser } from "../DB/usersData.js";

// ✅ פונקציה לשליפת כל הספרים של המשתמש המחובר
export function fetchBooks() {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };

    return getBooks();
}

// ✅ פונקציה להוספת ספר למשתמש המחובר
export function addNewBook(title, author, status, description, year) {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };

    return addBook(title, author, status, description, year);
}

// ✅ פונקציה לעדכון ספר קיים (למשתמש המחובר בלבד)
export function updateExistingBook(bookId, updatedData) {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };

    return updateBook(bookId, updatedData);
}

// ✅ פונקציה למחיקת ספר (רק של המשתמש המחובר)
export function removeBook(bookId) {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };

    return deleteBook(bookId);
}
