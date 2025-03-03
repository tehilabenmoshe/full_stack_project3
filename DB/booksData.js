const STORAGE_KEY = "booksData";
import { loadUsers, saveUsers, getLoggedInUser } from "./usersData.js";


// 🔹 Get books for the logged-in user
export function getBooks(username) {
    const users = loadUsers();
    const user = users.find(user => user.username === username);
    return user ? user.books : [
        {
            id: 1,
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            status: "To Read",
            description: "The first book in the Harry Potter series.",
            year: 1997
        },
        {
            id: 2,
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            status: "Reading",
            description: "A fantasy novel about Bilbo Baggins' adventure.",
            year: 1937
        },
        {
            id: 3,
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            status: "Read",
            description: "A novel about teenage angst and rebellion.",
            year: 1951
        },
        {
            id: 4,
            title: "1984",
            author: "George Orwell",
            status: "To Read",
            description: "A dystopian novel about totalitarianism.",
            year: 1949
        }
    ];
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

// טוענים את הנתונים בתחילת העבודה
//const books = loadBooks();

//export { books, saveBooks };
