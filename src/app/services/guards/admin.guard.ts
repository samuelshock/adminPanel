import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _userService: UserService
  ) {}

  canActivate() {

    if (this._userService.user.role === 'ADMIN_ROLE') {
      return true;
    }
    console.log('Bloqueado por el admin guard');
    this._userService.logout();
    return false;
  }
}
