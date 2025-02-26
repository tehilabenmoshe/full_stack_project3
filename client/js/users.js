import FXMLHttpRequest from "./fajax.js";

// פונקציה לרישום משתמש חדש
export function registerUser(username, password) {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("POST", "/users");
        xhr.onreadystatechange = function () {
            if (xhr.responseText) {
                let response = JSON.parse(xhr.responseText);
                response.error ? reject(response.error) : resolve(response);
            }
        };
        xhr.send(JSON.stringify({ username, password }));
    });
}

// פונקציה להתחברות משתמש
export function loginUser(username, password) {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("POST", "/users/login");
        xhr.onreadystatechange = function () {
            if (xhr.responseText) {
                let response = JSON.parse(xhr.responseText);
                response.error ? reject(response.error) : resolve(response);
            }
        };
        xhr.send(JSON.stringify({ username, password }));
    });
}

// פונקציה לשליפת המשתמש המחובר
export function getLoggedInUser() {
    return new Promise((resolve, reject) => {
        let xhr = new FXMLHttpRequest();
        xhr.open("GET", "/users");
        xhr.onreadystatechange = function () {
            if (xhr.responseText) {
                let response = JSON.parse(xhr.responseText);
                response.error ? reject(response.error) : resolve(response);
            }
        };
        xhr.send();
    });
}
