import fetch from "node-fetch";
import { Buffer } from "buffer";

export default async function handler(req, res) {
    try {
        const backend = "https://pinterest-backend-lvmx.onrender.com";
        const url = backend + req.url.replace(/^\/api/, "");

        const response = await fetch(url, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
                cookie: req.headers.cookie || "",
            },
            body:
            req.method === "GET" || req.method === "HEAD"
            ? undefined
            : JSON.stringify(req.body),
        });

        const contentType = response.headers.get("content-type");
        const buffer = await response.arrayBuffer();
        res.status(response.status);
        if (contentType) {
            res.setHeader("Content-Type", contentType);
        }
        if (response.headers.get("set-cookie")) {
            res.setHeader("Set-Cookie", response.headers.get("set-cookie"));
        }
        res.send(Buffer.from(buffer));
    } catch (err) {
        console.error("Function error:", err);
        res.status(500).json({ error: "Function crashed" });
    }
}