import { Component, inject } from '@angular/core';
import { CategoryService } from "../../services/category.service";
import { environments } from '../../../environments/environments';
import { ProductService } from '../../services/product.service';
import { ImageService } from '../../services/image.service';
import { NgIf, NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { IProduct } from '../../interfaces/product';
import { Observable } from 'rxjs';
import { addProduct, decrement, reset } from '../../store/actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected categorys: any[] = [];
  protected products: any[] = [];
  protected images: any[] = [];
  protected IsFilter: any = null;

  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private imageService = inject(ImageService);
  private product$: Observable<IProduct>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ product: IProduct; }>
  ) {
    this.product$ = store.select('product');
  }

  ngOnInit() {

    this.imageService.getAllImages().subscribe({
      next: (data: any) => {
        this.images = data.data;
        this.getProductAll();
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.categoryService.getAllCategory().subscribe({
      next: (data: any) => {
        this.categorys = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  getProductAll() {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data.data;
        this.products.map((e: any) => {
          let f = this.images.filter((i: any) => i.product_id === e.product_id);
          e.images = f;
        });
        // console.log(this.products);

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterProject(e: Event, name_: string) {
    if (name_ == '') {
      this.IsFilter = null;
    } else {
      [this.IsFilter] = this.categorys.filter(c => c.category_name == name_);
    }
  }


  increment(e: Event, product: IProduct) {
    // console.log(product);
    // this.store.dispatch(addProduct({ product }));
    this.store.dispatch(reset());
  }

}
