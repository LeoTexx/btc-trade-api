import axios from "axios";
import { API_BASE_URL, SANDBOX_API_KEY } from "../config";
import { calcSig } from "./crypto";
import { Request } from "express";

export async function sendApiRequest(req: Request) {
  try {
    const endpoint = req.originalUrl;
    const body = req.body || {};
    const httpMethod = req.method;

    const headers = {
      authorization: calcSig(body, endpoint, httpMethod),
      "api-key": SANDBOX_API_KEY,
      "Content-Type": "application/json",
    };

    const response = await axios({
      method: httpMethod as any,
      url: `${API_BASE_URL}${endpoint}`,
      headers: headers,
      data: JSON.stringify(body),
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err: any) {
    console.error(
      "Axios error = ",
      err.response ? err.response.data : err.message
    );

    const statusCode =
      err.response && err.response.status ? err.response.status : 500;
    const errorMessage =
      err.response && err.response.data
        ? err.response.data
        : "Internal Server Error";

    throw {
      statusCode: statusCode,
      errorMessage: errorMessage,
    };
  }
}
