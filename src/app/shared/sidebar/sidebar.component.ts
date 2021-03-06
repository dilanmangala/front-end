import {Component, OnInit, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ROUTES} from './menu-items';
import {RouteInfo} from './sidebar.metadata';
import {Router, ActivatedRoute} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { LoginService } from '../services';
import { FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'

})
export class SidebarComponent implements OnInit {
  _name:string [];
  @Input('role') roles:string[]
  
  showMenu: string = '';
  showSubMenu: string = '';
  urlArr: any[];
  public sidebarnavItems: any[];

  //this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';

    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';

    } else {
      this.showSubMenu = element;
    }
  }

  constructor(private modalService: NgbModal, private router: Router,
              private route: ActivatedRoute, private loginService: LoginService) {

  }

  // End open close
  ngOnInit() {

    const url = location.hash;
    this.urlArr = url.split('/');

    /* logic to menu expand */
    if (this.urlArr.length > 0) {
      if (this.urlArr[1]) {
        let baseElement = this.urlArr[1].toLowerCase();
        baseElement = baseElement.replace('-', ' ');
        this.showMenu = baseElement;
      }
      if (this.urlArr[2]) {
        let baseElement = this.urlArr[2].toLowerCase();
        baseElement = baseElement.replace('-', ' ');
        this.showSubMenu = baseElement;
      }
    }

    this.transformPermssion();
    // this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    $(function () {
      $('.sidebartoggler').on('click', function () {
        if ($('#main-wrapper').hasClass('mini-sidebar')) {
          $('body').trigger('resize');
          $('#main-wrapper').removeClass('mini-sidebar');

        } else {
          $('body').trigger('resize');
          $('#main-wrapper').addClass('mini-sidebar');
        }
      });

    });

        $(function () {
            $(".sidebartoggler").on('click', function () {
                if ($("#main-wrapper").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $("#main-wrapper").removeClass("mini-sidebar");

                } else {
                    $("body").trigger("resize");
                    $("#main-wrapper").addClass("mini-sidebar");
                }
            });

       });
       // this.showMenu = 'Master Data';
   }

   /** Generate Menu base on permission */
   async transformPermssion() {
       this.sidebarnavItems=JSON.parse(JSON.stringify(ROUTES.filter(sidebarnavItem => sidebarnavItem)));
       const helper = new JwtHelperService();
       let roleList=this.roles;
       var parentI = this.sidebarnavItems.length;
       while (parentI--) {
           var subI = this.sidebarnavItems[parentI].submenu.length;
           if (subI > 0) {
               while (subI--) {
                   var subChildI = this.sidebarnavItems[parentI].submenu[subI].submenu.length;
                   if (subChildI > 0) {
                       while (subChildI--) {
                           if (this.sidebarnavItems[parentI].submenu[subI].submenu[subChildI].parentId &&
                               !roleList.find(e => e === this.sidebarnavItems[parentI].submenu[subI].submenu[subChildI].parentId)) {
                               this.sidebarnavItems[parentI].submenu[subI].submenu.splice(subChildI, 1);
                           }
                       }
                       if (this.sidebarnavItems[parentI].submenu[subI].submenu.length == 0) {
                           this.sidebarnavItems[parentI].submenu.splice(subI, 1);
                       }
                   }else{
                       if (this.sidebarnavItems[parentI].submenu[subI].parentId &&
                           !roleList.find(e => e === this.sidebarnavItems[parentI].submenu[subI].parentId)) {
                           this.sidebarnavItems[parentI].submenu.splice(subI, 1);
                       }
                   }
               }
               if (this.sidebarnavItems[parentI].submenu.length == 0) {
                   this.sidebarnavItems.splice(parentI, 1);
               }
           } else {
               if (this.sidebarnavItems[parentI].parentId &&
                   !roleList.find(e => e === this.sidebarnavItems[parentI].parentId)) {
                   this.sidebarnavItems.splice(parentI, 1);
               }
           }

  /** Generate Menu base on permission 
  transformPermssion() {
    this.sidebarnavItems = JSON.parse(JSON.stringify(ROUTES.filter(sidebarnavItem => sidebarnavItem)));
    const helper = new JwtHelperService();
    // console.log(helper.decodeToken(localStorage.getItem('userToken')));
    const roles = helper.decodeToken(localStorage.getItem('userToken')).realm_access.roles;
    var parentI = this.sidebarnavItems.length;
    while (parentI--) {
      var subI = this.sidebarnavItems[parentI].submenu.length;
      if (subI > 0) {
        while (subI--) {
          var subChildI = this.sidebarnavItems[parentI].submenu[subI].submenu.length;
          if (subChildI > 0) {
            while (subChildI--) {
              if (this.sidebarnavItems[parentI].submenu[subI].submenu[subChildI].parentId &&
                !roles.find(e => e === this.sidebarnavItems[parentI].submenu[subI].submenu[subChildI].parentId)) {
                this.sidebarnavItems[parentI].submenu[subI].submenu.splice(subChildI, 1);
              }
            }
            if (this.sidebarnavItems[parentI].submenu[subI].submenu.length == 0) {
              this.sidebarnavItems[parentI].submenu.splice(subI, 1);
            }
          }
        }
        if (this.sidebarnavItems[parentI].submenu.length == 0) {
          this.sidebarnavItems.splice(parentI, 1);
        }
      } else {
        if (this.sidebarnavItems[parentI].parentId &&
          !roles.find(e => e === this.sidebarnavItems[parentI].parentId)) {
          this.sidebarnavItems.splice(parentI, 1);
        }
      }*/

        
    // }
    }
  }
}
