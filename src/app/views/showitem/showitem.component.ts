import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { addProduct, decrement, reset } from '../../store/actions';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/product';
import { NgClass, NgIf } from '@angular/common';
import { isBrowser } from '../../utils/is-browser';
import { StorageService } from '../../services/storage.service';
import { FlowbiteService } from '../../services/flowbite.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../../services/image.service';
import { ProductService } from '../../services/product.service';
import _ from 'lodash';
import e from 'express';
@Component({
  selector: 'app-showitem',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgbCarouselModule
  ],
  templateUrl: './showitem.component.html',
  styleUrl: './showitem.component.scss'
})
export class ShowitemComponent {

  protected product?: IProduct;
  protected imageObject: any = [];
  prodduct_data: any;
  // private $product: Observable<IProduct>;
  currentIndex = 0;
  @Input() images: string[] = [];
  private imageService = inject(ImageService);
  private productService = inject(ProductService);
  protected products: any[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ product: IProduct; }>,
    private storageService: StorageService,
    private flowbiteService: FlowbiteService,
    private router: Router,
  ) {

  }
  getData() {
    this.imageService.getAllImages().subscribe({
      next: (data: any) => {
        this.images = data.data;
        this.getProductAll();
      },
      error: (error) => {
        console.log(error);
      }
    });




  }

  ngOnInit() {
    this.getData();
  }
  ngOnDestroy() {
    this.storageService.removeItem('product');

  }

  prevImage(): void {
    // this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
    if (this.currentIndex != 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = 4;
    }
  }

  nextImage(): void {
    if (this.currentIndex < this.imageObject.length - 1) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
  }



  getProductAll() {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data.data;
        console.log(this.products);

        let d = _.clone(data.data);
        d.map((e: any) => {
          let f = this.images.filter((i: any) => i.product_id === e.product_id);
          e.images = f;
        });

        if (isBrowser()) {
          let id = JSON.parse(this.storageService.getItem('product'));
          let tmp = _.clone(this.products);
          this.product = tmp.find(e => e.product_id == id);
          this.imageObject = this.product?.images.map((e: any) => e.image_url);
          console.log(this.products);
          console.log(this.imageObject);

        }

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  AddCart(product: IProduct) {
    let storage: any[] = [];
    this.store.select('product').subscribe(e => {
      storage = [e];
    });
    let ff: any = storage.find((e: any) => e?.product?.product_id == product.product_id);


    let _data: any[];
    [_data = storage[0].count] = storage;
    if (_data.length && ff) {
      let f: any = _data.find((e: any) => e.product.product_id == product.product_id);
      this.store.dispatch(addProduct({ product: product, count: f.count }));

    } else {
      this.store.dispatch(addProduct({ product: product, count: 1 }));
    }



  }

  BuyNow(product: IProduct) {
    let storage: any[] = [];
    this.store.select('product').subscribe(e => {
      storage = [e];
    });

    if (storage.length) {
      let _data: any[];
      [_data = storage[0].count] = storage;
      console.log(_data);

      let f: any = _data.find((e: any) => e.product.product_id == product.product_id);

      if (f) {
        this.store.dispatch(addProduct({ product: product, count: f.count }));
      } else {
        this.store.dispatch(addProduct({ product: product, count: 0 }));
      }
    }
    this.router.navigate(['/cart']);
  }
}
