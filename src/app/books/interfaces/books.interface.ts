export interface CategorieBook {
  id: number,
  description: string
}

export interface ResponseBook {
  cod: string,
  status: boolean
}

export interface FilterBook {
  title?: string,
  category?: number[]
}

export interface Book {
  id: string;
  public: boolean;
  author: string;
  resume: string;
  title: string;
  subtitle: string;
  image: string;
  url: string;
  category: number[];
  userRegister: string;
}
