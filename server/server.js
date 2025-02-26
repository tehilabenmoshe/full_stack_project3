import { getBooks, addBook, updateBook, deleteBook } from "./booksAPI.js";
import { getUsers, addUser, authenticateUser } from "./usersAPI.js";

// פונקציה שמטפלת בבקשות מהלקוח
export function handleRequest(request) {
    const { method, endpoint, data } = request;

    console.log(`📥 Server received request: ${method} ${endpoint}`);

    switch (endpoint) {
        case "/books":
            if (method === "GET") return getBooks();
            if (method === "POST") return addBook(data.title, data.author, data.status, data.description, data.year);
            return { error: "Invalid request method for /books" };

        case "/books/update":
            if (method === "PUT") return updateBook(data.id, data);
            return { error: "Invalid request method for /books/update" };

        case "/books/delete":
            if (method === "DELETE") return deleteBook(data.id);
            return { error: "Invalid request method for /books/delete" };

        case "/users":
            if (method === "GET") return getUsers();
            if (method === "POST") return addUser(data.username, data.password);
            return { error: "Invalid request method for /users" };

        case "/users":
            if (method === "POST") {
                console.log("📩 Registering new user:", data);                  
                return addUser(data.username, data.password); // Correctly calling addUser
            }
            return { error: "Invalid request method for /users" };

        default:
            return { error: "Unknown endpoint" };
    }
}
