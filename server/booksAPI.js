import { getBooks, addBook, updateBook, deleteBook } from "../DB/booksData.js";
import { getLoggedInUser } from "../DB/usersData.js";

// ✅ פונקציה לשליפת כל הספרים של המשתמש המחובר
export function fetchBooks() {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };

    return getBooks(user.username); // ✅ שולפים רק את הספרים של המשתמש המחובר
}



export function addNewBook(username, title, author, status, description, year) {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };
    return addBook(username, title, author, status, description, year); 
}



// ✅ פונקציה לעדכון ספר קיים (למשתמש המחובר בלבד)
export function updateExistingBook(bookId, updatedData) {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };

    const userBooks = getBooks(user.username);
    if (!userBooks.find(book => book.id === bookId)) {
        return { error: "Book not found or does not belong to the user" };
    }

    return updateBook(user.username, bookId, updatedData);
}

// ✅ פונקציה למחיקת ספר (רק של המשתמש המחובר)
export function removeBook(bookId) {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };

    const userBooks = getBooks(user.username);
    if (!userBooks.find(book => book.id === bookId)) {
        return { error: "Book not found or does not belong to the user" };
    }

    return deleteBook(user.username, bookId);
}


