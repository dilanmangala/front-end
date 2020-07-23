import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { max } from 'rxjs/operator/max';
import { LoginService } from '../../../services/auth/login.service';
import { ToastsManager } from "ng2-toastr";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  passwordResetFormGroup: FormGroup;
  isPasswordMatch: boolean;
  isShow: boolean;

  constructor(public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef,
    private formBuilder: FormBuilder,
    private loginService: LoginService, ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.passwordResetFormGroup = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ])
    });
  }


  passwordReset() {
    this.passwordResetFormGroup.controls['name'].markAsTouched();
    this.passwordResetFormGroup.controls['password'].markAsTouched();
    this.passwordResetFormGroup.controls['confirmPassword'].markAsTouched();

    const userName = this.passwordResetFormGroup.controls.name.value;
    const password = this.passwordResetFormGroup.controls.password.value;
    const confirmPassword = this.passwordResetFormGroup.controls.confirmPassword.value;

    if (password != confirmPassword) {
      this.isPasswordMatch = false;
       this.passwordResetFormGroup.controls['confirmPassword'].setErrors({'incorrect': true});        
    } else {
      this.isPasswordMatch = true;
     // this.passwordResetFormGroup.controls['confirmPassword'].setErrors(null);
    }   

    if (this.passwordResetFormGroup.valid) {
      this.loginService.passwordReset(userName, password, confirmPassword).subscribe((data: any) => {
         this.toastr.success("Password Reset Successfully");
           this.router.navigate(['/authentication/login']);
         },
         (err: HttpErrorResponse) => {
           this.toastr.error(err.error);
         });
    }
  }

  clickEvent(type) {
    this.isShow = true;
    let element: HTMLInputElement = document.getElementById(type) as HTMLInputElement;
    element.type = 'text';
  }

  relEvent(type) {
    this.isShow = false;
    let element: HTMLInputElement = document.getElementById(type) as HTMLInputElement;
    element.type = type;
  }

}
