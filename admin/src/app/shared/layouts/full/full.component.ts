import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  color = 'default';
  showSettings = false;
  showMinisidebar = false;
  showDarktheme = false;
  name:string;
  email:string;
  role:string [];
  public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router,private loginService: LoginService) {}

  async ngOnInit() {
    if(localStorage.getItem('userToken') != null){
      let roles = await this.loginService.getAthenticatedUserToken().toPromise().catch(err=>{
        console.log(err)
        console.log("LOGGING OUT");
        this.loginService.logOut();
      })      
     
      if(roles.name!=null || roles.name!=""){        
      this.name= roles.name;
      this.email=roles.email;
      this.role=roles.roleList;
      }
    }
    if (this.router.url === '/') {
    
      this.router.navigate(['/dashboard/dashboard']);
    }
      
  }


}
