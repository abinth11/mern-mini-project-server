import bcrypt from "bcrypt";
import jwtHelper from "../config/jwt.ts";
import {
  adminInfo,
  adminLoginResponse,
  userDetails,
  deleteResponse,
  individualUser,
  updateResponse
} from "../utils/interfaces.ts";
import admin from "../Schemas/adminSchema.ts";
import { user } from "../config/mongoose.ts";
import mongoose from "mongoose";
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
      const response = await user.find({}, { password: 0, __v: 0 });
      return response
    } catch (error:any) {
      throw new Error(error);
    }
  },
  deleteUser:async(userId:string):Promise<deleteResponse> =>{
    try {
      const response = await user.deleteOne({_id:new mongoose.Types.ObjectId(userId)})
      return response
    } catch (error:any){
      throw new Error(error)
    }
  },
  getIndividualUserData:async(userId:string|undefined):Promise<individualUser> =>{
    try {
      const userInfo = await user.findOne({_id: new mongoose.Types.ObjectId(userId)}, { password: 0, __v: 0 })
      return userInfo
    } catch (error:any){
      throw new Error(error)
    }
  },
  updateUserInfo:async(userInfo:individualUser):Promise<updateResponse> =>{
    try {
      const {
        _id,
        name,
        email,
        blocked,
      } = userInfo
      console.log(userInfo)
      const response = await user.updateOne({_id: new mongoose.Types.ObjectId(_id)},{
        $set:{
          name:name,
          email:email,
          blocked:blocked,
        }
      })
      return response

    } catch (error:any) {
      throw new Error(error);
    }
  }
};

export default adminHelper;
