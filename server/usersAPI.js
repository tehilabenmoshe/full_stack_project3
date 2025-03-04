import { users, saveUsers, getLoggedInUser, setLoggedInUser } from "../DB/usersData.js";

// ✅ פונקציה לשליפת כל המשתמשים
export function fetchUsers() {
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

// ✅ פונקציה לבדיקה אם משתמש קיים (התחברות)
export function loginUser(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return { error: "Invalid username or password" };
    }

    setLoggedInUser(username); // ✅ שמירת המשתמש המחובר
    return user;
}
