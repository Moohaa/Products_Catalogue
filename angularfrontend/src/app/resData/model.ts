export interface Category {
  id: number;
  category_name: string;
  description?: any;
}

export interface Embedded {
  categories: Category[];
}

export interface RootObject {
  _embedded: Embedded;
}
