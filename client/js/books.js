import { FXMLHttpRequest } from "./fajax.js";
import { getLoggedInUser } from "./users.js";
import { navigateTo } from "./router.js";



function addBookToUser(title, author, bookStatus, year, description) {

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
                    alert("📖 הספר נוסף בהצלחה!");

                    // ✅ Navigate to the books page after adding
                    navigateTo("books_template");
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
        books = [];
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
        bookElement.classList.add("book-card");
        bookElement.id = `book-${book.id}`; // ✅ Assign ID correctly

        bookElement.innerHTML = `
          
            <div class="book-header">
                <h3 class="book-title">${book.title}</h3> <!-- ✅ Now has class="book-title" -->  
            </div>
            <p class="book-author">שם הסופר: ${book.author}</p> <!-- ✅ Now has class="book-author" -->
            <p class="book-year">שנת הוצאה: ${book.year || "לא ידוע"}</p> <!-- ✅ Now has class="book-year" -->
            <p class="book-status"> ${book.bookStatus || "לא זמין"} :סטטוס</p> <!-- ✅ Now has class="book-status" -->
            <p class="book-description">תיאור: ${book.description || "אין תיאור"}</p> <!-- ✅ Now has class="book-description" -->
            <button class="delete-btn" onclick="deleteBook(${book.id})">🗑️</button>
            <button class="edit-btn" onclick="updateBookDetails(${book.id})">✏️</button>
          
        `;

        console.log("📚 Book element created with ID:", bookElement.id);
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
    console.log(`✏️ Updating book ${bookId}`);

    getLoggedInUser()
        .then(user => {
            // Find the book card in the DOM
            const bookElement = document.getElementById(`book-${bookId}`);
            if (!bookElement) {
                console.error("❌ Book element not found!");
                return;
            }

            // Extract text values without labels
            const titleElement = bookElement.querySelector(".book-title");
            const authorElement = bookElement.querySelector(".book-author");
            const yearElement = bookElement.querySelector(".book-year");
            const statusElement = bookElement.querySelector(".book-status");
            const descriptionElement = bookElement.querySelector(".book-description");

            // Extract values only (remove labels)
            const titleValue = titleElement.innerText.trim();
            const authorValue = authorElement.innerText.replace("שם הסופר: ", "").trim();
            const yearValue = yearElement.innerText.replace("שנת הוצאה: ", "").trim();
            const statusValue = statusElement.innerText.replace("סטטוס: ", "").trim();
            const descriptionValue = descriptionElement.innerText.replace("תיאור: ", "").trim();

            // Keep labels and replace only values with input fields
            titleElement.innerHTML = `
                <div class="update-book-field">
                    <strong>שם הספר</strong>
                    <input type="text" value="${titleValue}" class="edit-title">
                </div>
            `;

            authorElement.innerHTML = `
                <div class="update-book-field">
                    <strong>שם הסופר</strong>
                    <input type="text" value="${authorValue}" class="edit-author">
                </div>
            `;

            yearElement.innerHTML = `
                <div class="update-book-field">
                    <strong>שנת הוצאה</strong>
                    <input type="number" value="${yearValue}" class="edit-year">
                </div>
            `;

            statusElement.innerHTML = `
                <div class="update-book-field">  
                    <select class="edit-status">
                        <option value="To Read" ${statusValue.includes("To Read") ? "selected" : ""}>To Read</option>
                        <option value="Reading" ${statusValue.includes("Reading") ? "selected" : ""}>Reading</option>
                        <option value="Read" ${statusValue.includes("Read") ? "selected" : ""}>Read</option>
                    </select>
                    <strong>סטטוס</strong>
                </div>
            `;

            descriptionElement.innerHTML = `
               <div class="update-book-field">
                   <strong>תיאור</strong>
                   <textarea class="edit-description">${descriptionValue}</textarea>
               </div>
            `;

            // Change button to "Save"
            const editButton = bookElement.querySelector(".edit-btn");
            editButton.innerHTML = "💾";
            editButton.onclick = function () {
                saveUpdatedBook(bookId, user.username); // ✅ Call `saveUpdatedBook`
            };
        })
        .catch(error => {
            console.error("🚨 Failed to fetch logged-in user:", error);
        });
}


