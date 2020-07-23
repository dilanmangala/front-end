import {AfterViewInit, Component, OnInit, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {Router} from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'ap-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @Input()  name: any;
  @Input()  email: any;
  // name: string;
  // email: string;
  public config: PerfectScrollbarConfigInterface = {};
  // This is for Notifications
  notifications: Object[] = [{
    round: 'round-danger',
    icon: 'ti-link',
    title: 'Luanch Admin',
    subject: 'Just see the my new admin!',
    time: '9:30 AM'
  }, {
    round: 'round-success',
    icon: 'ti-calendar',
    title: 'Event today',
    subject: 'Just a reminder that you have event',
    time: '9:10 AM'
  }, {
    round: 'round-info',
    icon: 'ti-settings',
    title: 'Settings',
    subject: 'You can customize this template as you want',
    time: '9:08 AM'
  }, {
    round: 'round-primary',
    icon: 'ti-user',
    title: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:00 AM'
  }];
  // This is for Mymessages
  mymessages: Object[] = [{
    useravatar: 'assets/images/users/1.jpg',
    status: 'online',
    from: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:30 AM'
  }, {
    useravatar: 'assets/images/users/2.jpg',
    status: 'busy',
    from: 'Sonu Nigam',
    subject: 'I have sung a song! See you at',
    time: '9:10 AM'
  }, {
    useravatar: 'assets/images/users/2.jpg',
    status: 'away',
    from: 'Arijit Sinh',
    subject: 'I am a singer!',
    time: '9:08 AM'
  }, {
    useravatar: 'assets/images/users/4.jpg',
    status: 'offline',
    from: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:00 AM'
  }];

  constructor(private modalService: NgbModal, private router: Router, private loginService: LoginService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    let set = function () {
      let width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
      let topOffset = 0;
      if (width < 1170) {
        $('#main-wrapper').addClass('mini-sidebar');
      } else {
        $('#main-wrapper').removeClass('mini-sidebar');
      }
    };
    $(window).ready(set);
    $(window).on('resize', set);


    $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
      $('.app-search').toggle(200);
    });


    $('body').trigger('resize');
  }

  logOut() {
    this.loginService.logOut();
  }
}
