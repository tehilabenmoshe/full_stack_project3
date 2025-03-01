import { FXMLHttpRequest } from "./fajax.js"; 
// פונקציה לרישום משתמש חדש
export function registerUser(username, password) {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("POST", "/users");

        console.log("🚀 Sending request to register user:", { username, password });
        // ✅ הוספת כותרת JSON
        xhr.setRequestHeader("Content-Type", "application/json");

        // ✅ Use `onload` to handle the response when the request finishes
        xhr.onload = function () {
            console.log("📩 Response received:", xhr.responseText);
            let response = JSON.parse(xhr.responseText);
            response.error ? reject(response.error) : resolve(response);
        };

        xhr.onerror = function () {
            console.error(" Network error while registering user.");
            reject("Network error");
        };

        xhr.send(JSON.stringify({ username, password }));
    });
}

// פונקציה להתחברות משתמש
export function loginUser(username, password) {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("POST", "/users/login");

        // ✅ Use `onload` to handle the response when the request finishes
        xhr.onload = function () {
            console.log("📩 Login Response:", xhr.responseText);
            let response = JSON.parse(xhr.responseText);
            response.error ? reject(response.error) : resolve(response);
        };

        xhr.onerror = function () {
            console.error("❌ Network error while logging in.");
            reject("Invalid username or password");
        };

        xhr.send(JSON.stringify({ username, password }));
    });
}

// פונקציה לשליפת המשתמש המחובר
/*export function getLoggedInUser() {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("GET", "/users");
        
        xhr.onreadystatechange = function () {
            if (xhr.responseText) {
                let response = JSON.parse(xhr.responseText);
                response.error ? reject(response.error) : resolve(response);
            }
        };
        xhr.send(JSON.stringify({ username, password }));
    });
}*/

export function getLoggedInUser() {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("GET", "/users");

        xhr.onload = function () {
            if (xhr.responseText) {
                let response = JSON.parse(xhr.responseText);
                response.error ? reject(response.error) : resolve(response);
            }
        };

        xhr.onerror = function () {
            console.error("❌ Network error while fetching user.");
            reject("Network error");
        };

        xhr.send(); // ✅ `GET` לא שולח נתונים בגוף הבקשה
    });
}


