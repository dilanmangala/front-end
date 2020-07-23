import {AfterViewInit, Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
// import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {API_URL} from '../../../../../environments/api-url';


import {max} from 'rxjs/operator/max';
import {LoginService} from '../../../services/auth/login.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ROUTES} from '../../../sidebar';
import {AppConstent} from '../../../../../environments/app-constent';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {
// AUTH_URI = 'http://13.250.64.158:8080/oauth';
// CLIENT_ID = 'testjwtclientid';
// CLIENT_SECRATE = '123';
  url:String="/authentication/login";
  isShow: boolean;
  isLoginError = false;
  isLoginServerError = false;
  loginFormGroup: FormGroup;
  constructor(public router: Router,
              private toastr: ToastsManager,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  onRequestStarted(): void {
    this._loading = true;
  }

  onRequestFinished(): void {
    this._loading = false;
  }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngAfterViewInit() {
    $(function () {
      $('.preloader').fadeOut();
    });

    $('#to-recover').on('click', function () {
      $('#loginform').slideUp();
      $('#recoverform').fadeIn();
    });
  }

 async onLoggedinButtonClick() {
    this.loginFormGroup.controls['name'].markAsTouched();
    this.loginFormGroup.controls['password'].markAsTouched();
    if (this.loginFormGroup.valid) {
      const userName = this.loginFormGroup.controls.name.value;
      const password = this.loginFormGroup.controls.password.value;

      //this.router.navigate(['/dashboard/dashboard']);
      this.loginService.userAuthentication(userName, password).subscribe(async (data: any) => {
          localStorage.setItem('userToken', data.access_token);
          localStorage.setItem('userName', userName);
          localStorage.setItem('isLoggedin', 'true');
          await this.getAuthorizeDefaultUrl();
          this.router.navigate([this.url]);
        },
        (err: HttpErrorResponse) => {
          this.isLoginError = true;
          this.isLoginServerError = false;
        });
    }
  }

  async getAuthorizeDefaultUrl(){
    const sidebarnavItems = JSON.parse(JSON.stringify(ROUTES.filter(sidebarnavItem => sidebarnavItem)));
    const helper = new JwtHelperService();
    let roles;
    let role;
    role=await this.loginService.getAthenticatedUserToken().toPromise();
      roles= role.roleList;
      if(roles){
        const foundRole =roles.find(e => e === AppConstent.DASHBOARD_PERMISSION)
        if (foundRole) {
          this.url = sidebarnavItems.find(e => e.parentId === AppConstent.DASHBOARD_PERMISSION).path;
        } else {
          if (sidebarnavItems.find(e => e.parentId === roles[0])) {
            this.url = sidebarnavItems.find(e => e.parentId === roles[0]).path;
          } else {
            sidebarnavItems.forEach(element => {
              if (element.submenu.length > 0) {
                if (element.submenu.find(e => e.parentId === roles[0])) {
                  this.url = element.submenu.find(e => e.parentId === roles[0]).path;
                } else {
                  element.submenu.forEach(subElement => {
                    if (subElement.submenu.length > 0 && subElement.submenu.find(e => e.parentId === roles[0])) {
                      this.url = subElement.submenu.find(e => e.parentId ===roles[0]).path;
                    }
                  });
                }
              }
            });
          }
        }
      }
      // return this.url;
    // });
    //    const roles=data.roleList;
    // const roles = helper.decodeToken(localStorage.getItem('userToken')).realm_access.roles;
    
  // })

  }

  clickEvent() {
    this.isShow = true;
    const element: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    element.type = 'text';
  }

  relEvent() {
    this.isShow = false;
    let element: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    element.type = 'password';
  }

  changeError() {
    this.isLoginError = false;
  }
}
