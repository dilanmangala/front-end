import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_URL } from './../../../../environments/api-url';
import { Observable } from 'rxjs/Observable';
import { LoginRequest } from './../../models/authenticate-subscriber/login.request';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,  private router: Router) { }
   //Keycloak
  userAuthentication(userName, password): Observable<any> {
    const data = {"username":userName, "password" :password,
                  "grant_type": "password", "client_id": API_URL.CLIENT_ID };
    const res = this.http.post(API_URL.AUTH_SERVICE + '/auth/', data);
    return res;
  }

  passwordReset(userName, password, token): Observable<any> {
    const data = {"id":"", "password" :password, "userName": "" };

    const reqHeader = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*'
    });
    const res = this.http.post(API_URL.AUTH_SERVICE + '/adminuser/resetpassword', data, {headers: reqHeader});
    return res;
  }

  forgotPassword(username): Observable<any> {
    const res = this.http.get(API_URL.AUTH_SERVICE + '/adminuser/forgotpassword/'+username);
    return res;
  }

  logOut() {
    const helper = new JwtHelperService();
    const session = helper.decodeToken(localStorage.getItem('userToken')).session_state;
    this.http.post(API_URL.AUTH_SERVICE + '/auth/logout/' + session, '').subscribe();
    localStorage.removeItem('userToken');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('userName');
    this.router.navigate(['/authentication/login']);
  }

  getAthenticatedUserToken():Observable<any>{
    let token = "bearer "+localStorage.getItem('userToken');
    const reqHeader = new HttpHeaders({
      'Authorization': token
    })
    return this.http.get(API_URL.ADMIN_SERVICE + "/adminuser/profileInfo" , {headers: reqHeader});
  }
}
