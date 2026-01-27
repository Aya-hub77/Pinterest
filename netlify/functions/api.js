import fetch from "node-fetch";
import { Buffer } from "buffer";

export async function handler(event) {
    try {
        const backend = "https://pinterest-backend-lvmx.onrender.com";
        const url = backend + event.path.replace("/api", "") + (event.rawQuery ? `?${event.rawQuery}` : "");
        const res = await fetch(url, { method: event.httpMethod,
            headers: { cookie: event.headers.cookie || "", },
            body: event.httpMethod === "GET" || event.httpMethod === "HEAD" ? undefined : event.body, });
            const contentType = res.headers.get("content-type") || "application/octet-stream";
            const bodyBuffer = await res.arrayBuffer();
        return {
            statusCode: res.status,
            headers: { "Content-Type": contentType, "Set-Cookie": res.headers.get("set-cookie") || "", }, 
            body: Buffer.from(bodyBuffer).toString("base64"), isBase64Encoded: true, };
    } catch (err) {
        console.error("Function error:", err);
        return { statusCode: 500, body: JSON.stringify({ error: "Function crashed" }), };
    }
}