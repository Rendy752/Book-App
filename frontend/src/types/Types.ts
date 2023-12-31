export type TUser = {
  id: number;
  name: string;
  email: string;
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
