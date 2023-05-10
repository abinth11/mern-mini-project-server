import { Request,Response,NextFunction} from "express";
import { CustomRequest } from "../utils/interfaces";
const jwt = require("jsonwebtoken");

const jwtHelper = {
  verifyJwt: (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers["authorization"];
    console.log(token);
  
    if (token === "null") {
      return res
        .status(401)
        .json({ invalidToken: true, message: "Unauthorized" });
    }
  
    jwt.verify(token, "access_secret_key", (err: Error | null, decoded: any) => {
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
        "access_secret_key",
        { expiresIn: "20s" }
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
        "refresh_secret_key",
        { expiresIn: "60s" }
      )
      return refreshToken
    } catch (error:any) {
      throw new Error(error);
    }
  },
};
export default jwtHelper