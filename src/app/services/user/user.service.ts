import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.loadStorage();
   }

  saveInStorage( id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token })
      .map( (res: any) => {
        this.saveInStorage(res.id, res.token, res.user);
        return true;
      });
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
      this.user = null;
    }
  }

  isLogged() {
    return ( this.token.length > 5 ) ? true : false;
  }

  login( user: User, remember: boolean = false) {

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICES + '/login';

    return this.http.post(url, user)
      .map( (res: any) => {
        this.saveInStorage(res.id, res.token, res.user);
        return true;
      });
  }

  createUser( user: User) {
    let url = URL_SERVICES + '/user';

    return this.http.post(url, user)
      .map( (res: any) => {
        swal('User Created', user.email, 'success');
        return res.user;
      });

  }

}