import { fetchBooks, addNewBook, updateExistingBook, removeBook } from "./booksAPI.js";
import { fetchUsers, registerUser, loginUser } from "./usersAPI.js";

// ✅ פונקציה שמטפלת בבקשות ה-API
export function handleRequest(request) {
    const { method, endpoint, data } = request;
    let response;

    console.log(`📥 Server received request: ${method} ${endpoint}`);
    console.log(`🔍 Received data:`, data);

    switch (endpoint) {
        case "/books":
            if (method === "GET") response = fetchBooks();
            else if (method === "POST") response = addNewBook(data.title, data.author, data.status, data.description, data.year);
            break;

        case "/books/update":
            if (method === "PUT") response = updateExistingBook(data.id, data);
            break;

        case "/books/delete":
            if (method === "DELETE") response = removeBook(data.id);
            break;

        case "/users":
            if (method === "GET") response = fetchUsers();
            else if (method === "POST") response = registerUser(data.username, data.password);
            break;

        case "/users/login":
            if (method === "POST") response = loginUser(data.username, data.password);
            break;

        default:
            response = { error: "Unknown endpoint" };
    }

    console.log(`📤 Server response for ${endpoint}:`, response);
    return response;
}
