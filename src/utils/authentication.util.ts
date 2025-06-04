import crypto from "crypto";

export const issueToken = (userId: string): string => {
  const secretKey = "my-secret-key"; // Replace with a secure key
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
  };

  // Encode header and payload as Base64
  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");

  // Create the signature
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(`${base64Header}.${base64Payload}`)
    .digest("base64url");

  // Combine header, payload, and signature to form the token
  return `${base64Header}.${base64Payload}.${signature}`;
};

