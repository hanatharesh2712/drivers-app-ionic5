import { DocumentsService } from '@app/services/documents.service';
import { Inject, Injectable, PLATFORM_ID, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';
import { User } from '@app/models/user';
import { environment } from '@env/environment';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
@Injectable()
export class DrvnAuthenticationService implements OnInit {
  public authTokenStale = 'stale_auth_token';
  public authTokenNew = 'new_auth_token';
  public currentToken: string;
  onLogin: Subject<any> = new Subject();
  onLogout: Subject<any> = new Subject();
  onCurrentUser: Subject<any> = new Subject();
  currentUser: User;
  mobilePhone: any;
  hashCode: any;
  smsBody: any;
  authToken: any;
  device_info;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private storage: Storage,
    private documentsService: DocumentsService
  ) {
    this.currentToken = this.authTokenStale;
  }

  ngOnInit() {


  }

  initUser() {
    return new Promise((resolve, reject) => {
      this.getAuthToken().then(token => {
        if (token) {
          this.authToken = JSON.parse(token).access_token;
          this.getCurrentDriverInfo().then(response => {
            this.documentsService.getDocuments().then(response => {
              resolve(response);
            })


          });
        }
        else {
          resolve(null);

        }
      }, error => {
        resolve(null)
      })
    })
  }

  getCurrentDriverInfo() {
    return this.http.get(environment.appUrl + 'getCurrentDriverInfo').toPromise()
      .then((response_user: any) => {
        this.storage.set('currentUser', JSON.stringify(response_user));
        this.currentUser = response_user;
        this.onLogin.next(this.currentUser);
        return response_user;
      }, error => {
        return null
      });
  }

  login(phone, password) {
    this.logout();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    const postData = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'OA4q9x3duAoFbQuuUkzHioSjaWdiORGkgeaSDNQa',
      username: phone,
      password,
      provider: 'drivers',
      _platform: this.device_info,
      scope: '',
      redirect: false
    };

    return this.http
      .post<any>(environment.loginUrl, JSON.stringify(postData), {
        headers: headers
      })
      .pipe(map(response => {
        if (response) {
          this.storage.set('accessInfo', JSON.stringify(response));
          this.authToken = response.access_token;
          this.getCurrentDriverInfo().then();
        } else {
          this.logout();
        }
        return response;
      }))
      .toPromise();
  }

  logout() {
    this.storage.remove('accessInfo');
    this.storage.remove('currentUser');
    this.onLogout.next();
  }

  getAuthToken() {
    return this.storage.get('accessInfo');
  }


  sendCode(mobile_phone, hash_code) {
    this.mobilePhone = mobile_phone;
    this.hashCode = hash_code;
    return this.http.get<any>(environment.noLoginUrl + 'da/sendLoginPassword?phone=' + mobile_phone + '&hashCode=' + hash_code).pipe(map(response => {
      if (response) {
        this.smsBody = response.smsBody;
      }
      return response;
    })).toPromise();
  }


}
