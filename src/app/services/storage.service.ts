import { Injectable } from '@angular/core';
import { isBrowser } from '../utils/is-browser';
import { IProduct } from '../interfaces/product';
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }

  // Acart(product: IProduct | undefined): void {
  //   // this.setItem('cart', '[]');
  //   this.cart = JSON.parse(this.getItem('cart'));
  //   console.log(this.cart);

  //   if (this.cart == null) {
  //     this.setItem('cart', '[]');
  //   } else if (this.cart.length > 0) {

  //   } else {
  //     this.cart.push(product);
  //     this.setItem('cart', `${[product]}`);
  //   }

  // }

  setItem(key: string, value: string): void {
    if (isBrowser()) {
      localStorage.setItem(key, value);
    } else {
      console.warn('localStorage is not available');
    }
  }

  getItem(key: string): string {
    if (isBrowser()) {
      return String(localStorage.getItem(key));
    } else {
      console.warn('localStorage is not available');
      return String('');
    }
  }

  removeItem(key: string): void {
    if (isBrowser()) {
      localStorage.removeItem(key);
    } else {
      console.warn('localStorage is not available');
    }
  }

}
