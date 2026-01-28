import fetch from "node-fetch";
import { Buffer } from "buffer";

export const config = { api: { bodyParser: true, }, };

export default async function handler(req, res) {
  try {
    const backend = "https://pinterest-backend-lvmx.onrender.com";
    const url = backend + req.url.replace(/^\/api/, "");

    const headers = { ...req.headers };
    delete headers.host;
    delete headers['content-length'];
    const fetchOptions = {
      method: req.method,
      headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined, }

    const response = await fetch(url, fetchOptions);
    res.status(response.status);

    response.headers.forEach((value, key) => {
        if (!["content-length", "transfer-encoding"].includes(key.toLowerCase())) {
            res.setHeader(key, value);
        }
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy crashed" });
  }
}
