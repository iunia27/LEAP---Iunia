import { NextApiRequest, NextApiResponse } from "next";

 const setCorsHeaders = (res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "http://www.mayhem.local:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Set-Cookie, Authorization");
  };

  export const handlePreflight = (req: NextApiRequest, res: NextApiResponse) => {

    setCorsHeaders(res)

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return true;
    }
}