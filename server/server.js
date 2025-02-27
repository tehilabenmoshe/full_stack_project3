import { getBooks, addBook, updateBook, deleteBook } from "./booksAPI.js";
import { getUsers, addUser, authenticateUser } from "./usersAPI.js";

// פונקציה שמטפלת בבקשות מהלקוח
export function handleRequest(request) {
    const { method, endpoint, data } = request;

    console.log(`📥 Server received request: ${method} ${endpoint}`); // ✅ הדפסה לבדיקה שהבקשה הגיעה
    console.log(`🔍 Received data:`, data); // ✅ נבדוק מה השרת באמת מקבל

    let response;

    switch (endpoint) {
        case "/books":
            if (method === "GET") response = getBooks();
            if (method === "POST") {
                if (!data || !data.title || !data.author) {
                    console.warn(`⚠️ Missing book fields!`);
                    response = { error: "Missing required book fields" };
                } else {
                    response = addBook(data.title, data.author, data.status, data.description, data.year);
                }
            }
            break;

        case "/books/update":
            if (method === "PUT") {
                if (!data || !data.id) {
                    console.warn(`⚠️ Missing book ID!`);
                    response = { error: "Missing book ID" };
                } else {
                    response = updateBook(data.id, data);
                }
            }
            break;

        case "/books/delete":
            if (method === "DELETE") {
                if (!data || !data.id) {
                    console.warn(`⚠️ Missing book ID for delete!`);
                    response = { error: "Missing book ID" };
                } else {
                    response = deleteBook(data.id);
                }
            }
            break;

        case "/users":
            if (method === "GET") {
                response = getUsers();
            } 
            else if (method === "POST") {                    
                console.log("📩 Registering new user:", data); // ✅ הדפסה לראות בדיוק מה מתקבל
                   // 🔹 נוודא שהנתונים לא undefined
                if (!data) {
                    console.error("🚨 ERROR: `data` is undefined!");}
                    
                    // 🔹 נוודא שהנתונים קיימים ומודפסים נכון
                console.log("🔍 Checking username:", data?.username);
                console.log("🔍 Checking password:", data?.password);
            

                if (!data || !data.username || !data.password) {
                    console.warn(`⚠️ Missing user fields!`);
                    response = { error: "Missing required fields" };
                } else {
                    response = addUser(data.username, data.password);
                    console.log("✅ New user added with ID:", response.id); // ✅ נוודא שה-id נוצר
                }
            }
            break;

        case "/users/login":
            if (method === "POST") {
                if (!data || !data.username || !data.password) {
                    console.warn(`⚠️ Missing login credentials!`);
                    response = { error: "Missing login fields" };
                } else {
                    response = authenticateUser(data.username, data.password);
                }
            }
            break;

        default:
            response = { error: "Unknown endpoint" };
    }

    console.log(`📤 Server response for ${endpoint}:`, response); // ✅ נראה מה השרת באמת מחזיר
    return response;
}
