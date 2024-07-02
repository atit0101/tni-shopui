import { Injectable, inject } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private http = inject(HttpClient);

  constructor() {
    this.apiURL = environments.baseURLAPI;
  }

  getAllProducts() {
    const uri = `/Product/getall`;
    const url = this.apiURL + uri;
    return this.http.get(url, this.httpOptions);
  }
}
