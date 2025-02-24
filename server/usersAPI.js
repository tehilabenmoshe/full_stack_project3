
import users from "../../DB/usersData.js";
// פונקציה לשליפת כל המשתמשים
export function getUsers() {
    return users;
}

// פונקציה להוספת משתמש חדש
export function addUser(username, password) {
    if (users.find(user => user.username === username)) {
        return { error: "Username already exists" };
    }

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        username,
        password
    };
    
    users.push(newUser);
    return newUser;
}

// פונקציה לבדיקה אם משתמש קיים
export function authenticateUser(username, password) {
    return users.find(user => user.username === username && user.password === password);
}
