import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Path is required" });
  }

  try {
    const apiRes = await axios.get(`http://tansiqy.runasp.net/${path}`);
    res.status(200).json(apiRes.data);
  } catch (err) {
    console.error("Proxy Error:", err.message);
    res.status(500).json({ error: "Failed to fetch data from original API" });
  }
}