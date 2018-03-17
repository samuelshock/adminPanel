import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class VerifyTokenGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {
    let token = this._userService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expired = this.expired(payload.exp);

    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verifyRenew(payload.exp);
  }

  verifyRenew( timeExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let tokenExp = new Date( timeExp * 1000);
      let now = new Date();

      now.setTime(now.getTime() + (4 * 60 * 60 * 1000 ));

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this._userService.renewToken().subscribe(() => {
          resolve(true);
        }, () => {
          reject(false);
          this.router.navigate(['/login']);
        });
      }

      resolve(true);
    });
  }

  expired( timeExp: number) {
    let now = new Date().getTime() / 1000;

    if (timeExp < now) {
      return true;
    } else {
      return false;
    }
  }
}
