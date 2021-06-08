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
    return this.http.get<any[]>(environment.appUrl + 'getDocuments').pipe(map((response: any) => {
      response.documentTypes.forEach(element => {
        let col = element.partner_document_type.type == 1 ? response.partnerDocuments : element.partner_document_type.type == 2 ? response.driverDocuments : response.vehicleDocuments;
        let existingDocument = col.find(e => e.document.document_type_id == element.partner_document_type.id);
        if (existingDocument) {
          element.document = existingDocument.document;
          //   element.submitted = true;
        }
      });
      return response
    })).toPromise();
  }


  uploadDocument(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.appUrl + 'saveDocument', data)
        .subscribe((response: any) => {
          resolve(response);
        },
          (error) => reject(null),
          reject);
    });
  }



  removeDocument(document_id) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.appUrl + 'removeDocument', { document_id })
        .subscribe((response: any) => {
          resolve(response);
        },
          (error) => reject(null),
          reject);
    });
  }


}
