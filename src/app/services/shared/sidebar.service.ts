import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      title: 'MainMenu',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard'},
        { title: 'ProgressBar', url: '/progress'},
        { title: 'Grafica', url: '/graficas1'},
        { title: 'Promesas', url: '/promesas'},
        { title: 'RXJS', url: '/rxjs'}
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: '/usuarios'},
        { title: 'Hospitales', url: '/hospitales'},
        { title: 'Medicos', url: '/medicos'}
      ]
    }
  ];

  constructor() { }

}
