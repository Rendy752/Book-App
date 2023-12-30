export type TUser = {
  email: string;
  password: string;
  username: string;
  password_confim: string;
};

export type TBook = {
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
};

export interface IError {
  message: string;
}
