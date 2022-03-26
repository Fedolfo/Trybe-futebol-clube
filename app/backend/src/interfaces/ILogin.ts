export interface Ilogin extends ILoginEmailAndPasswordDTO {
  id: number;
  username: string;
  role: string;
}

export interface ILoginEmailAndPasswordDTO {
  email: string;
  password: string;
}
