import { Request, Response, Router } from "express";
import { clients } from "../stores/sseClients";

const router = Router();

router.get("/events", (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  clients.push(res);
  console.log(`Client connected for SSE. Total clients: ${clients.length}`);
  res.write(
    `data: ${JSON.stringify({
      type: "connected",
      status: "Connected to SSE!",
    })}\n\n`
  );
  req.on("close", () => {
    clients.splice(clients.indexOf(res), 1);
    console.log(
      `Client disconnected from SSE. Remaining clients: ${clients.length}`
    );
  });
});

export default router;
