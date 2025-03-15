import { FXMLHttpRequest } from "./fajax.js";
import { getLoggedInUser } from "./users.js";



// function addBookToUser(title, author) {
//     console.log(📖 Adding book: ${title}, ${author});

//     getLoggedInUser()
//         .then(user => {
//             console.log("👤 Logged-in user:", user.username);

//             const xhr = new FXMLHttpRequest();
//             xhr.open("POST", "/books/add"); // ✅ Use POST for adding a book
//             xhr.setRequestHeader("Content-Type", "application/json");

//             xhr.onload = function () {
//                 const response = JSON.parse(xhr.responseText);

//                 if (response.error) {
//                     console.error("❌ Error adding book:", response.error);
//                 } else {
//                     console.log("✅ Book added successfully:", response);
//                     alert(📖 ${title} נוסף לספרים שלך!);
//                     loadBooks(); // ✅ Reload books after adding
//                 }
//             };

//             xhr.onerror = function () {
//                 console.error("❌ Network error while adding book.");
//             };
//             xhr.send(JSON.stringify({ 
//                 username: user.username,
//                 title: title,
//                 author: author,
//                 year: year,
//                 description: description
//             }));
            

//         })
//         .catch(error => {
//             console.error("🚨 Failed to fetch logged-in user:", error);
//         });
// }

function addBookToUser(title, author, bookStatus, year, description) {
    // console.log(📖 Sending book, { title, author, bookStatus, year, description });

    getLoggedInUser()
        .then(user => {
            const xhr = new FXMLHttpRequest();
            xhr.open("POST", "/books/add");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                const response = JSON.parse(xhr.responseText);
                if (response.error) {
                    console.error("❌ Error adding book:", response.error);
                } else {
                    console.log("✅ Book added successfully:", response);
                    // alert(📖 ${title}, "good");
                    alert(good);
                    loadBooks(); // רענון הרשימה
                }
            };

            xhr.onerror = function () {
                console.error("❌ Network error while adding book.");
            };

            xhr.send(JSON.stringify({
                username: user.username,
                title: title,
                author: author,
                bookStatus: bookStatus,
                description: description,
                year: year
            }));
        })
        .catch(error => {
            console.error("🚨 Failed to fetch logged-in user:", error);
        });
}








function loadBooks() {
    console.log("📚 Fetching books...");

    getLoggedInUser()
        .then(user => {
            console.log("👤 Logged-in user:", user.username);

            const xhr = new FXMLHttpRequest();

            xhr.open("GET", "/books");

            //xhr.open("POST", "/books"); // ✅ Use POST instead of GET with query params
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                try {
                    const response = JSON.parse(xhr.responseText);
                    console.log("✅ Response received:", response);

                    if (!response || response.error) {
                        console.warn("⚠️ No books found.");
                        updateBookList([]);
                        return;
                    }

                    updateBookList(response);
                } catch (e) {
                    console.error("❌ JSON Parsing Error:", e);
                    updateBookList([]);
                }
            };

            xhr.onerror = function () {
                console.error("❌ Network error while loading books.");
                document.getElementById("booksList").innerHTML = "<p>❌ שגיאת רשת.</p>";
            };

            xhr.send();

            // xhr.send(JSON.stringify({ username: user.username })); // ✅ Send username in body
        })
        .catch(error => {
            console.error("🚨 Failed to fetch logged-in user:", error);
            document.getElementById("booksList").innerHTML = "<p>❌ שגיאת רשת.</p>";
        });
}


// 🔹 Function to update the book list in the UI
function updateBookList(books) {
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
        bookElement.classList.add("book-card"); // ✅ Apply new styling class

        bookElement.innerHTML = `
    <div class="book-header">
        <h3>${book.title}</h3>
    </div>
    <p><strong>מחבר:</strong> ${book.author}</p>
    <p><strong>שנה:</strong> ${book.year || "לא ידוע"}</p>
    <p><strong>סטטוס:</strong> ${book.bookStatus || "לא זמין"}</p>
    <p class="book-description">${book.description || "אין תיאור"}</p>
    <button class="delete-btn" onclick="deleteBook(${book.id})">🗑️</button>
    <button class="update-btn" onclick="updateBookDetails(${book.id})">✏️</button>
`;

        ;
        console.log("📚 נתוני הספר שמתקבלים מהשרת:", book);

        booksList.appendChild(bookElement);
    });

}

