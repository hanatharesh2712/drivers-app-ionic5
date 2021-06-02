import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/internal/operators/map';
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

  getRegistrationData() {
    return this.http.get<any[]>(environment.appUrl + 'getRegistrationData').pipe(map(response => {
      return response
    })).toPromise();
  }


  savePartnerExtraData(data)
  {
    return this.http.post<any[]>(environment.appUrl + 'savePartnerExtraData', data).pipe(map(response => {
      return response
    })).toPromise();
  }

  savePartnerVehicleData(data)
  {
    return this.http.post<any[]>(environment.appUrl + 'savePartnerVehiclesInformation', data).pipe(map(response => {
      return response
    })).toPromise();
  }

  savePartnerBankInformation(data)
  {
    return this.http.post<any[]>(environment.appUrl + 'savePartnerBankInformation', data).pipe(map(response => {
      return response
    })).toPromise();
  }
}
