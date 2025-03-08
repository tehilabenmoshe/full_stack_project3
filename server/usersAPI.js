
import {loadUsers, saveUsers, getLoggedInUser, setLoggedInUser } from "../DB/usersData.js";


// ✅ פונקציה לשליפת כל המשתמשים
export function fetchUsers() {
    const users = loadUsers(); // 🔹 טוען את המשתמשים מה-LocalStorage
    return users.length ? users : { error: "No users found" };
}

// ✅ פונקציה להוספת משתמש חדש
export function registerUser(username, password) {
    if (!username || !password) {
        return { error: "Missing required fields" };
    }

    if (users.find(user => user.username === username)) {
        return { error: "Username already exists" };
    }

    const newUser = { username, password, books: [] };
    users.push(newUser);
    saveUsers(users);

    setLoggedInUser(username); // ✅ שמירת המשתמש המחובר
    return newUser;
}


// ✅ פונקציה להתחברות משתמש קיים
export function loginUser(username, password) {
    const users = loadUsers() || []; // טוען את כל המשתמשים או מחזיר מערך ריק
    if (users.length === 0) {
        return { error: "No users found" }; // אם אין משתמשים כלל
    }

    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return { error: "Invalid username or password" }; // שם משתמש או סיסמה שגויים
    }

    setLoggedInUser(username); // ✅ שומר את המשתמש המחובר
    return user;
}



