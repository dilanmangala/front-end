import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'ng2-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
// import { Login2Component } from './login2/login2.component';
// import { SignupComponent } from './signup/signup.component';
// import { Signup2Component } from './signup2/signup2.component';

import { AuthenticationRoutes } from './authentication.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '../../services/auth/login.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent,
    // SignupComponent,
    LockComponent //,
    // Login2Component,
    // Signup2Component
,
    PasswordResetComponent
],
  providers: [LoginService]

})

export class AuthenticationModule {}
