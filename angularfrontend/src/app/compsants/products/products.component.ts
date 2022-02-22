import { Component, Input, OnInit } from '@angular/core';
import { CatalogueService } from 'src/sevices/catalogue.service';
import { Product } from 'src/app/resData/productsres';

import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @Input()
  product: Product;

  public products: Product[] = [];
  constructor(
    public catalogueService: CatalogueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        let url = value.url;
        console.log(url);

        let p1 = this.route.snapshot.params['p1'];
        if (p1 == 1) {
          this.getProducts('/products/search/selectedProducts');
        } else if (p1 == 2) {
          let idCat = this.route.snapshot.params['p2'];
          if (idCat == 0) {
            this.getProducts('/products/search/selectedProducts');
          } else {
            this.getProducts('/categories/' + idCat + '/products');
          }
        } else {
          let idCat = this.route.snapshot.params['p2'];
          this.router.navigateByUrl('/products/2/' + idCat);
        }
      }
    });
    let p2 = this.route.snapshot.params['p2'];
    if (p2 == 0) {
      this.getProducts('/products/search/selectedProducts');
    }
  }
  private getProducts(url: string) {
    this.catalogueService.getProducts(url).subscribe(
      (data) => {
        this.products = data._embedded.products;
      },
      (er) => {
        console.log(er);
      }
    );
  }
}
