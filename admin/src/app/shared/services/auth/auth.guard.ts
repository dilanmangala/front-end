import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginService} from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const helper = new JwtHelperService();
    if (localStorage.getItem('userToken') != null || !helper.isTokenExpired(localStorage.getItem('userToken'))) {
      return true;
    } else {
      if (this.router.url != '/authentication/login') {
        this.loginService.logOut();
        return false;
      }
    }

  }
}
