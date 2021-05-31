import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models/review';
import { environment } from '@env/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Storage } from '@ionic/storage';
import { UtilService } from './util/util.service';
import { AbstractControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})

export class RegistrationAPIService {

  constructor(
    private http: HttpClient) {

  }

  sendRegistrationPhoneCode(phone) {
    return this.http.get<any[]>(environment.noLoginUrl + 'da/sendRegistrationPhoneCode?phone='+ phone).pipe(map(response => {
      return response
    })).toPromise();
  }


  sendRegistrationEmailCode(email) {
    return this.http.get<any[]>(environment.noLoginUrl + 'da/sendRegistrationEmailCode?email='+ email).pipe(map(response => {
      return response
    })).toPromise();
  }


  submitPartnerInformation(data)
  {
    return this.http.post<any[]>(environment.noLoginUrl + 'da/registerPartner', data).pipe(map(response => {
      return response
    })).toPromise();
  }
}
