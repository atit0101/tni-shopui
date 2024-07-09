import { Component } from '@angular/core';
import { StorageService } from "../../services/storage.service";
import { json } from 'stream/consumers';
import { IProduct } from '../../interfaces/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  count: number = 0;
  cart: IProduct[] = [];
  constructor(
    private store: Store<{ product: IProduct[]; }>,
    public storageService: StorageService) {
    // this.cart = this.store.select('product').subscribe(e => e);
    this.store.select('product').subscribe((e: IProduct[]) => {
      this.cart = e;
    });



    // console.log(this.storageService.cart);
    // this.cart$ = this.store.select('product');
  }

  ngOnInit(): void {
    // console.log(this.cart$);
  }


}

export let mycart: Array<IProduct | Object | any> = [];

