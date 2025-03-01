import { attachEventListeners } from "./main.js";

function loadPage(page) {
    let template = document.getElementById(page); // Find the template by ID
    if (template) {
        document.getElementById("app").innerHTML = template.innerHTML; // Load the template into #app
        attachEventListeners(); // Reattach form event listeners after page load
    } else {
        document.getElementById("app").innerHTML = "<h2>❌ דף לא נמצא</h2><p>נסה שוב מאוחר יותר.</p>"; // Page not found
    }
}


// Function to handle navigation without reloading the page
export function navigateTo(page) {
    history.pushState({}, "", `#${page}`); // Update the URL
    loadPage(page); // Load the requested page

        // 🔹 אם אנחנו ב-דף "add_books_template" צריך לוודא שהסקריפט של הוספת ספרים נטען
        if (page === "add_books_template") {
            import("./books.js").then(module => {
                console.log("📚 books.js Loaded!");
            }).catch(error => console.error("❌ Error loading Books.js", error));
        }
}

// Event listener for all links with `data-route`
document.addEventListener("click", function (event) {
    if (event.target.tagName === "A" && event.target.dataset.route) {
        event.preventDefault();
        navigateTo(event.target.dataset.route);
    }
});

// Handle browser navigation (Back/Forward buttons)
window.addEventListener("popstate", function () {
    let page = location.hash.replace("#", "") || "login"; // Default to 'login'
    loadPage(page);
});

// Load the correct page on initial load
document.addEventListener("DOMContentLoaded", function () {
    let page = location.hash.replace("#", "") || "login"; // Default page
    loadPage(page);
});
