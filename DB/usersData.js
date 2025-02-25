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

// טעינת משתמשים
const users = loadUsers();

export { users, saveUsers };
