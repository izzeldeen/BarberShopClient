export class LoginVm {
  phoneNumber: string;
    code: string;
   
}


export class TokenDto {
  token:string;
  name:string;
  shopName:string;
}


export class ResetPasswordVM {
  oldPassword:string;
  newPassword:string;
}
