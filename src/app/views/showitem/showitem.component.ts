import { Component, Input } from '@angular/core';
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
  protected imageObject: Array<string> = [];
  prodduct_data: any;
  // private $product: Observable<IProduct>;
  currentIndex = 0;
  @Input() images: string[] = [];



  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ product: IProduct; }>,
    private storageService: StorageService,
    private flowbiteService: FlowbiteService,
    private router: Router
  ) {

  }

  prevImage(): void {
    // this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
    if (this.currentIndex != 0) {
      this.currentIndex -= 1;
    }
  }

  nextImage(): void {
    if (this.currentIndex < this.imageObject.length - 1) {
      this.currentIndex += 1;
    }
  }


  ngOnInit() {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });


    if (isBrowser()) {
      this.product = JSON.parse(this.storageService.getItem('product'));
      console.log(this.product);
      this.product?.images.map(e => {
        if (e.image_url) {
          this.imageObject?.push(e.image_url);
        }
      });



    }
    let data = JSON.parse(this.product?.product_data || '');
    this.prodduct_data = Object.keys(data).map((key) => [key, data[key]]);
    console.log(this.prodduct_data);
  }

  AddCart(product: IProduct) {
    this.store.dispatch(addProduct({ product: product }));
  }

  BuyNow(product: IProduct) {
    this.store.dispatch(addProduct({ product: product }));
    this.router.navigate(['/cart']);
  }
}
