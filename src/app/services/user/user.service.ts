import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  user: User;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
  ) {
    this.loadStorage();
   }

  renewToken() {
    let url = URL_SERVICES + '/login/renuevatoken';
    url += '?token=' + this.token;
    return this.http.get(url)
      .map( (res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        return true;
      })
      .catch( err => {
        this.router.navigate(['/login']);
        swal('No se puedo renovar el token', 'Error al renovar el token, intente logear de nuevo a la aplicacion', 'error');
        return Observable.throw(err);
      });
  }

  saveInStorage( id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu || []));
    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token })
      .map( (res: any) => {
        this.saveInStorage(res.id, res.token, res.user, res.menu);
        return true;
      });
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
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
        this.saveInStorage(res.id, res.token, res.user, res.menu);
        return true;
      })
      .catch( (err: any) => {
        swal('Error en el login', err.error.message, 'error');
        return Observable.throw(err);
      });
  }

  createUser( user: User) {
    let url = URL_SERVICES + '/user';

    return this.http.post(url, user)
      .map( (res: any) => {
        swal('User Created', user.email, 'success');
        return res.user;
      })
      .catch( (err: any) => {
        // una alternativa es crear un servicio de menejo de errores
        // este guarde en un log y mandar al server backend
        swal(err.error.message, err.error.error.message, 'error');
        return Observable.throw(err);
      });
  }

  updateUser( user: User) {

    let url = `${ URL_SERVICES }/user/${ user._id }?token=${ this.token }`;
    return this.http.put(url, user)
      .map( (res: any) => {

        if ( user._id === this.user._id) {
          let userDB: User = res.user;
          this.saveInStorage(userDB._id, this.token, userDB, this.menu);
        }

        swal('User Updated', user.name, 'success');
        return true;
      })
      .catch( (err: any) => {
        // una alternativa es crear un servicio de menejo de errores
        // este guarde en un log y mandar al server backend
        swal(err.error.message, err.error.error.message, 'error');
        return Observable.throw(err);
      });
  }

  updateImage(file: File, id: string) {
    this._uploadFileService.uploadFile(file, 'usuarios', id)
    .then( (res: any) => {
      this.user.img = res.usuarios.img;
      swal('Image Updated', this.user.name, 'success');
      this.saveInStorage(id, this.token, this.user, this.menu);
    })
    .catch( err => {
      console.error(err);
    });
  }

  loadUsers( since: number = 0) {
    let url = URL_SERVICES + '/user?since=' + since;

    return this.http.get(url);
  }

  findUsers( term: string ) {
    let url = URL_SERVICES + '/search/coleccion/usuarios/' + term;
    return this.http.get(url)
      .map((res: any) => res.usuarios);
  }

  deleteUser( id: string) {
    let url = `${ URL_SERVICES }/user/${ id }?token=${ this.token }`;
    return this.http.delete(url).map( res => {
      swal('Usuario eliminado', 'El usuario a sido eliminado correctamente', 'success');
      return true;
    });
  }

}
