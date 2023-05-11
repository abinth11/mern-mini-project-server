import express, { Router, Request, Response } from "express";
import adminHelper from "../Helpers/adminHelpers";
const router: Router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const response = await adminHelper.login(req.body);
    response.status
      ? res.status(200).json({
          statusCode: 200,
          successMessage: "SuccessFully logged in ",
          errorMessage: null,
          response,
          error: null,
        })
      : res.status(400).json({
          statusCode: 400,
          successMessage: null,
          errorMessage: "Failed to login please try again",
          response,
          error: null,
        });
    console.log(response);
  } catch (error) {
    res.status(400).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      response: null,
      error: error,
    });
  }
});

export default router;
