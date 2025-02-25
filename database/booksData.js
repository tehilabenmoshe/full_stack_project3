const STORAGE_KEY = "booksData";

// פונקציה לטעינת נתונים מ-LocalStorage (אם קיימים)
function loadBooks() {
    const storedBooks = localStorage.getItem(STORAGE_KEY);
    return storedBooks ? JSON.parse(storedBooks) : [
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

// שמירת נתונים ל-LocalStorage
function saveBooks(books) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// טוענים את הנתונים בתחילת העבודה
const books = loadBooks();

export { books, saveBooks };
