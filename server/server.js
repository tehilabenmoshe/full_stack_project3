import { fetchBooks, addNewBook, updateExistingBook, removeBook } from "./booksAPI.js";
import { fetchUsers, registerUser, loginUser } from "./usersAPI.js";
import { getLoggedInUser, setLoggedInUser } from "../DB/usersData.js";
let currentLoggedInUser = getLoggedInUser(); // ✅ טעינת משתמש מחובר אם קיים

function syncLoggedInUser() {
    currentLoggedInUser = getLoggedInUser(); // 🔹 תמיד טוען מחדש את המשתמש מ-LocalStorage
}


// ✅ פונקציה שמטפלת בבקשות ה-API
export function handleRequest(request) {
    syncLoggedInUser(); // 🔹 לפני עיבוד הבקשה נוודא שהמשתמש מעודכן
    const { method, endpoint, data } = request;
    let response;

    console.log(`📥 Server received request: ${method} ${endpoint}`);
    console.log(`🔍 Received data:`, data);

    switch (endpoint) {
        case "/books":
            if (method === "GET") {
                response = currentLoggedInUser ? fetchBooks(currentLoggedInUser.username) : { error: "No user logged in" };
            } 
            else if (method === "POST") {
                if (!data || !data.username) {
                    response = { error: "Missing username in request" };
                } else {
                    console.log("📚 Fetching books for:", data.username);
                    response = fetchBooks(data.username); // ✅ Fetch books for requested user
                }
            }
            break;


            case "/books/add": // ✅ New endpoint for adding a book
            if (method === "POST") {
                if (!currentLoggedInUser) {
                    response = { error: "No user logged in" };
                } else if (!data || !data.title || !data.author) {
                    response = { error: "Missing book details" };
                } else {
                    console.log(`📖 Adding book for ${currentLoggedInUser.username}:`, data.title);
                    response = addNewBook(
                        currentLoggedInUser.username, 
                        data.title, 
                        data.author, 
                        data.status || "To Read", // ✅ Default status
                        data.description || "", 
                        data.year || "Unknown"
                    );
                }
            }
            break;
        


        case "/books/update":
            if (method === "PUT") {
                response = currentLoggedInUser ? updateExistingBook(data.id, data)
                                               : { error: "No user logged in" };
            }
            break;

        case "/books/delete":
            if (method === "DELETE") {
                response = currentLoggedInUser ? removeBook(data.id)
                                               : { error: "No user logged in" };
            }
            break;

        case "/users":
            if (method === "GET") {
                response = fetchUsers();
            } 
            else if (method === "POST") {
                response = registerUser(data.username, data.password);
            }
            break;

        case "/users/login":
            response = loginUser(data.username, data.password);
            if (!response.error) {
                setLoggedInUser(data.username); // ✅ שמירת המשתמש ב-LocalStorage
                currentLoggedInUser = response; // ✅ שמירת המשתמש המחובר
            }
            break;

        case "/users/session":
            response = getLoggedInUser() || { error: "No user session" }; // ✅ בדיקה דרך LocalStorage
            break;

        default:
            response = { error: "Unknown endpoint" };
    }

    console.log(`📤 Server response for ${endpoint}:`, response);
    return response;
}
