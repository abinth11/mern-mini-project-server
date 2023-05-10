import express, { RequestHandler, Router } from "express";
import { Request, Response } from "express";
import userHelpers from "../Helpers/userHelpers.ts";
import jwtHelper from "../config/jwt.ts";
// import upload from '../config/mutler.ts';

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



router.get("/get-user-data",jwtHelper.verifyJwt, async (req: Request, res: Response) => {
  try {
    const {email} = req.user
    const response = await userHelpers.getUserData(email)
    console.log(response)
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

// router.post("/user-update-profile", async (req: Request, res: Response) => {
//   try {
//     console.log('aaaaaaa')
//     if (req.file) {
//       // File uploaded successfully, proceed with updating user profile
//       console.log("File uploaded successfully:", req.file);
//       // call your update user profile function here
//       // const response = await userHelpers.updateUserProfile(req.body);
//       // console.log(response);
//     } else {
//       // File upload failed
//       console.log("File upload failed");
//       res.status(400).json({
//         statusCode: 400,
//         successMessage: null,
//         errorMessage: "Failed to upload file",
//         data: null,
//         error: null,
//       });
//     }
//   } catch (error:any) {
//     console.log(error)
//     res.status(500).json({
//       statusCode: 500,
//       successMessage: null,
//       errorMessage: "Internal server error",
//       data: null,
//       error: error,
//     });
//   }
// });

export default router;
