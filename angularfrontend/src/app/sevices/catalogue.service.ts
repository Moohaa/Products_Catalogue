import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RootObject } from 'src/app/Models/Category';
import { ProductResData } from 'src/app/Models/Product';
import { Product } from 'src/app/Models/Product';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  public host: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
  public getResource(url: string): Observable<RootObject> {
    return this.http.get<RootObject>(this.host + url);
  }
  public getProducts(url: string): Observable<ProductResData> {
    return this.http.get<ProductResData>(this.host + url);
  }

  public UploadProduct(product: Product) {
    //Upload file here send a binary data
    return this.http.post(this.host + '/uploadProduct', product);
  }
  public uploadPhoto(photo: File, id: Number) {
    const formData: FormData = new FormData();
    formData.append('file', photo);
    return this.http.post(this.host + '/uploadPhoto/' + id, formData);
  }
  public getProductsCount(): Observable<Number> {
    return this.http.get<Number>(this.host + '/n_products');
  }
}
