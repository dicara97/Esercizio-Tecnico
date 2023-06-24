import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authentication: AuthenticationService,
    ) 
  {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.authentication.userValue;
    const isLoggedIn = user && user.authData;
    const apiRequest = request.url.startsWith(environment.api);
    if(isLoggedIn && apiRequest ) {
      request = request.clone({
        setHeaders :{
          Authorization:`Basic ${user.authData}`,
        },
      })
    }
    return next.handle(request);
  }
}
