import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  public get() {
      return this.http.get('assets/logs.txt', { responseType: 'text'});
  }

  public save(data) {
      console.log(data);    
  }
 
}