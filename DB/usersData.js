const STORAGE_KEY = "usersData";
const LOGGED_IN_USER_KEY = "loggedInUser"; // ✅ מפתח עבור המשתמש המחובר

// ✅ פונקציה לטעינת כל המשתמשים מ-LocalStorage
function loadUsers() {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
}

// ✅ פונקציה לשמירת כל המשתמשים ב-LocalStorage
function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// ✅ פונקציה לקבלת המשתמש המחובר
function getLoggedInUser() {
    const user = localStorage.getItem(LOGGED_IN_USER_KEY);
    return user ? JSON.parse(user) : null; // אם אין משתמש מחובר נחזיר null
}

// ✅ פונקציה לעדכון המשתמש המחובר
function setLoggedInUser(username) {
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify({ username }));
}

// ✅ פונקציה להתנתקות משתמש
function logoutUser() {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
}

// 🔹 טוענים את כל המשתמשים לזיכרון
const users = loadUsers();

export { users,loadUsers, saveUsers, getLoggedInUser, setLoggedInUser, logoutUser };
