import { Injectable, inject } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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

  getAllCategory() {
    const uri = `/Categoty/getall`;
    const url = this.apiURL + uri;
    return this.http.get(url, this.httpOptions);
  }

}
