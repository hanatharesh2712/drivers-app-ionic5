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
  authToken: any;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private storage: Storage
  ) {
    this.currentToken = this.authTokenStale;
  }

  ngOnInit() {


  }

  initUser() {
    return new Promise((resolve, reject) => {
    this.getAuthToken().then(token => {
      if (token)
      {
        this.authToken = JSON.parse(token).access_token;
        this.getCurrentDriverInfo().then(response =>
          {
            resolve(response);

          });
      }
    }, error => {
      resolve(null)
    })})
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


  sendCode(mobile_phone) {
    this.mobilePhone = mobile_phone;
    return this.http.get(environment.noLoginUrl + 'da/sendLoginPassword?phone=' + mobile_phone)
      .toPromise();
  }


}