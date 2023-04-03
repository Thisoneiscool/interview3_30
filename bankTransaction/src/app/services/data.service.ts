import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_TRANSACTION_URL } from '../constants/url.constant';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<any>{
    return this.http.get(GET_TRANSACTION_URL)
  }
}
