//אחראי לנהל את האירועים שקוראים בכל הדפים ולקרוא לפןנקציות המתאימות
import { registerUser, loginUser } from "./users.js";
import { navigateTo } from "./router.js";  // ✅ Ensure the correct case


export function attachEventListeners() {
    let loginForm = document.querySelector(".login-form");
    let registerForm = document.querySelector(".register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            try {
                let message = await loginUser(username, password); // בדיקה האם המשתמש רשום או שיש להוסיף אותו
                console.log("✅ Login successful:", message);
                navigateTo("books_template");
                console.log("navigating") 
            } catch (error) {
                alert(error);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            let username = document.getElementById("register-username").value;
            let password = document.getElementById("register-password").value;

            try {
                let message = await registerUser(username, password);
                console.log("✅ Registration successful:", message);
                navigateTo("books_template");
            } catch (error) {
                alert(error);
            }
        });
    }
}

