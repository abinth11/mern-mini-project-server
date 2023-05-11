import bcrypt from "bcrypt";
import jwtHelper from "../config/jwt.ts";
import {
  adminInfo,
  adminLoginResponse,
  userDetails,
} from "../utils/interfaces.ts";
import admin from "../Schemas/adminSchema.ts";
import { user } from "../config/mongoose.ts";
const adminHelper = {
  login: async (adminInfo: adminInfo): Promise<adminLoginResponse> => {
    const { username, password } = adminInfo;
    try {
      const adminExist = await admin.findOne({ username });
      if (!adminExist) {
        return {
          status: false,
          accessToken: null,
          message: "admin does not exist please enter valid email",
        };
      }
      const hashedPassword = adminExist?.password;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        const { username } = adminExist;
        const accessToken = jwtHelper.generateAccessTokenAdmin(username);
        return {
          status: true,
          accessToken,
          message: "Successfully logged in",
        };
      } else {
        return {
          status: false,
          accessToken: null,
          message: "Entered wrong password",
        };
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getUserDetails: async ():Promise<userDetails> => {
    try {
      const response = await user.find({}, { _id: 0, password: 0, __v: 0 });
      return response
    } catch (error:any) {
      throw new Error(error);
    }
  },
};

export default adminHelper;
