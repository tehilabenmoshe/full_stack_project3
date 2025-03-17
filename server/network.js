import { handleBookRequest } from "./bookServre.js";
import {handleUserRequest} from "./userServer.js";

class Network {
    constructor(lossProbability = 0.0, minDelay = 1000, maxDelay = 3000) {
        this.lossProbability = lossProbability;
        this.minDelay = minDelay;
        this.maxDelay = maxDelay;
    }

    // ✅ פונקציה המדמה שליחת בקשה לשרת
    send(request, callback) {
        console.log(`📡 Sending request to ${request.endpoint}`);

        // ✅ המרה אוטומטית אם הנתונים הם מחרוזת JSON
        if (request.data && typeof request.data === "string") {
            try {
                request.data = JSON.parse(request.data);
            } catch (error) {
                console.error("🚨 Error parsing request data:", error);
                callback({ error: "Invalid JSON format in request data." });
                return;
            }
        }

        // ✅ איבוד חבילות (אם מופעל)
        if (Math.random() < this.lossProbability) {
            console.warn(`⚠️ Packet lost! Request to ${request.endpoint} failed.`);
            callback({ error: "Network error: Packet lost." });
            return;
        }

        // ✅ השהיית רשת מדומה
        const delay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
        console.log(`⏳ Simulating network delay of ${Math.round(delay)}ms`);

        setTimeout(() => {
            let response;
        
            // ✅ שליחה לשרת הנכון בהתאם לנתיב
            if (request.endpoint.startsWith("/users")) {
                response = handleUserRequest(request); // שליחה לשרת המשתמשים
            } else if (request.endpoint.startsWith("/books")) {
                response = handleBookRequest(request); // שליחה לשרת הספרים
            } else {
                response = { error: "Unknown service" };
            }
        
            console.log(`✅ Response received from ${request.endpoint}`, response);
            callback(response);
        }, delay);
        
    }
}

// ללא איבוד חבילות כרגע (לבדיקה)
export const network = new Network(0.0);
