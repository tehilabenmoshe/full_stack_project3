import { FXMLHttpRequest } from "./fajax.js";

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("booksList")) {
        loadBooks(); // טוען ספרים כשהעמוד נטען
    }
});

// פונקציה לטעינת כל הספרים מהשרת
function loadBooks() {
    const xhr = new FXMLHttpRequest();
    xhr.open("GET", "/books");

    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (response.error) {
            console.error("❌ Error loading books:", response.error);
            document.getElementById("booksList").innerHTML = "<p>❌ שגיאה בטעינת הספרים.</p>";
        } else {
            displayBooks(response);
        }
    };

    xhr.onerror = function () {
        console.error("❌ Network error while loading books.");
        document.getElementById("booksList").innerHTML = "<p>❌ שגיאת רשת.</p>";
    };

    xhr.send();
}

// פונקציה להצגת הספרים בתוך `books_template`
function displayBooks(books) {
    const booksList = document.getElementById("booksList");
    booksList.innerHTML = ""; // מנקה תוכן קודם

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

//document.getElementById("addBookButton").addEventListener("click", () => {
  //  navigateTo("add_books_template");
//});




// ייצוא הפונקציות במידה וצריך לשלב במקומות אחרים
export { loadBooks, deleteBook };
