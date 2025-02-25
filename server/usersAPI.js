import { users, saveUsers } from "../database/usersData.js";

// פונקציה לשליפת כל המשתמשים
export function getUsers() {
    return users.length ? users : { error: "No users found" };
}

// פונקציה להוספת משתמש חדש
export function addUser(username, password) {
    if (!username || !password) {
        return { error: "Missing required fields" }; // בדיקה שהוזנו פרטים
    }

    if (users.find(user => user.username === username)) {
        return { error: "Username already exists" };
    }

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        username,
        password
    };

    users.push(newUser);
    saveUsers(users); // שמירה לאחר הוספת משתמש חדש
    return newUser;
}

// פונקציה לבדיקה אם משתמש קיים
export function authenticateUser(username, password) {
    if (!username || !password) {
        return { error: "Missing required fields" }; // בדיקה שהוזנו פרטים
    }

    const user = users.find(user => user.username === username && user.password === password);
    
    return user ? user : { error: "Invalid username or password" }; // החזרת שגיאה במקרה של התחברות לא מוצלחת
}
