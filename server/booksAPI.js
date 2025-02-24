
import books from "../../DB/booksData.js";
// פונקציה לשליפת כל הספרים
export function getBooks() {
    return books;
}

// פונקציה להוספת ספר חדש
export function addBook(title, author, status, description, year) {
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1, //קביעת ID חדש לפי המיקום ברשימה
        title,
        author,
        status,
        description,
        year
    };
    books.push(newBook);
    return newBook;
}

// פונקציה לעדכון ספר קיים
export function updateBook(id, updatedData) {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) //הספר נמצא
        {
        books[bookIndex] = { ...books[bookIndex], ...updatedData };
        return books[bookIndex];
    }
    return null;
}

// פונקציה למחיקת ספר
export function deleteBook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        return books.splice(index, 1);
    }
    return null;
}
