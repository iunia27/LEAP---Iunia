import { handlePreflight } from "@/utils/cors.util";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  handlePreflight(req, res);

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  res.setHeader("Set-Cookie", "token=; Path=/; HttpOnly; Max-Age=0");

  return res.status(200).json({ success: true });
}
