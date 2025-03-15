const STORAGE_KEY = "usersData";
const LOGGED_IN_USER_KEY = "loggedInUser"; // ✅ מפתח עבור המשתמש המחובר

// ✅ פונקציה לטעינת כל המשתמשים מ-LocalStorage
export function loadUsers() {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
}

// ✅ פונקציה לשמירת כל המשתמשים ב-LocalStorage
export function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// ✅ פונקציה לקבלת המשתמש המחובר
export function getLoggedInUser() {
    const user = localStorage.getItem(LOGGED_IN_USER_KEY);
    return user ? JSON.parse(user) : null; // אם אין משתמש מחובר נחזיר null
}

// ✅ פונקציה לעדכון המשתמש המחובר
export function setLoggedInUser(username) {
    const users = loadUsers(); 
    const user = users.find(u => u.username === username);
    if (user) {
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user)); 
    }
}

// ✅ פונקציה להתנתקות משתמש
export function logoutUser() {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
}

// ✅ ייצוא כל הפונקציות
export default { loadUsers, saveUsers, getLoggedInUser, setLoggedInUser, logoutUser };
