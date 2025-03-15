import { attachEventListeners } from "./main.js";
import { loadBooks } from "./books.js"; // ✅ Import the new function

function loadPage(page) {
    let template = document.getElementById(page); // Find the template by ID
    if (template) {
        document.getElementById("app").innerHTML = template.innerHTML; // Load the template into #app
        attachEventListeners(); // Reattach form event listeners after page load
    } else {
        document.getElementById("app").innerHTML = "<h2>❌ דף לא נמצא</h2><p>נסה שוב מאוחר יותר.</p>"; 
    }
}

export function navigateTo(templateId) {
    const app = document.getElementById("app");
    const template = document.getElementById(templateId);

    if (!template) {
        console.error("❌ Template not found:", templateId);
        return;
    }

    app.innerHTML = template.innerHTML; // Load new template
    console.log(`✅ Loaded template: ${templateId}`);

    // ✅ Attach event listeners AFTER the page content loads
    setTimeout(() => { 
        attachEventListeners();
    }, 0); 

    if (templateId === "books_template") {
        console.log("📚 Loading books...");
        loadBooks();  
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
