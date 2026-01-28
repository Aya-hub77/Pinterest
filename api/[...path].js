import fetch from "node-fetch";
import { Buffer } from "buffer";

export default async function handler(req, res) {
    try {
        const backend = "https://pinterest-backend-lvmx.onrender.com";
        const url = backend + req.url.replace(/^\/api/, "");
        
        const response = await fetch(url, {
            method: req.method,
            headers: { cookie: req.headers.cookie || "",},
            body: req.method === "GET" || req.method === "HEAD" ? undefined : JSON.stringify(req.body), });
            
            res.status(response.status);
            if (response.headers.get("set-cookie")) {
                res.setHeader("Set-Cookie", response.headers.get("set-cookie"));
            }
            const contentType = response.headers.get("content-type") || "";
            if (contentType.startsWith("application/json") || contentType.startsWith("text/")) {
                const text = await response.text();
                res.setHeader("Content-Type", "application/json");
                res.send(text);
            } else {
                const buffer = Buffer.from(await response.arrayBuffer());
                res.removeHeader("Content-Encoding");
                res.send(buffer);
            }
    } catch (err) {
        console.error("Function error:", err);
        res.status(500).json({ error: "Function crashed" });
    }
}