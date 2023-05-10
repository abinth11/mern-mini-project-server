import { Request } from "express";
export interface RegisterUserResponse {
  status: boolean;
  Message: string;
  data?: any;
}
export interface CustomRequest extends Request {
  user?: any;
}

export interface User {
  name: string;
  email: string;
}
export interface getUserDataResponse {
  name:string;
  email:string;
  mobile:string,
  profilePhoto?:string

}
export interface LoginUserResponse {
  status: boolean;
  blocked?: boolean;
  accessToken:string | null;
  refreshToken?:string | null;
  Message: string;
}

export interface UserInfo {
  name: string;
  mobile: string;
  email: string;
  password: string;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export interface UpdateUserProfileInfo {
  name?: string;
  mobile?: string;
  email?: string;
  password?: string;
}
