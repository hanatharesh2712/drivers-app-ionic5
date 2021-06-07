import { RegistrationAPIService } from '@app/services/registration-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models/review';
import { environment } from '@env/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Storage } from '@ionic/storage';
import { UtilService } from './util/util.service';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class DocumentsService {

  constructor(private http: HttpClient) {

  }


  setStep(index) {

  }

  getDocuments() {
      return this.http.get<any[]>(environment.appUrl + 'getDocuments').pipe(map(response => {
        return response
      })).toPromise();
  }

}
