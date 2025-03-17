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
                response = { data: fetchUsers(), status: 200 };
            } else if (method === "POST") {
                const userResponse = registerUser(data.username, data.password);
                response = userResponse.error ? { error: userResponse.error, status: 409 } : { data: userResponse, status: 201 };
            }
            break;

        case "/users/login":
            if (method === "POST") {
                response = loginUser(data.username, data.password);
                if (response.error) {
                    response = { error: response.error, status: 401 };
                } else {
                    setLoggedInUser(data.username);
                    currentLoggedInUser = response;
                    response = { data: response, status: 200 };
                }
            }
            break;

        case "/users/session":
            const user = getLoggedInUser();
            response = user ? { data: user, status: 200 } : { error: "No user session", status: 401 };
            break;

        default:
            response = { error: "Unknown endpoint", status: 404 };
    }

    console.log(`📤 Server response for ${endpoint}:`, response);
    return response;
}
