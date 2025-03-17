const STORAGE_KEY = "booksData";
import { loadUsers, saveUsers, getLoggedInUser } from "./usersData.js";

//שליפת הספרים של המשתמש המחובר ד
export function getBooks(username) {
    const users = loadUsers();
    const user = users.find(user => user.username === username);
    return user ? user.books || [] : [];
}

// שמירת ספרים למשתמש המחובד
export function saveBooks(username, books) {
    const users = loadUsers();
    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex !== -1) {
        users[userIndex].books = books;
        saveUsers(users);
    }
}

export function addBook(username, title, author, bookStatus, description, year) {
    console.log("📚 שמירת ספרים:", { username, title, author, bookStatus, description, year });
    const books = getBooks(username);
    const newBook = {
        id: Date.now(), 
        title,
        author,
        bookStatus, 
        description,
        year
    };

    books.push(newBook);
    saveBooks(username, books);
    return { message: "Book added successfully!", book: newBook };
}


// מחיקת ספר של משתמש מחובר
export function deleteBook(username, bookId) {
    const books = getBooks(username);
    const index = books.findIndex(book => book.id === bookId);
    if (index === -1) return { error: "Book not found" };

    const deletedBook = books.splice(index, 1);
    saveBooks(username, books);
    return deletedBook[0];
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

