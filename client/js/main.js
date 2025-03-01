//אחראי לנהל את האירועים שקוראים בכל הדפים ולקרוא לפןנקציות המתאימות
import { registerUser, loginUser } from "./users.js";
import { navigateTo } from "./router.js";  // ✅ Ensure the correct case
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


// 🔹 Load Books in User Collection
function loadBooks() {
    console.log("📚 Fetching books from the server...");
    fetchBooks()
        .then(books => {
            console.log("✅ Books received:", books);
            const booksList = document.getElementById("booksList");
            if (!booksList) return;

            booksList.innerHTML = ""; // Clear previous books

            books.forEach(book => {
                const bookCard = document.createElement("div");
                bookCard.classList.add("book-card");

                bookCard.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>🖊️ ${book.author}</p>
                    <p>📅 ${book.year || "Unknown Year"}</p>
                    <p>📖 ${book.status}</p>
                    <p>${book.description || "No description available"}</p>
                `;

                booksList.appendChild(bookCard);
            });
        })
        .catch(error => {
            console.error("❌ Error fetching books:", error);
        });
}

// 🔹 Load All Books in Database
function loadAllBooks() {
    console.log("📚 Fetching all books from the database...");
    fetchAllBooks()
        .then(books => {
            console.log("✅ All Books received:", books);
            const allBooksList = document.getElementById("allBooksList");
            if (!allBooksList) return;

            allBooksList.innerHTML = ""; // Clear previous books

            books.forEach(book => {
                const bookCard = document.createElement("div");
                bookCard.classList.add("book-card");

                bookCard.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>🖊️ ${book.author}</p>
                    <button onclick="addBookToUser('${book.title}', '${book.author}')">➕ הוסף לספרים שלי</button>
                `;

                allBooksList.appendChild(bookCard);
            });
        })
        .catch(error => {
            console.error("❌ Error fetching all books:", error);
        });
}

// 🔹 Add Book Button Click
window.addBook = function () {
    console.log("📖 Navigating to add books page...");
    navigateTo("add_books_template");
    setTimeout(loadAllBooks, 500); // Load books after navigating
}

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



