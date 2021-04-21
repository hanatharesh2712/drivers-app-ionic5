import { DrvnAuthenticationService } from './../auth/auth.service';
import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent,
    HttpErrorResponse
} from '@angular/common/http';
import {
    Observable,
    BehaviorSubject,
    from
} from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {_throw as observableThrowError} from 'rxjs/observable/throw';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private injector: Injector) { }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        if (token !== undefined && token !== 'stale_auth_token') {
            return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
        }
        return req;
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<
        | HttpSentEvent
        | HttpHeaderResponse
        | HttpProgressEvent
        | HttpResponse<any>
        | HttpUserEvent<any>
    > {

        const authService = this.injector.get(DrvnAuthenticationService);
        return from(authService.getAuthToken()).pipe(
          switchMap(token => {
            return next.handle(this.addToken(req, token ? JSON.parse(token).access_token : '')).pipe(
              catchError(error => {
                  if (error instanceof HttpErrorResponse) {
                      switch ((<HttpErrorResponse>error).status) {
                          case 400:
                              return this.handle400Error(error);
                          case 401:
                              return this.handle401Error(req, next, error);
                          case 500:
                              return observableThrowError(error);
                          case 404:
                              return this.handle404Error(error);
                          case 422:
                              return this.handle422Error(error);
                      }
                  } else {
                      return observableThrowError(error);
                  }
              })
          );
          })
        )

    }

    /*intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (JSON.parse(localStorage.getItem('accessInfo'))) {
        // Clone the request to add the new header.
        const authReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            'Bearer ' +
              JSON.parse(localStorage.getItem('accessInfo')).access_token
          )
        });

        // send the newly created request
        return next.handle(authReq).catch((error, caught) => {
          // intercept the respons error and displace it to the console
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
              case 400:
                return this.handle400Error(error);
              case 401:
                return this.handle401Error(req, next);
            }
          } else {
            return Observable.throw(error);
          }
        }) as any;
      } else {
        return next.handle(req).catch((error, caught) => {
          // intercept the respons error and displace it to the console
          console.log(error);
          // return the error to the method that called it
          return Observable.throw(error);
        }) as any;
      }
    }*/

    handle401Error(req: HttpRequest<any>, next: HttpHandler, error) {
      this.logoutUser();
        return observableThrowError(error);
    }

    handle400Error(error) {
        if (
            error &&
            error.status === 400 &&
            error.error &&
            error.error.error === 'invalid_grant'
        ) {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser();
        }

        return observableThrowError(error);
    }

    handle404Error(error) {
        if (
            error &&
            error.status === 404 &&
            error.error &&
            error.error.error === 'invalid_grant'
        ) {

        }

        return observableThrowError(error);
    }

    handle422Error(error) {
        if (
            error &&
            error.status === 422 &&
            error.error &&
            error.error.error === 'invalid_grant'
        ) {

        }

        return observableThrowError(error);
    }

    logoutUser() {
        const authService = this.injector.get(DrvnAuthenticationService);
        authService.logout();

        return observableThrowError(null);
    }

}
