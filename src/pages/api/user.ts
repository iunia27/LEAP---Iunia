import { userData } from "@/data/user.data";
import { errorResponse, successResponse } from "@/utils/apiResponse.util";
import { handlePreflight } from "@/utils/cors.util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  handlePreflight(req, res);

  if (req.method === "GET") {
    res.status(200).json(successResponse(userData));
  } else {
    res.status(404).json(errorResponse("Route not found"));
  }
}
