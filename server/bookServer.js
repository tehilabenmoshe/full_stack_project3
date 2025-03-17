import { fetchBooks, addNewBook, updateExistingBook, removeBook, searchBooks } from "./booksAPI.js";
import { getLoggedInUser } from "../DB/usersData.js";

let currentLoggedInUser = getLoggedInUser(); 

function syncLoggedInUser() {
    currentLoggedInUser = getLoggedInUser(); // 🔹 טוען מחדש את המשתמש מ-LocalStorage
}

// ✅ פונקציה שמטפלת בבקשות ה-API
export function handleBookRequest(request) {
    syncLoggedInUser(); 
    const { method, endpoint, data } = request;
    let response = { status: 200 }; // 🔹 ברירת מחדל: OK

    console.log(`📥 Server received request: ${method} ${endpoint}`);
    console.log(`🔍 Received data:`, data);

    switch (endpoint) {
        case "/books":
            if (method === "GET") {
                if (!currentLoggedInUser) {
                    response = { error: "No user logged in", status: 401 };
                } else {
                    response = { data: fetchBooks(currentLoggedInUser.username), status: 200 };
                }
            }
            break;

        case "/books/add":
            if (method === "POST") {
                if (!currentLoggedInUser) {
                    response = { error: "No user logged in", status: 401 };
                } else if (!data || !data.title || !data.author) {
                    response = { error: "Missing book details", status: 400 };
                } else {
                    response = { data: addNewBook(
                        currentLoggedInUser.username, 
                        data.title, 
                        data.author, 
                        data.bookStatus,
                        data.description || "", 
                        data.year || "Unknown"
                    ), status: 201 }; // 🔹 201 = Created
                }
            }
            break;

        case "/books/update":
            if (method === "PUT") {
                if (!currentLoggedInUser) {
                    response = { error: "No user logged in", status: 401 };
                } else {
                    const updatedBook = updateExistingBook(data.id, data);
                    response = updatedBook.error ? { error: updatedBook.error, status: 400 } : { data: updatedBook, status: 200 };
                }
            }
            break;

        case "/books/delete":
            if (method === "DELETE") {
                if (!currentLoggedInUser) {
                    response = { error: "No user logged in", status: 401 };
                } else {
                    const deletedBook = removeBook(data.id);
                    response = deletedBook.error ? { error: deletedBook.error, status: 400 } : { data: deletedBook, status: 200 };
                }
            }
            break;

        case "/books/search":
            if (method === "POST") {
                if (!currentLoggedInUser) {
                    response = { error: "No user logged in", status: 401 };
                } else {
                    const searchQuery = data?.q || "";
                    console.log(`🔍 Searching books for ${currentLoggedInUser.username}: ${searchQuery}`);
                    response = { data: searchBooks(searchQuery), status: 200 };
                }
            }
            break;

        default:
            response = { error: "Unknown endpoint", status: 404 };
    }

    console.log(`📤 Server response for ${endpoint}:`, response);
    return response;
}
