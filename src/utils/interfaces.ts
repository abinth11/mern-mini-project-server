import { Request } from "express";
import { ParsedQs } from 'qs';
import { ObjectId } from 'mongodb';

export interface RegisterUserResponse {
  status: boolean;
  Message: string;
  data?: any;
}
export interface CustomRequest extends Request {
  user?: any;
}

export interface ImageUploadResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: string;
  upsertedCount: number;
  matchedCount: number;
}

export interface User {
  name: string;
  email: string;
}
export interface getUserDataResponse {
  name: string;
  email: string;
  mobile: string;
  photo?: string;
}
export interface LoginUserResponse {
  status: boolean;
  blocked?: boolean;
  accessToken: string | null;
  refreshToken?: string | null;
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
//                       Admin
// <=================================================>

export interface adminInfo {
  username: string;
  password: string;
}

export interface adminLoginResponse {
  status: boolean;
  accessToken: string | null;
  message: string;
}

export interface userDetails {
  name: string;
  mobile: string;
  email: string;
  blocked: boolean;
  createdAt: Date;
  photo?: string;
}

export interface deleteResponse {
   acknowledged: boolean;
   deletedCount: number;
}
export interface updateResponse {
    acknowledged: boolean;
    modifiedCount: number,
    upsertedId: string,
    upsertedCount: number,
    matchedCount: number
}

export interface CustomQuery extends ParsedQs {
  userId: string;
}

export interface individualUser {
  _id:ObjectId;
  name: string;
  mobile: string;
  email: string;
  blocked: boolean;
  createdAt:Date;
  photo?:string;
}
