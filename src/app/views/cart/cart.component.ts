import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageService } from '../../services/storage.service';
import { IProduct } from '../../interfaces/product';
import { DecimalPipe } from '@angular/common';
import { addProduct, decrement, reset } from '../../store/actions';
import { RouterLink } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [DecimalPipe]
})
export class CartComponent {

  products: Array<any> = [];
  total: number = 0;
  name = 'Angular Html To Pdf ';



  constructor(
    private store: Store<{ product: IProduct[]; }>,
    private decimalPipe: DecimalPipe,
  ) {
    store.select('product').subscribe(e => {
      this.products = e;
      this.CalPrice(this.products);
    });
  }

  remove(product: any) {
    // console.log(product);

    this.store.dispatch(decrement({ product: product }));
  }

  CalPrice(product: any) {
    // console.log(product);
    if (!product.length) {
      this.total = 0;
    } else {
      this.total = 0;
      product.map((e: any) => {
        this.total += e.count * e.product.price;
      });
    }

  }



  RequireQ(form: NgForm) {

    const doc = new jspdf.jsPDF('p', 'mm', 'a4');

    const pageHeight = doc.internal.pageSize.getHeight();
    let currentY = 20;

    // Header
    doc.setFontSize(18);
    doc.text('Quotation', 105, currentY, { align: 'center' });
    currentY += 10;

    // Company Information
    doc.setFontSize(12);
    doc.text('Papaya Store', 20, currentY);
    currentY += 5;
    doc.text('55/1 Lat Phrao', 20, currentY);
    currentY += 5;
    doc.text('City : TH , State : Lat Phrao, ZIP : 10230', 20, currentY);
    currentY += 5;
    doc.text('Phone: (555) 555-5555', 20, currentY);
    currentY += 5;
    doc.text('Email: papaya@company.com', 20, currentY);
    currentY += 10;

    // Quotation Details
    doc.setFontSize(14);
    doc.text('Quotation To:', 20, currentY);
    currentY += 5;
    doc.setFontSize(12);
    doc.text(form.value.name, 20, currentY);
    currentY += 5;
    doc.text(form.value.address, 20, currentY);
    currentY += 5;
    doc.text(`${form.value.city}, ${form.value.state}, ${form.value.zip}`, 20, currentY);
    currentY += 5;
    doc.text(`Email: ${form.value.email}`, 20, currentY);
    currentY += 5;
    doc.text('Date: ' + new Date().toLocaleDateString(), 20, currentY);
    currentY += 10;

    // Table Header
    doc.setFontSize(12);
    doc.text('Description', 20, currentY);
    doc.text('Qty', 120, currentY);
    doc.text('Unit Price', 140, currentY);
    doc.text('Total', 180, currentY);
    currentY += 10;

    // Table Content
    const items = [
      { description: 'Item 1', qty: 2, unitPrice: 50, total: 100 },
      { description: 'Item 2', qty: 3, unitPrice: 30, total: 90 },
      { description: 'Item 3', qty: 1, unitPrice: 120, total: 120 },
      // Add more items as needed to test pagination
    ];

    console.log(this.products);


    this.products.forEach(item => {
      if (currentY + 10 > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(item.product.product_name.substring(0, 35) + '...', 20, currentY);
      doc.text(item.count.toString(), 120, currentY);
      doc.text(item.product.price.toFixed(2), 140, currentY);
      doc.text((item.product.price * item.count).toFixed(2), 180, currentY);
      currentY += 10;
    });

    // Total
    if (currentY + 20 > pageHeight) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(14);
    doc.text('Total: ' + this.total.toFixed(2), 150, currentY + 10);

    // Footer
    if (currentY + 30 > pageHeight) {
      doc.addPage();
      currentY = 20;
    }
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 105, 290, { align: 'center' });

    doc.save("test.pdf");

  }

  changeCount(product: any) {
    // console.log(count);

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
  }

  get formattedNumber(): string | null {
    return this.decimalPipe.transform(this.total, '1.2-2');
  }
}
