import bcrypt from "bcrypt";
import { user } from "../config/mongoose.ts";
import jwtHelper from "../config/jwt.ts";
import {
  UserInfo,
  LoginInfo,
  UpdateUserProfileInfo,
  RegisterUserResponse,
  LoginUserResponse,
  getUserDataResponse
} from "../utils/interfaces.ts";
const userHelpers = {
  registerUser: async (userInfo: UserInfo): Promise<RegisterUserResponse> => {
    try {
      const { name, mobile, email, password } = userInfo;
      const emailExist:string = await user.findOne({ email });
      const phoneExist:string = await user.findOne({ mobile });
      if (phoneExist) {
        return {
          status: false,
          Message: "Phone number already exists please try to login",
        };
      }
      if (emailExist) {
        return {
          status: false,
          Message: "Email already exist please try to login",
        };
      }
      const salt:string = await bcrypt.genSalt(10);
      const hashedPassword:string= await bcrypt.hash(password, salt);
      const data = new user({
        name,
        mobile,
        email,
        password: hashedPassword,
      });
      const result = await data.save();
      return {
        status: true,
        data: result,
        Message: "Successfully registered",
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  loginUser: async (loginInfo: LoginInfo): Promise<LoginUserResponse> => {
    const { username, password } = loginInfo;
    try {
      const userExist = await user.findOne({
        $or: [{ email: username }, { mobile: username }],
      });
      if (!userExist) {
        return {
          status: false,
          blocked: false,
          accessToken:null,
          Message: "User does not exist please enter valid email",
        };
      } else if (userExist?.blocked) {
        return {
          status: false,
          blocked: true,
          accessToken:null,
          Message: "User is blocked",
        };
      }
      const hashedPassword = userExist?.password;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        console.log(userExist)
        const {name,email} = userExist
        const accessToken =  jwtHelper.generateAccessToken(name,email) 
        const refreshToken =  jwtHelper.generateRefreshToken(name,email) 

        return {
          status: true, 
          blocked: false,
          accessToken,
          refreshToken,
          Message: "Successfully logged in",
        };
      } else {
        return {
          status: false,
          blocked: false,
          accessToken:null,
          Message: "Entered wrong password",
        };
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getUserData:async(email:string):Promise <getUserDataResponse> =>{
    try {
      const userInfo = await user.findOne({ email }, { name: 1, email: 1,mobile:1 });
      return userInfo
    } catch(error:any) {
      throw new Error(error)
    }
  },
  updateUserProfile: async (email:string,photo:string): Promise<void> => {
    try {
      
      // await userExist.save();
    } catch (error:any) {
      throw new Error(error);
    }
  },
};

export default userHelpers;
