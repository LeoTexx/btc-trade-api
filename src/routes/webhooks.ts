import { Request, Response, Router } from "express";

import { clients } from "../stores/sseClients";
import { calculateSignature } from "../utils/crypto";
import { SANDBOX_API_KEY } from "../config";

const router = Router();

router.post("/webhook/*", (req: Request, res: Response) => {
  const subPath = req.params[0];
  console.log(`Webhook received on subpath: ${subPath}!`);
  const { signature } = req.headers;

  if (signature !== calculateSignature(SANDBOX_API_KEY, req.body)) {
    console.warn("Invalid signature for webhook request.");
    return res.status(401).send("Invalid Signature");
  }

  if (req.body.type === "LN_INCOMING_CONFIRMED") {
    for (const client of clients) {
      try {
        client.write(
          `data: ${JSON.stringify({
            type: "invoice_paid",
            balanceAfter: req.body.balanceAfter,
          })}\n\n`
        );
        console.log(`Sent 'invoice_paid' event to a client.`);
      } catch (error) {
        console.error("Error sending 'invoice_paid' event:", error);
      }
    }
  }
  res.status(200).send();
});

export default router;