function saveUpdatedBook(bookId, username) {
    console.log(`💾 Sending updated book ${bookId} to the server`);

    const bookElement = document.getElementById(`book-${bookId}`);
    if (!bookElement) {
        console.error("❌ Book element not found in the DOM!");
        return;
    }

    // ✅ Extract updated values
    const newTitle = bookElement.querySelector(".edit-title").value;
    const newAuthor = bookElement.querySelector(".edit-author").value;
    const newYear = bookElement.querySelector(".edit-year").value;
    const newStatus = bookElement.querySelector(".edit-status").value;
    const newDescription = bookElement.querySelector(".edit-description").value;

    const xhr = new FXMLHttpRequest();
    xhr.open("PUT", "/books/update"); // ✅ Send the update request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (response.error) {
            console.error("❌ Error updating book:", response.error);
        } else {
            console.log("✅ Book successfully updated:", response);

            // ✅ Refresh UI using the response from the server
            updateBookUI(bookId, response);
        }
    };

    xhr.onerror = function () {
        console.error("❌ Network error while updating book.");
    };

    xhr.send(JSON.stringify({
        username: username,
        id: bookId, // ✅ Ensure correct ID is sent
        title: newTitle,
        author: newAuthor,
        bookStatus: newStatus,
        description: newDescription,
        year: newYear
    }));
}

function updateBookUI(bookId, book) {
    console.log(`🔄 Updating UI for book ID: ${bookId}`, book);

    const bookElement = document.getElementById(`book-${bookId}`);
    if (!bookElement) {
        console.error("❌ Book element not found in the DOM!");
        return;
    }

    // ✅ Use the correct properties from the `book` object
    bookElement.querySelector(".book-title").innerText = book.title;
    bookElement.querySelector(".book-author").innerHTML = `<strong>שם הסופר: </strong>${book.author}`;
    bookElement.querySelector(".book-year").innerHTML = `<strong>שנת הוצאה: </strong>${book.year}`;
    bookElement.querySelector(".book-status").innerHTML = `${book.bookStatus}<strong> :סטטוס</strong>`;
    bookElement.querySelector(".book-description").innerHTML = `<strong>תיאור: </strong>${book.description}`;

    // Change the button back to "Edit"
    const editButton = bookElement.querySelector(".edit-btn");
    editButton.innerHTML = "✏️";
    editButton.onclick = function () {
        updateBookDetails(bookId);
    };
}

function filterBooks() {
    const searchQuery = document.getElementById("searchInput").value.trim();

    getLoggedInUser().then(user => {
        if (!user) {
            console.error("🚨 No user logged in.");
            return;
        }

        const xhr = new FXMLHttpRequest();
        xhr.open("POST", "/books/search"); // ✅ Use POST instead of GET
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            try {
                console.log("📩 Response received:", xhr.responseText);
                const response = JSON.parse(xhr.responseText);
                if (!response || response.error) {
                    console.warn("⚠️ No matching books found.");
                    updateBookList([]);
                    return;
                }

                console.log("✅ Search results:", response);
                updateBookList(response);
            } catch (e) {
                console.error("❌ JSON Parsing Error:", e);
                updateBookList([]);
            }
        };

        xhr.onerror = function () {
            console.error("❌ Network error while searching books.");
        };

        // Send search term in the request body
        xhr.send(JSON.stringify({ q: searchQuery }));
    }).catch(error => {
        console.error("🚨 Failed to fetch logged-in user:", error);
    });
}





// הוספת הפונקציה ל- `window` כדי שניתן יהיה להשתמש בה בלחיצה על כפתור
window.updateBookDetails = updateBookDetails;
window.deleteBook = deleteBook;
window.filterBooks = filterBooks;

// ייצוא הפונקציות במידה וצריך לשלב במקומות אחרים
export { loadBooks, deleteBook, addBookToUser, updateBookList, filterBooks };