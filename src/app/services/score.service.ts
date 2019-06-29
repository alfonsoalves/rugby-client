import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  baseUrl = environment.baseUrl;
  url = environment.baseUrl;
 
  constructor(private http: HttpClient) {
    this.url = this.baseUrl + 'scores';
  }



}
