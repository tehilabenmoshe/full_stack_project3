//import { getBooks, addBook, updateBook, deleteBook } from "../DB/booksData.js";
import { getBooks, addBook, deleteBook,saveBooks } from "../DB/booksData.js";
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


export function updateBook(username, bookId, updatedData) {
    console.log("🔄 מעדכן ספר:", { username, bookId, updatedData });

    const books = getBooks(username);
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex === -1) {
        console.error("❌ ספר לא נמצא!");
        return { error: "ספר לא נמצא" };
    }

   
    books[bookIndex] = {
        ...books[bookIndex], // שמירת נתונים קיימים
        title: updatedData.title || books[bookIndex].title,
        author: updatedData.author || books[bookIndex].author,
        bookStatus: updatedData.bookStatus || books[bookIndex].bookStatus,
        description: updatedData.description || books[bookIndex].description,
        year: updatedData.year || books[bookIndex].year
    };

    saveBooks(username, books);
    console.log("✅ ספר עודכן בהצלחה:", books[bookIndex]);

    return books[bookIndex];
}

