import bcrypt from "bcrypt";
import { user } from "../config/mongoose.ts";
import jwtHelper from "../config/jwt.ts";
import {
  UserInfo,
  LoginInfo,
  UpdateUserProfileInfo,
  RegisterUserResponse,
  LoginUserResponse,
} from "../utils/interfaces.ts";
const userHelpers = {
  registerUser: async (userInfo: UserInfo): Promise<RegisterUserResponse> => {
    try {
      const { name, mobile, email, password } = userInfo;
      const emailExist = await user.findOne({ email });
      const phoneExist = await user.findOne({ mobile });
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
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
        return {
          status: true, 
          blocked: false,
          accessToken,
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
  // updateUserProfile: async (userInfo: UpdateUserProfileInfo): Promise<void> => {
  //   try {
  //     const { name, mobile, email, password } = userInfo;
  //     const userExist = await user.findById({ _id: userInfo._id });
  //     if (!userExist) {
  //       throw new Error("User does not exist");
  //     }
  //     if (name) {
  //       userExist.name = name;
  //     }
  //     if (mobile) {
  //       userExist.mobile = mobile;
  //     }
  //     if (email) {
  //       userExist.email = email;
  //     }
  //     if (password) {
  //       const salt = await bcrypt.genSalt(10);
  //       const hashedPassword = await bcrypt.hash(password, salt);
  //       userExist.password = hashedPassword;
  //     }
  //     await userExist.save();
  //   } catch (error:any) {
  //     throw new Error(error);
  //   }
  // },
};

export default userHelpers;
