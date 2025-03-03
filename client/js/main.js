//אחראי לנהל את האירועים שקוראים בכל הדפים ולקרוא לפןנקציות המתאימות
import { registerUser, loginUser } from "./users.js";
import { navigateTo } from "./router.js";  // ✅ Ensure the correct case
import { addBookToUser, loadBooks } from "./books.js";

//import { loadBooks, displayBooks, deleteBook} from "./books.js";

//import { fetchBooks, fetchAllBooks, addBookToUser } from "./fajax.js"; // ✅ Fetch books via FAJAX


export function attachEventListeners() {
    let loginForm = document.querySelector(".login-form");
    let registerForm = document.querySelector(".register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let errorMessage = document.getElementById("login-error-message");
            console.log("Registering User:", username, password);

            
            try {
                let message = await loginUser(username, password); // בדיקה האם המשתמש רשום או שיש להוסיף אותו
                console.log("✅ Login successful:", message);
                navigateTo("books_template");
                console.log("navigating") 
            } catch (error) {
                console.error("❌ Login failed:", error);
                if (errorMessage) {
                    errorMessage.textContent = error; // Show error message inside login section
                    errorMessage.style.display = "block"; // Ensure it's visible
                }
            }
        });
    }

    console.log("🔍 Checking for register form:", document.querySelector(".register-form"));


    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            console.log("🚀 Register button clicked! Form submission prevented.");
            let username = document.getElementById("register-username").value;
            let password = document.getElementById("register-password").value;
    
            console.log("📩 Registering user:", { username, password }); // ✅ Debugging line
    
            try {
                let message = await registerUser(username, password);
                console.log("✅ Registration successful:", message);
                navigateTo("books_template");
            } catch (error) {
                console.error("❌ Registration failed:", error);
                alert(error);
            }
        });
    }
    
}

document.addEventListener("DOMContentLoaded", function () {
    const addBookButton = document.querySelector("#addBookForm button");

    if (addBookButton) {
        addBookButton.addEventListener("click", function (event) {
            event.preventDefault(); // ✅ Prevent form submission

            let title = document.getElementById("title").value;
            let author = document.getElementById("author").value;

            console.log(`📖 Trying to add book: ${title}, ${author}`);

            if (!title || !author) {
                alert("❌ חייב להזין שם ספר ומחבר!");
                return;
            }

            addBookToUser(title, author);
        });
    }
});

// 🔹 Add Book to User Collection
window.addBookToUser = function (title, author) {
    console.log(`📖 Adding book: ${title}`);
    addBookToUser(title, author)
        .then(response => {
            console.log("✅ Book added:", response);
            alert(`📖 ${title} נוסף לספרים שלך!`);
        })
        .catch(error => {
            console.error("❌ Error adding book:", error);
        });
};



// 🔹 Load Books When Page Loads
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("booksList")) {
        loadBooks();
    }
});



