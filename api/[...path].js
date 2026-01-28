import fetch from "node-fetch";
import { Buffer } from "buffer";

export default async function handler(req, res) {
    try {
        const backend = "https://pinterest-backend-lvmx.onrender.com";
        const url = backend + req.url.replace(/^\/api/, "");

        const headers = { cookie: req.headers.cookie || "" };
        if (req.method !== "GET" && req.method !== "HEAD") {
            headers["Content-Type"] = "application/json";
        }
        
        const response = await fetch(url, {
            method: req.method,
            headers,
            body: req.method === "GET" || req.method === "HEAD" ? undefined : JSON.stringify(req.body), });

            const setCookies = response.headers.raw()["set-cookie"];
            if (setCookies) {
                res.setHeader("Set-Cookie", setCookies);
            }
            res.status(response.status);

            response.headers.forEach((value, key) => {
                if (key.toLowerCase() !== "transfer-encoding") {
                    res.setHeader(key, value);
                }
            });
            const contentType = response.headers.get("content-type") || "";
            if (contentType.startsWith("application/json") || contentType.startsWith("text/")) {
                const text = await response.text();
                res.send(text);
            } else {
                const buffer = Buffer.from(await response.arrayBuffer());
                res.end(buffer);
            }
    } catch (err) {
        console.error("Function error:", err);
        res.status(500).json({ error: "Function crashed" });
    }
}