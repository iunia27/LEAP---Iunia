import { PASSWORD, USERNAME } from "@/constants/user.constants";
import { issueToken } from "@/utils/authentication.util";
import { handlePreflight} from "@/utils/cors.util";
import { NextApiRequest, NextApiResponse } from "next";


type LoginResponse = {
  success: boolean;
  data?: {
    token: string | null;
  };
  error?: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {

  handlePreflight(req, res);

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  const { username, password } = JSON.parse(req.body || "{}");

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "Username and password are required",
    });
  }
  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials",
    });
  }

  const token = issueToken(username);

  res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly`)
  res.setHeader("Authorization", `Bearer ${token}`);

  return res.status(200).json({
    success: true,
    data: {
      token: token,
    },
  });
}
