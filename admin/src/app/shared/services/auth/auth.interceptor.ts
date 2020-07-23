import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {LoginService} from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private loginService: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.router.url != '/authentication/login' &&
      this.router.url != '/authentication/passwordreset' && this.router.url != '/authentication/forgotpassword') {

      let authHeader = '';
      if (!this.router.url.includes('dashboard')) {
        authHeader = localStorage.getItem('userToken');
      } else {
        authHeader = 'bearer ' + localStorage.getItem('userToken');
      }

      request = request.clone({
        setHeaders: {
          Authorization: authHeader,
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
       if (event instanceof HttpResponse) {
        // process successful responses here
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        /** TODO
         * Remoe status 0 if error occurd, this is add for cors issue after sending 401
         */
        // if (error.status === 401 || error.status === 0) {
        if (error.status === 401) {
          this.loginService.logOut();
        } else if (error.status === 417) {
          if (error.error === '401 Unauthorized' || error.error.message === '401 Unauthorized' || error.message === '401 Unauthorized') {
            this.loginService.logOut();
          }
        }
      }
    });
  }

  /*if (req.headers.get('No-Auth') === 'True')
    return next.handle(req.clone({
      headers: req.headers.set('Access-Control-Allow-Origin', '*')
    }));

  if (localStorage.getItem('userToken') != null) {
    const clonedreq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
    });
    return next.handle(clonedreq)
      .do(
        succ => {
        },
        err => {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
      );
  } else {
    this.router.navigateByUrl('/login');
  }
}*/
}
