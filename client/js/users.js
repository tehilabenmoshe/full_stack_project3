import { FXMLHttpRequest } from "./fajax.js"; 
// פונקציה לרישום משתמש חדש
export function registerUser(username, password) {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("POST", "/users");

        console.log("🚀 Sending request to register user:", { username, password });

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            console.log("📩 Response received:", xhr.responseText);
            let response = JSON.parse(xhr.responseText);

            if (response.error) {
                if (response.error.includes("already taken")) {
                    console.warn("⚠️ Username already exists.");
                    reject("⚠️ This username is already registered. Try logging in.");
                } else {
                    reject(response.error); // שגיאה אחרת
                }
            } else {
                console.log("✅ Registration successful!");
                resolve(response);
            }
        };

        xhr.onerror = function () {
            console.error("❌ Network error while registering user.");
            reject("❌ A network error occurred. Please try again.");
        };

        xhr.send(JSON.stringify({ username, password }));
    });
}



// פונקציה להתחברות משתמש
export function loginUser(username, password) {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("POST", "/users/login");

        xhr.onload = function () {
            console.log("📩 Login Response:", xhr.responseText);
            let response = JSON.parse(xhr.responseText);

            if (response.error) {
                reject(response.error);
            } else {
                console.log("✅ Login successful, requesting user session...");

                // ✅ After successful login, request the logged-in user
                getLoggedInUser().then(user => {
                    console.log("👤 Current logged-in user:", user);
                    resolve(user);
                }).catch(error => {
                    reject(error);
                });
            }
        };

        xhr.onerror = function () {
            reject("Invalid username or password");
        };
        xhr.send(JSON.stringify({ username, password }));
    });
}


export function getLoggedInUser() {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("GET", "/users/session"); // ✅ Ask the server for the current user

        xhr.onload = function () {
            console.log("📩 Current user session response:", xhr.responseText);
            let response = JSON.parse(xhr.responseText);
            response.error ? reject(response.error) : resolve(response);
        };

        xhr.onerror = function () {
            console.error("❌ Network error while fetching user session.");
            reject("Network error");
        };

        xhr.send(); 
    });
}


