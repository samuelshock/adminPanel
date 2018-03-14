import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { User } from '../../models/user.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  users: User[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params.subscribe( params => {
      let term = params['term'];
      this.search(term);
    });
   }

  ngOnInit() {
  }

  search(term: string) {
    let url = URL_SERVICES + '/search/todo/' + term;
    this.http.get(url)
      .subscribe( (res: any) => {
        console.log(res);
        this.users = res.users;
        this.medicos = res.medicos;
        this.hospitales = res.hospitales;
      });
  }

}
