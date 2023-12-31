export type TUser = {
  id: number;
  name: string;
  email: string;
};

export type TBook = {
  id: number;
  user_id: number;
  isbn: number;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
  created_at: string;
  updated_at: string;
};

export interface IError {
  message: string;
}
