import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  errorMessage: string;

  constructor(private productService: ProductService) {}

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter): this.products;
  }

  filteredProducts: IProduct[];

  // filters product by productName according to filer
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => 
    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }


  products: IProduct[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }



  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
   
  }

  onRaitingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }


}
