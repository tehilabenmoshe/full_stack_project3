import { handleRequest } from "./server.js"; // מבצע ניתוב של הבקשות

class Network {
    constructor(lossProbability = 0.1, minDelay = 1000, maxDelay = 3000) {
        this.lossProbability = lossProbability; // אחוז איבוד חבילות (10% ברירת מחדל)
        this.minDelay = minDelay; // זמן השהיה מינימלי (1 שנייה)
        this.maxDelay = maxDelay; // זמן השהיה מקסימלי (3 שניות)
    }

    // פונקציה המדמה שליחת בקשה לשרת
    send(request, callback) {
        console.log(`📡 Sending request to ${request.endpoint}`);

        // האם ההודעה "נאבדת" (Packet Loss)
        if (Math.random() < this.lossProbability) {
            console.warn(`⚠️ Packet lost! Request to ${request.endpoint} failed.`);
            callback({ error: "Network error: Packet lost." });
            return;
        }

        // הגדרת זמן עיכוב אקראי
        const delay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
        console.log(`⏳ Simulating network delay of ${Math.round(delay)}ms`);

        // המתנה לפני שליחת התשובה ללקוח
        setTimeout(() => {
            const response = handleRequest(request); // שולח את הבקשה לשרת
            console.log(`✅ Response received from ${request.endpoint}`, response);
            callback(response);
        }, delay);
    }
}

// יצירת אובייקט Network עם 20% איבוד חבילות
export const network = new Network(0.2);
