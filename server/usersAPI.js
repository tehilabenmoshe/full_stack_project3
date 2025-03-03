import { users, saveUsers, addUserToStorage, loadUsers} from "../DB/usersData.js";

// פונקציה לשליפת כל המשתמשים
export function getUsers() {
    return users.length
        ? users.map(user => ({ ...user, books: user.books || [] })) // ✅ Ensure books array exists
        : { error: "No users found" };
}



export function addUser(username, password) {
    if (!username || !password) {
        return { error: "Missing required fields" };
    }

    let users = loadUsers(); // 🔹 Load users from `localStorage`

    if (users.find(user => user.username === username)) {
        return { error: "Username already exists" };
    }

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        username,
        password,
        books: [] // ✅ Initialize empty books array
    };

    console.log("🔍 Adding new user:", newUser);

    users.push(newUser);
    saveUsers(users); // ✅ Save updated users to `localStorage`

    return { message: "User added successfully!", user: newUser };
}


export function authenticateUser(username, password) {
    if (!username || !password) {
        return { error: "Missing required fields" };
    }

    let users = loadUsers(); // ✅ Ensure users are loaded

    const user = users.find(user => user.username === username && user.password === password);
    
    if (!user) {
        console.warn("❌ User not found or incorrect password:", username);
        return { error: "Invalid username or password" };
    }

    console.log("✅ User authenticated:", user);
    return { username: user.username, books: user.books || [] }; // ✅ Ensure books array is included
}

