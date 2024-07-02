import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

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

  getAllImages() {
    const uri = `/Image/getall`;
    const url = this.apiURL + uri;
    return this.http.get(url, this.httpOptions);
  }
}
