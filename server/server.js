import { fetchBooks, addNewBook, updateExistingBook, removeBook } from "./booksAPI.js";
import { fetchUsers, registerUser, loginUser } from "./usersAPI.js";
import { getLoggedInUser, setLoggedInUser } from "../DB/usersData.js";
let currentLoggedInUser = getLoggedInUser(); 

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


        case "/books/add": 
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
                const searchQuery = data?.q?.toLowerCase() || ""; // Get the search query
                if (!currentLoggedInUser) {
                    response = { error: "No user logged in" };
                } else {
                    console.log(`🔍 Searching books for ${currentLoggedInUser.username}:`, searchQuery);
                        
                    const allBooks = fetchBooks(currentLoggedInUser.username); // Get user's books
            
                    // Filter books based on title or author
                    response = allBooks.filter(book =>
                        book.title.toLowerCase().includes(searchQuery) ||
                        book.author.toLowerCase().includes(searchQuery)
                    );
            
                    console.log("✅ Search results:", response);
                }
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