//מחיקת ספר
function deleteBook(bookId) {
    if (!confirm("🗑️ האם אתה בטוח שברצונך למחוק את הספר הזה?")) return;

    getLoggedInUser()
        .then(user => {
            const xhr = new FXMLHttpRequest();
            xhr.open("DELETE", "/books/delete");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                const response = JSON.parse(xhr.responseText);
                if (response.error) {
                    alert("❌ שגיאה: " + response.error);
                } else {
                    alert("✅ הספר נמחק בהצלחה!");
                    loadBooks(); // מרענן את רשימת הספרים
                }
            };

            xhr.onerror = function () {
                alert("❌ שגיאת רשת!");
            };

            xhr.send(JSON.stringify({ username: user.username, id: bookId })); // 🔹 שולחים גם את שם המשתמש
        })
        .catch(error => {
            alert("❌ שגיאה בהשגת המשתמש: " + error);
        });
}


function updateBookDetails(bookId) {
    const newTitle = prompt("📖 הכנס שם ספר חדש:");
    if (!newTitle) return;

    const newAuthor = prompt("✍️ הכנס שם מחבר חדש:");
    if (!newAuthor) return;

    const newYear = prompt("📆 הכנס שנת פרסום:");
    const newStatus = prompt("📌 הכנס סטטוס (To Read, Reading, Read):");
    const newDescription = prompt("📝 הכנס תיאור חדש:");

    console.log(`✏️ Updating book ${bookId}:`, { newTitle, newAuthor, newYear, newStatus, newDescription });

    getLoggedInUser()
        .then(user => {
            const xhr = new FXMLHttpRequest();
            xhr.open("PUT", "/books/update");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                const response = JSON.parse(xhr.responseText);
                if (response.error) {
                    console.error("❌ Error updating book:", response.error);
                } else {
                    console.log("✅ Book updated successfully:", response);
                    alert(`📖 ${newTitle} עודכן בהצלחה!`);
                    loadBooks(); // מרענן את הרשימה
                }
            };

            xhr.onerror = function () {
                console.error("❌ Network error while updating book.");
            };

            xhr.send(JSON.stringify({
                username: user.username,
                id: bookId,
                title: newTitle,
                author: newAuthor,
                bookStatus: newStatus,
                description: newDescription,
                year: newYear
            }));
        })
        .catch(error => {
            console.error("🚨 Failed to fetch logged-in user:", error);
        });
}

// // הוספת אפשרות לעריכת ספר בתצוגה
// function updateBookList(books) {
//     if (!Array.isArray(books)) {
//         console.error("❌ Invalid books data:", books);
//         books = [];
//     }

//     const booksList = document.getElementById("booksList");
//     if (!booksList) {
//         console.error("❌ Error: booksList element not found!");
//         return;
//     }

//     booksList.innerHTML = ""; 

//     if (books.length === 0) {
//         booksList.innerHTML = "<p>📭 אין לך ספרים כרגע. הוסף אחד!</p>";
//         return;
//     }

//     books.forEach(book => {
//         const bookElement = document.createElement("div");
//         bookElement.classList.add("book-card");

//         bookElement.innerHTML = `
//             <div class="book-header">
//                 <h3>${book.title}</h3>
//             </div>
//             <p><strong>מחבר:</strong> ${book.author}</p>
//             <p><strong>שנה:</strong> ${book.year || "לא ידוע"}</p>
//             <p><strong>סטטוס:</strong> ${book.bookStatus}</p>
//             <p class="book-description">${book.description || "אין תיאור"}</p>
//             <button class="edit-btn" onclick="updateBookDetails(${book.id})">✏️ ערוך</button>
//             <button class="delete-btn" onclick="deleteBook(${book.id})">🗑️ מחק</button>
//         `;
//         console.log("📚 נתוני הספר שמתקבלים מהשרת:", book);

//         booksList.appendChild(bookElement);
//     });
// }

// הוספת הפונקציה ל- `window` כדי שניתן יהיה להשתמש בה בלחיצה על כפתור
window.updateBookDetails = updateBookDetails;


window.deleteBook = deleteBook;

// ייצוא הפונקציות במידה וצריך לשלב במקומות אחרים
export { loadBooks, deleteBook, addBookToUser, updateBookList };