export enum SignInFormLabel {
  Email = 'email',
  Password = 'password',
  RememberMe = 'rememberMe',
}

export enum SignUpFormLabel {
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  FirstName = 'firstName',
  LastName = 'lastName',
  PhoneNumber = 'phoneNumber',
}
export interface SignUpFormValue {
  [SignUpFormLabel.Email]: string;
  [SignUpFormLabel.Password]: string;
  [SignUpFormLabel.ConfirmPassword]: string;
  [SignUpFormLabel.FirstName]: string;
  [SignUpFormLabel.LastName]: string;
  [SignUpFormLabel.PhoneNumber]: string;
}

export interface SignInFormValue {
  [SignInFormLabel.Email]: string;
  [SignInFormLabel.Password]: string;
  [SignInFormLabel.RememberMe]: boolean;
}

export interface ICredentialPayload {
  email: string;
  password: string;
}
