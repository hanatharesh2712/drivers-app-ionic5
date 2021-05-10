import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models/review';
import { environment } from '@env/environment';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
  providedIn: 'root'
})

export class FAQService {
  faq: Review[];

  constructor(private http: HttpClient){}


  getFAQ() {
    return this.http.get<any>(environment.appUrl + 'getFaq').pipe(map(response =>
      {
        this.faq = response;
        return this.faq;
      })).toPromise();
  }





}
