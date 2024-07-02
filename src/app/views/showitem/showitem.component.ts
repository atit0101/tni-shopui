import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { addProduct, decrement, reset } from '../../store/actions';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-showitem',
  standalone: true,
  imports: [],
  templateUrl: './showitem.component.html',
  styleUrl: './showitem.component.scss'
})
export class ShowitemComponent {

  // private $product: Observable<IProduct>;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<{ product: IProduct; }>) {
    this.store.pipe(select('product')).subscribe(product => {
      // product;
      // console.log(product);

      // Perform additional logic here if needed
    });


  }
  ngOnInit() {
    let data = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
  }
}
