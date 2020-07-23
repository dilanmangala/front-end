import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginService} from './login.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const helper = new JwtHelperService();

    const expectedRole = next.data.expectedRole;
    let roles;
    this.loginService.getAthenticatedUserToken().subscribe((data: any) =>{
      roles=data.roleList;
    },error=>{
      this.loginService.logOut();
    })
    // const roles = helper.decodeToken(localStorage.getItem('userToken')).realm_access.roles;
    const foundRole = roles.find(e => e === expectedRole);
    if (localStorage.getItem('userToken') != null &&
      foundRole && helper.isTokenExpired(localStorage.getItem('userToken'))) {
      return true;
    } else {
      if (this.router.url != '/authentication/login') {
        this.loginService.logOut();
        return false;
      }
    }

  }
}
