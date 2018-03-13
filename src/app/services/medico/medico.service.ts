import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { UserService } from '../user/user.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }

  cargarMedicos( since: number = 0) {
    let url = URL_SERVICES + '/medico?since=' + since;
    return this.http.get(url)
      .map( (res: any) => {
        this.totalMedicos = res.total;
        return res.medicos;
      });
  }

  buscarMedico( term: string) {
    let url = URL_SERVICES + '/search/coleccion/medicos/' + term;
    return this.http.get(url)
      .map((res: any) => res.medicos);
  }

  borrarMedico( id: string) {
    let url = `${ URL_SERVICES }/medico/${ id }?token=${ this._userService.token }`;
    return this.http.delete(url).map( res => {
      swal('Medico eliminado', 'El medico a sido eliminado correctamente', 'success');
      return true;
    });
  }

  guardarMedico( medico: Medico) {
    let url = URL_SERVICES + '/medico';
    if (medico._id) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this._userService.token;
      return this.http.put(url, medico)
        .map( (res: any) => {
          swal('Medico actualizado', medico.nombre, 'success');
          return res.medico;
        });
    } else {
      // Creando
      url += '?token=' + this._userService.token;
      return this.http.post(url, medico)
        .map( (res: any) => {
          swal('Medico creado', medico.nombre, 'success');
          return res.medico;
        });
    }
  }

  cargarMedico( id: string) {
    let url = `${ URL_SERVICES }/medico/${ id }`;
    return this.http.get(url).map( (res: any) => res.medico);
  }
}
