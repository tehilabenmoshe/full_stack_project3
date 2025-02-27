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
        this.headers = {}; // לכותרות
    }

    // פתיחת חיבור (שמירת שיטת הבקשה והכתובת)
    open(method, url) {
        this.method = method;
        this.url = url;
    }

      // ✅ פונקציה להוספת כותרות לבקשה
      setRequestHeader(header, value) {
        this.headers[header] = value;
    }

    // שליחת הבקשה דרך Network FAJAX
    send(data = null) {
        this.data = data;

        // יצירת אובייקט בקשה
        const request = {
            method: this.method,
            endpoint: this.url,
            data: this.data,
            headers: this.headers // ✅ נוסיף גם את הכותרות שנקבעו
        };

        console.log(`📡 FAJAX sending request:`, request);

        // שליחת הבקשה דרך מחלקת Network
        network.send(request, (response) => {
            if (response.error) {
                this.status = 500; // שגיאת שרת
                if (this.onerror) this.onerror(response.error);
            } else {
                this.status = 200; // הצלחה
                this.response = response;
                if (this.onload) this.onload();
            }
        });
    }
    get responseText() {
        return typeof this.response === "string" ? this.response : JSON.stringify(this.response); //המרה לגייסון אם זה לא
    }
    
}

export { FXMLHttpRequest };
