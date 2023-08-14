import { Request, Response, Router } from "express";
import { sendApiRequest } from "../utils/api";

const router = Router();
router.all("*", async (req: Request, res: Response) => {
  try {
    const response = await sendApiRequest(req);

    res.status(response.status).send(response.data);
  } catch (error: any) {
    res.status(error.statusCode).send(error.errorMessage);
  }
});

export default router;
