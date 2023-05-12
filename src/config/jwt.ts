import { Request,Response,NextFunction} from "express";
import { CustomRequest } from "../utils/interfaces";
const jwt = require("jsonwebtoken");

const jwtHelper = {
  verifyJwt: (req: CustomRequest, res: Response, next: NextFunction): any => {
    const token = req.headers["authorization"];
    console.log(token)
    if (token === "null") {
      return res
        .status(401)
        .json({ invalidToken: true, message: "Unauthorized" });
    }
  
    jwt.verify(token,process.env.ACCESS_SECRET_KEY, (err: Error | null, decoded: any) => {
      if (err) {
        console.log(err);
        return res
          .status(403)
          .json({ invalidToken: true, message: "Forbidden", err });
      }
      console.log(decoded);
      // (req as CustomRequest).user = decoded;
      req.user = decoded
      next();
    });
  },
  generateAccessToken: (name:string,email:string) => {
    try {
      const accessToken = jwt.sign(
        { name, email },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "20m" }
      )
      return accessToken
    } catch (error:any) {
      throw new Error(error);
    }
  },
  generateAccessTokenAdmin: (username:string) => {
    try {
      const accessToken = jwt.sign(
        { username },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "20m" }
      )
      return accessToken
    } catch (error:any) {
      throw new Error(error);
    }
  },
  generateRefreshToken:(name:string,email:string) => {
    try {
      const refreshToken = jwt.sign(
        { name, email},
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: "60s" }
      )
      return refreshToken
    } catch (error:any) {
      throw new Error(error);
    }
  },
};
export default jwtHelper