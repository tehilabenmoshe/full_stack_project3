import { network } from "../../server/network.js";

class FXMLHttpRequest {
    constructor() {
        this.method = null;
        this.url = null;
        this.data = null;
        this.response = null;
        this.status = 0; // 🔹 נוסיף שדה סטטוס
        this.onload = null;
        this.onerror = null;
        this.headers = {};
    }

    open(method, url) {
        this.method = method;
        this.url = url;
    }

    setRequestHeader(header, value) {
        this.headers[header] = value;
    }

    send(data = null) {
        this.data = data;

        const request = {
            method: this.method,
            endpoint: this.url,
            data: this.data,
            headers: this.headers
        };

        console.log(`📡 FAJAX sending request:`, request);

        network.send(request, (response) => {
            this.status = response.status || 500; // 🔹 שומר את הסטטוס שהשרת החזיר

            if (response.error) {
                console.warn(`⚠️ Request failed with status ${this.status}: ${response.error}`);
                if (this.onerror) this.onerror(response.error);
            } else {
                this.response = response.data || response; // 🔹 שמירה של התגובה עצמה
                if (this.onload) this.onload();
            }
        });
    }

    get responseText() {
        return typeof this.response === "string" ? this.response : JSON.stringify(this.response);
    }
}

export { FXMLHttpRequest };
