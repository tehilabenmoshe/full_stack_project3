
import { getBooks, addBook, deleteBook,saveBooks,updateBook } from "../DB/booksData.js";
import { getLoggedInUser } from "../DB/usersData.js";

// ✅ פונקציה לשליפת כל הספרים של המשתמש המחובר
export function fetchBooks() {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };

    return getBooks(user.username); 
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



export function getBookById(bookId) {
    const book = books.find(b => b.id == bookId); // ✅ Find book in database
    return book ? book : { error: "Book not found" };
}

export function searchBooks(query) {
    const user = getLoggedInUser();
    if (!user) return { error: "No user logged in" };

    const allBooks = getBooks(user.username); // שליפת כל הספרים של המשתמש

    // 🔍 סינון הספרים לפי שם הספר או שם המחבר
    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );

    console.log(`✅ Search results for "${query}":`, filteredBooks);
    return filteredBooks;
}



