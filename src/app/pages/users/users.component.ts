import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  since: number = 0;

  totalUsers: number = 0;
  loading: boolean = false;

  constructor(
    public _userService: UserService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this._modalUploadService.notification
      .subscribe( res => this.loadUsers());
  }

  loadUsers() {

    this.loading = true;

    this._userService.loadUsers(this.since).subscribe( (res: any) => {
      this.totalUsers = res.total;
      this.users = res.users;
      this.loading = false;
    });
  }

  changeSince( value: number) {

    let since = this.since + value;

    if (since >= this.totalUsers) {
      return;
    }
    if (since < 0) {
      return;
    }

    this.since += value;
    this.loadUsers();
  }

  findUser( term: string ) {

    if (term.length <= 0) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this._userService.findUsers(term).subscribe( (users: User[]) => {
      this.users = users;
      this.loading = false;
    });
  }

  deleteUser( user: User) {

    if (user._id === this._userService.user._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( willDelete => {
      if (willDelete) {
        this._userService.deleteUser(user._id).subscribe( res => {
          this.loadUsers();
        });
      }
    });

  }

  updateUser( user: User) {
    this._userService.updateUser(user).subscribe();
  }

  displayModal( id: string) {
    this._modalUploadService.displayModal('usuarios', id);
  }

}
