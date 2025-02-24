//רשימת הספרים הראשונית
const books = [
    {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        status: "To Read", // הסטטוס של הספר (To Read, Reading, Read)
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

// ייצוא הנתונים כדי שניתן יהיה להשתמש בהם בקובצי ה-API
export default books;
