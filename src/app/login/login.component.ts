import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberme: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _userService: UserService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.rememberme = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '255416208506-o2k7mia0542gb1597irnetacl7hph1e2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingin(document.getElementById('btnGoogle'));

    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  attachSingin( element ) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle(token)
//      .subscribe( res => this.router.navigate(['/dashboard']));
      .subscribe( res => window.location.href = '#/dashboard');
    });
  }

  singIn( form: NgForm) {

    if (form.invalid) {
      return;
    }

    let user = new User(null, form.value.email, form.value.password);

    this._userService.login(user, form.value.rememberme)
      .subscribe( res => this.router.navigate(['/dashboard']));
  }

}
