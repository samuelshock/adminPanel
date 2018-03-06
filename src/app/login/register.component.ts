import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  areEquals( field1: string, field2: string ) {
    // tslint:disable-next-line:no-shadowed-variable
    return ( group: FormGroup ) => {

      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        areEquals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.registerForm = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl(null, [Validators.required, Validators.email] ),
      password: new FormControl(null, Validators.required ),
      password2: new FormControl(null, Validators.required ),
      conditions: new FormControl(false)
    }, { validators: this.areEquals('password', 'password2') });

    this.registerForm.setValue({
      name: 'test1',
      email: 'test1@test.com',
      password: '123456',
      password2: '123456',
      conditions: true
    });
  }

  userRegister() {

    if ( this.registerForm.invalid) {
      return;
    }
    if (!this.registerForm.value.conditions) {
      swal('Important', 'Please accept the termns and conditions', 'warning');
      return;
    }

    let user = new User(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    this._userService.createUser(user).subscribe( res => this.router.navigate(['/login']));
  }

}
