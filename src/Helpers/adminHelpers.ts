import bcrypt from "bcrypt";
import jwtHelper from "../config/jwt.ts";
import { adminInfo, adminLoginResponse } from "../utils/interfaces.ts";
import admin from "../Schemas/adminSchema.ts";
const adminHelper = {
  login: async (adminInfo: adminInfo) => {
    const { username, password } = adminInfo;
    try {
      const adminExist = await admin.findOne({username});
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
};

export default adminHelper;
