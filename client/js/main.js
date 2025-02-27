//אחראי לנהל את האירועים שקוראים בכל הדפים ולקרוא לפןנקציות המתאימות
import { registerUser, loginUser } from "./users.js"; // ✅ Ensure the correct case


document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.querySelector(".login-form");
    let registerForm = document.querySelector(".register-form");


    //  פונקציונליות לטופס התחברות
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // למנוע טעינה מחדש של הדף
            let username = document.getElementById("login-username").value;
            let password = document.getElementById("login-password").value;

            try {
                let message = await loginUser(username, password);
                alert(message);
                window.location.href = "book_page.html"; // מעבר לעמוד הראשי לאחר התחברות
            } catch (error) {
                alert(error);
            }
        });
    }

    //  פונקציונליות לטופס הרשמה
    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // למנוע טעינה מחדש של הדף
            let username = document.getElementById("register-username").value;
            let password = document.getElementById("register-password").value;

            try {
                let message = await registerUser(username, password);
                alert(message);
                window.location.href = "login.html"; // מעבר לעמוד התחברות לאחר הרשמה
            } catch (error) {
                alert(error);
            }
        });
    }
});
