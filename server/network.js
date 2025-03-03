import { handleRequest } from "./server.js"; // מבצע ניתוב של הבקשות

class Network {
    constructor(lossProbability = 0.0, minDelay = 1000, maxDelay = 3000) {
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
            console.log("🔎 Debug: Response before callback:", response);
            callback(response);
        }, delay);
        

        // ✅ תיקון הבעיה: בדיקה אם הנתונים הם string והמרה ל-JSON
        if (request.data && typeof request.data === "string") {
            console.warn("⚠️ Data is a string instead of an object. Parsing...");
            try {
                request.data = JSON.parse(request.data);
                console.log("✅ Data successfully parsed:", request.data);
            } catch (error) {
                console.error("🚨 Error parsing data:", error);
                callback({ error: "Invalid JSON format in request data." });
                return;
            }
        }



    }
}

// יצירת אובייקט Network עם 20% איבוד חבילות
//export const network = new Network(0.2);

// ביטלתי את האיבוד חבילות לצורך בדיקת הקוד
export const network = new Network(0.0);
