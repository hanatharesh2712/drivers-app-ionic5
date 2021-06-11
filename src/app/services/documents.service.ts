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

  needDocuments = false;
  constructor(private http: HttpClient) {

  }


  setStep(index) {

  }

  getDocuments() {
    return this.http.get<any[]>(environment.appUrl + 'getDocuments').pipe(map((response: any) => {
      let documentTypes = [...response.documentTypes.map(e=> e.partner_document_type), ...response.generalDocumentTypes ] ;
      documentTypes.forEach(element => {
        let col = element.type == 1 ? response.partnerDocuments : element.type == 2 ? response.driverDocuments : response.vehicleDocuments;
        let existingDocument = col.find(e =>  e.document && e.document.document_type_id == element.id);
        if (existingDocument) {
          element.document = existingDocument.document;
          element.submitted = true;
        }

      });
      this.needDocuments =this.cheeckNeededDocument(documentTypes);
      return documentTypes
    })).toPromise();
  }

  cheeckNeededDocument(doc)
  {
    return doc.some(e => e.required == 1 && ((e.has_file && !e.submitted) || (!e.has_file && (!e.document! || !e.document.answer))))
  }


  uploadDocument(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.appUrl + 'savePartnerDocument', data)
        .subscribe((response: any) => {
          resolve(response);
        },
          (error) => reject(null),
          reject);
    });
  }



  removeDocument(id) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.appUrl + 'removePartnerDocument', { id })
        .subscribe((response: any) => {
          resolve(response);
        },
          (error) => reject(null),
          reject);
    });
  }


}
