import { FXMLHttpRequest } from "./fajax.js";
import { getLoggedInUser } from "./users.js";


document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("booksList")) {
        loadBooks(); // טוען ספרים כשהעמוד נטען
    }
});


function loadBooks() {
    console.log("📚 Fetching books...");

    getLoggedInUser()
        .then(user => {
            console.log("👤 Logged-in user:", user.username);

            const xhr = new FXMLHttpRequest();
            xhr.open("GET", `/books?username=${user.username}`); 
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                try {
                    const response = JSON.parse(xhr.responseText);
                    console.log("✅ Response received:", response);

                    if (!response || response.error) {
                        console.warn("⚠️ No books found.");
                        displayBooks([]);
                        return;
                    }

                    displayBooks(response);
                } catch (e) {
                    console.error("❌ JSON Parsing Error:", e);
                    displayBooks([]);
                }
            };

            xhr.onerror = function () {
                console.error("❌ Network error while loading books.");
                document.getElementById("booksList").innerHTML = "<p>❌ שגיאת רשת.</p>";
            };

            xhr.send();
        })
        .catch(error => {
            console.error("🚨 Failed to fetch logged-in user:", error);
            document.getElementById("booksList").innerHTML = "<p>❌ שגיאת רשת.</p>";
        });
}





// פונקציה להצגת הספרים בתוך `books_template`
export function displayBooks(books) {
    if (!Array.isArray(books)) {
        console.error("❌ Invalid books data:", books);
        books = []; // Ensure books is always an array
    }

    const booksList = document.getElementById("booksList");

    if (!booksList) {
        console.error("❌ Error: booksList element not found!");
        return;
    }

    booksList.innerHTML = ""; // Clear previous books

    if (books.length === 0) {
        booksList.innerHTML = "<p>📭 אין לך ספרים כרגע. הוסף אחד!</p>";
        return;
    }

    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book-item");

        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>מחבר:</strong> ${book.author}</p>
            <p><strong>סטטוס:</strong> ${book.status}</p>
            <button onclick="deleteBook(${book.id})">🗑️ מחק</button>
        `;

        booksList.appendChild(bookElement);
    });
}


// פונקציה למחיקת ספר
function deleteBook(bookId) {
    if (!confirm("🗑️ האם אתה בטוח שברצונך למחוק את הספר הזה?")) return;

    const xhr = new FXMLHttpRequest();
    xhr.open("DELETE", "/books/delete");

    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (response.error) {
            alert("❌ שגיאה: " + response.error);
        } else {
            alert("✅ הספר נמחק בהצלחה!");
            loadBooks(); // טוען מחדש את הרשימה
        }
    };

    xhr.onerror = function () {
        alert("❌ שגיאת רשת!");
    };

    xhr.send(JSON.stringify({ id: bookId }));
}




// ייצוא הפונקציות במידה וצריך לשלב במקומות אחרים
export { loadBooks, deleteBook };
