const STORAGE_KEY = "usersData";

// פונקציה לטעינת משתמשים מ-LocalStorage
function loadUsers() {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
}

// פונקציה לשמירת משתמשים ב-LocalStorage
function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}


// פונקציה להוספת משתמש ל-LocalStorage
function addUserToStorage(user) {  
    const users = loadUsers();
    users.push(user);
    saveUsers(users);
}

// 🔹 Authenticate user
function authenticateUser(username, password) {
    const users = loadUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) return { error: "Invalid username or password" };

    // 🔹 Save logged-in user in localStorage
    localStorage.setItem(LOGGED_IN_USER_KEY, username);
    return { message: "Login successful!" };
}

// 🔹 Get the currently logged-in user
function getLoggedInUser() {
    return localStorage.getItem(LOGGED_IN_USER_KEY);
}

// 🔹 Log out the user
function logoutUser() {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
}




// טעינת משתמשים
const users = loadUsers();



export { users, loadUsers, saveUsers, addUserToStorage, authenticateUser, getLoggedInUser, logoutUser };
