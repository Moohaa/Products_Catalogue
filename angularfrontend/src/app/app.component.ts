import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/sevices/catalogue.service';
import { Category } from 'src/app/Models/Category';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public categories: Category[] = [];
  currentCategory: any;
  product: Product;

  constructor(
    private catalogueService: CatalogueService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getCategories(0);
  }
  private getCategories(c: number): void {
    this.catalogueService.getResource('/categories').subscribe(
      (data) => {
        this.categories = data._embedded.categories;
        this.categories.unshift({
          id: 0,
          category_name: 'All products',
          description: 'none',
        });
        this.getProductsByCat(this.categories[c]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getProductsByCat(c: Category) {
    this.currentCategory = c;
    this.product = {
      id: 1,
      name: 'product name',
      description: 'ff',
      currentPrice: 0,
      promotion: true,
      selected: true,
      available: true,
      photoName: 'name',
      category: this.currentCategory,
    };
    if (c) {
      this.router.navigateByUrl('/products/2/' + c.id);
    }
  }

  onSelectProducts() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/products/1/0');
  }

  selecetdFile: File;
  imagePreview: string | ArrayBuffer;

  onFileUpload(event: any) {
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result != null) {
        this.imagePreview = reader.result;
      }
    };
    reader.readAsDataURL(this.selecetdFile);
  }

  UploadProduct() {
    this.catalogueService.UploadProduct(this.product).subscribe(
      (data: any) => {
        this.catalogueService.getProductsCount().subscribe((res) => {
          this.catalogueService.uploadPhoto(this.selecetdFile, res).subscribe(
            () => {
              this.imagePreview = '';
              this.product.name = '';
              this.product.currentPrice = 0;
              this.router.navigateByUrl(
                '/products/4/' + this.currentCategory.id
              );
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (err: any) => console.log(err)
    );
  }
}
