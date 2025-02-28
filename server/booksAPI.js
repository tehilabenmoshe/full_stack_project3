import { books, saveBooks } from "../DB/booksData.js";

// פונקציה לשליפת כל הספרים
export function getBooks() {
    return books.length ? books : { error: "No books found" };
}

// פונקציה להוספת ספר חדש
export function addBook(title, author, status, description, year) {
    if (!title || !author || !status || !year) {
        return { error: "Missing required fields" }; // בדיקה שהכל נשלח
    }

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        status,
        description,
        year
    };

    books.push(newBook);
    saveBooks(books); // שמירה ב-LocalStorage
    return newBook;
}

// פונקציה לעדכון ספר קיים
export function updateBook(id, updatedData) {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return { error: "Book not found" }; // ספר לא נמצא
    }

    books[bookIndex] = { ...books[bookIndex], ...updatedData };
    saveBooks(books); // שמירה לאחר עדכון
    return books[bookIndex];
}

// פונקציה למחיקת ספר
export function deleteBook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        return { error: "Book not found" }; // ספר לא נמצא
    }

    const deletedBook = books.splice(index, 1);
    saveBooks(books); // שמירה לאחר מחיקה
    return deletedBook[0]; // מחזירים את הספר שנמחק
}
