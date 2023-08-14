import crypto from "crypto";
import { SANDBOX_API_SECRET } from "../config";

export function calcSig(
  body: object,
  endpoint: string,
  method: string
): string {
  const hmac = crypto.createHmac("sha256", SANDBOX_API_SECRET);
  const time = Date.now().toString();

  hmac.update(time);
  hmac.update(method);
  hmac.update(endpoint);

  const contentHash = crypto.createHash("md5");
  contentHash.update(JSON.stringify(body));

  hmac.update(contentHash.digest("hex"));

  const auth = `HMAC ${time}:${hmac.digest("hex")}`;
  return auth;
}

export function calculateSignature(apiKey: string, payload: any) {
  const signature = crypto.createHmac("sha256", apiKey);
  signature.update(JSON.stringify(payload));
  return signature.digest("hex");
}
