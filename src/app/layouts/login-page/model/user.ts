export class UserRequest{

  userName : string;
  userPassword : string;
  tokenKey : string;

}

export class UserResponse{

  userName : string;
  fullName : string;
  tokenKey : string;
  isValid : boolean;
  roles : Array<any>;
}
