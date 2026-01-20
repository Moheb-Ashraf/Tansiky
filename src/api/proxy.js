import axios from "axios";

export default async function handler(req, res) {
  const { path } = req.query; // هنا سيأخذ "api/Universities/type/2"

  try {
    const apiRes = await axios.get(`http://tansiqy.runasp.net/${path}`);
    res.status(200).json(apiRes.data);
  } catch (err) {
    res.status(500).json({ error: "Proxy Error", details: err.message });
  }
}