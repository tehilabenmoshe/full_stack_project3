import { network } from "../../server/network.js"; // מחלקת הרשת המדומה

class FXMLHttpRequest {
    constructor() {
        this.method = null;  // שיטת הבקשה (GET, POST וכו')
        this.url = null;      // הכתובת אליה תישלח הבקשה
        this.data = null;     // הנתונים שיישלחו (אם רלוונטי)
        this.response = null; // התגובה מהשרת
        this.status = 0;      // קוד סטטוס HTTP (200, 404 וכו')
        this.onload = null;   // פונקציה שתופעל במקרה של הצלחה
        this.onerror = null;  // פונקציה שתופעל במקרה של שגיאה
    }

    // פתיחת חיבור (שמירת שיטת הבקשה והכתובת)
    open(method, url) {
        this.method = method;
        this.url = url;
    }

    // שליחת הבקשה דרך Network FAJAX
    send(data = null) {
        this.data = data;

        // יצירת אובייקט בקשה
        const request = {
            method: this.method,
            endpoint: this.url,
            data: this.data
        };

        console.log(`📡 FAJAX sending request:`, request);

        // שליחת הבקשה דרך מחלקת Network
        network.send(request, (response) => {
            if (response.error) {
                this.status = 500; // שגיאת שרת
                if (this.onerror) this.onerror(response.error);
            } else {
                this.status = 200; // הצלחה
                this.response = JSON.stringify(response);
                if (this.onload) this.onload();
            }
        });
    }

    // מחזירה את התגובה בפורמט JSON
    get responseText() {
        return this.response;
    }
}

export { FXMLHttpRequest };
