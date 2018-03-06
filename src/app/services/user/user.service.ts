import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(
    public http: HttpClient
  ) { }

  login( user: User, remember: boolean = false) {

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICES + '/login';

    return this.http.post(url, user)
      .map( (res: any) => {

        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.User));
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
