export interface Book {
  id: string,
  public: boolean,
  author: string,
  resume: string,
  title: string,
  subtitle: string,
  image: string,
  url: string,
  category: number[],
  userRegister: string
}

export interface CategorieBook{
  id: number,
  description: string
}
