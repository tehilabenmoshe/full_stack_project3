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


        case "/books/add": 
            if (method === "POST") {
                if (!currentLoggedInUser) {
                    response = { error: "No user logged in" };
                } else if (!data || !data.title || !data.author) {
                    response = { error: "Missing book details" };
                } else {
                    response = addNewBook(
                        currentLoggedInUser.username, 
                        data.title, 
                        data.author, 
                        data.bookStatus,
                        data.description || "", 
                        data.year || "Unknown"
                    );
                }
            }
            break;
        
          
        case "/books/update":
            console.log("📩 עדכון ספר:", data);
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


        case "/books/details":
            if (method === "GET") {
               const bookId = data?.id;
                if (!bookId) {
                    response = { error: "Missing book ID" };
                } else {
                    response = getBookById(bookId); // ✅ Fetch book from database
                }               
            }
            break;


        case "/books/search":
            if (method === "POST") {
                const searchQuery = data?.q || ""; // קבלת השאילתא
                if (!currentLoggedInUser) {
                    response = { error: "No user logged in" };
                } else {
                    response = searchBooks(searchQuery); // ✅ שימוש בפונקציה מה-API
                }
            }
            break;

        default:
            response = { error: "Unknown endpoint", status: 404 };
    }

    console.log(`📤 Server response for ${endpoint}:`, response);
    return response;
}
