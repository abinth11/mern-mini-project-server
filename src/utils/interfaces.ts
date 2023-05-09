export interface RegisterUserResponse {
  status: boolean;
  Message: string;
  data?: any;
}

export interface LoginUserResponse {
  status: boolean;
  blocked?: boolean;
  accessToken:string | null;
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
