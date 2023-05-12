import express, { Router, Request, Response } from "express";
import { CustomQuery } from "../utils/interfaces";
import adminHelper from "../Helpers/adminHelpers";
import jwtHelper from "../config/jwt";
const router: Router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
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
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      response: null,
      error: error,
    });
  }
});

router.get(
  "/get-user-details",
  jwtHelper.verifyJwt,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await adminHelper.getUserDetails();
      response
        ? res.status(200).json({
            statusCode: 200,
            successMessage: null,
            errorMessage: "Successfully retrieved used details",
            data: response,
            error: null,
          })
        : res.status(400).json({
            statusCode: 400,
            successMessage: null,
            errorMessage: "Failed to fetch user details",
            data: null,
            error: response,
          });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        successMessage: null,
        errorMessage: "Internal server error",
        data: null,
        error: error,
      });
    }
  }
);

router.delete(
  "/delete-user",
  jwtHelper.verifyJwt,
  async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      const { id } = req.body;
      const response = await adminHelper.deleteUser(id);
      response
        ? res.status(200).json({
            status: true,
            statusCode: 200,
            successMessage: "SuccessFully deleted user ",
            errorMessage: null,
            response,
            error: null,
          })
        : res.status(400).json({
            status: false,
            statusCode: 400,
            successMessage: null,
            errorMessage: "Failed delete user please try again",
            response,
            error: null,
          });
      console.log(response);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        status: false,
        statusCode: 500,
        successMessage: null,
        errorMessage: "Internal server error",
        response: null,
        error: error,
      });
    }
  }
);

router.get(
  "/get-individual-user-data",
  jwtHelper.verifyJwt,
  async (
    req: Request<{}, {}, {}, CustomQuery>,
    res: Response
  ): Promise<void> => {
    try {
      const { userId }: { userId: string } = req.query;
      const response = await adminHelper.getIndividualUserData(userId);
      response
        ? res.status(200).json({
            status: true,
            statusCode: 200,
            successMessage: "SuccessFully fetched  user data",
            errorMessage: null,
            data: response,
            error: null,
          })
        : res.status(400).json({
            status: false,
            statusCode: 400,
            successMessage: null,
            errorMessage: "Failed to fetch user data please try again",
            data: null,
            error: response,
          });
    } catch (error: any) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        successMessage: null,
        errorMessage: "Internal server error",
        data: null,
        error: error,
      });
    }
  }
);

router.put(
  "/update-user-info",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await adminHelper.updateUserInfo(req.body);
      console.log(response);
      response
        ? res.status(200).json({
            status: true,
            statusCode: 200,
            successMessage: "SuccessFully updated  user data",
            errorMessage: null,
            response: response,
            error: null,
          })
        : res.status(400).json({
            status: false,
            statusCode: 400,
            successMessage: null,
            errorMessage: "Failed to update user data please try again",
            response: response,
            error: response,
          });
    } catch (error) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        successMessage: null,
        errorMessage: "Internal server error",
        response: null,
        error: error,
      });
    }
  }
);

export default router;
