import { fetchUsers, registerUser, loginUser } from "./usersAPI.js";
import { getLoggedInUser, setLoggedInUser } from "../DB/usersData.js";

let currentLoggedInUser = getLoggedInUser(); 

function syncLoggedInUser() {
    currentLoggedInUser = getLoggedInUser(); // 🔹 טוען מחדש את המשתמש מ-LocalStorage
}

// ✅ פונקציה שמטפלת בבקשות ה-API
export function handleUserRequest(request) {
    syncLoggedInUser(); 
    const { method, endpoint, data } = request;
    let response = { status: 200 }; // 🔹 ברירת מחדל: OK

    console.log(`📥 Server received request: ${method} ${endpoint}`);
    console.log(`🔍 Received data:`, data);

    switch (endpoint) {
        
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
            break

        default:
            response = { error: "Unknown endpoint", status: 404 };
    }

    console.log(`📤 Server response for ${endpoint}:`, response);
    return response;
}
