import { Component } from '@angular/core';
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../component/footer/footer.component";
import { Store } from '@ngrx/store';
import { StorageService } from '../../services/storage.service';
import { IProduct } from '../../interfaces/product';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-default',
  standalone: true,
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
  imports: [NavbarComponent, RouterOutlet, FooterComponent]
})
export class DefaultComponent {
  isshow: boolean = false;
  constructor(
    private store: Store<{ product: IProduct[]; }>,
    public storageService: StorageService) {
    this.store.select('product').subscribe(e => {
      this.isshow = true;
      setTimeout(() => {
        this.isshow = false;
      }, 2000);
      return e;
    });
  }

}
