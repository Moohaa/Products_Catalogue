import { Category } from 'src/app/resData/model';

export interface Product {
  id: number;
  name: string;
  description?: any;
  currentPrice: number;
  promotion: boolean;
  selected: boolean;
  available: boolean;
  photoName: string;
  category: Category;
}

export interface Embedded {
  products: Product[];
}

export interface ProductResData {
  _embedded: Embedded;
}
