import express, {  Router } from "express";
import { Request, Response } from "express";
import userHelpers from "../Helpers/userHelpers.ts";
import jwtHelper from "../config/jwt.ts";
import { CustomRequest } from "../utils/interfaces.ts";
import {upload} from '../config/mutler.ts';

const router: Router = express.Router();

router.post("/user-register", async (req: Request, res: Response) => {
  try {
    const response = await userHelpers.registerUser(req.body);
    if (!response.status) {
      res.status(409).json({
        statusCode: 409,
        successMessage: "Unable to register the user",
        errorMessage: null,
        data: response,
        error: null,
      });
    } else if (response.status) {
      res.status(200).json({
        statusCode: 200,
        successMessage: "Successfully registered the user",
        errorMessage: null,
        data: response,
        error: null,
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        successMessage: "Failed to register",
        errorMessage: "Invalid credentials",
        data: null,
        error: response,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      data: null,
      error: error,
    });
  }
});

router.post("/user-login", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const response = await userHelpers.loginUser(req.body);
    console.log(response);
    response.status
      ? res.status(200).json({
          statusCode: 200,
          successMessage: "Successfully logged in",
          errorMessage: null,
          data: response,
          error: null,
        })
      : res.status(400).json({
          statusCode: 400,
          successMessage: null,
          errorMessage: "Password incorrect",
          data: response,
          error: null,
        });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      data: null,
      error: error,
    });
  }
});

router.get("/get-user-data",jwtHelper.verifyJwt, async (req: CustomRequest, res: Response) => {
  try {
    const {email} = req.user
    const response = await userHelpers.getUserData(email)
    console.log(response)
    res.status(200).json(response)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      data: null,
      error: error,
    });
  }
});

router.put("/update-profile",jwtHelper.verifyJwt,upload, async (req: CustomRequest, res: Response) => {
  try {
    const {email} = req.user
    console.log(email)
    console.log(req.file)
    const { path }: { path?: string } = req.file || {};
    if (req.file) {
      const response = await userHelpers.updateUserProfile(path,email);
      console.log(response)
      response.modifiedCount
      ?res.status(200).json({
        statusCode:200,
        successMessage: 'Successfully uploaded your profile picture',
        errorMessage: null,
        data: null,
        error: null,
      })
      :res.status(400).json({
        statusCode:400,
        successMessage: null,
        errorMessage:"Failed to update your profile picture",
        data: null,
        error: response,
      })
    } else {
      // File upload failed
      console.log("File upload failed");
      res.status(400).json({
        statusCode: 400,
        successMessage: null,
        errorMessage: "Failed to upload file",
        data: null,
        error: null,
      });
    }
  } catch (error:any) {
    console.log(error)
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      data: null,
      error: error,
    });
  }
});

export default router;
