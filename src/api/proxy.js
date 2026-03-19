import axios from "axios";

export default async function handler(req, res) {
  // Extract path and spread the rest of query parameters into 'otherParams'
  const { path, ...otherParams } = req.query; 

  if (!path) {
    return res.status(400).json({ error: "Path parameter is required" });
  }

  try {
    // Send the request with the extracted path and pass the otherParams (like searchTerm)
    const apiRes = await axios.get(`https://tansiqy.runasp.net/${path}`, {
      params: otherParams // This will forward things like &searchTerm=...
    });

    res.status(200).json(apiRes.data);
  } catch (err) {
    // Forward the specific error status if possible, otherwise 500
    const statusCode = err.response?.status || 500;
    res.status(statusCode).json({ 
      error: "Proxy Error", 
      details: err.response?.data || err.message 
    });
  }
}