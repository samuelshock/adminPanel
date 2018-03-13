import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import { UploadFileService } from '../upload-file/upload-file.service';
import { Hospital } from '../../models/hospital.model';
import { UserService } from '../user/user.service';


@Injectable()
export class HospitalService {

  hospital: Hospital;

  constructor(
    public http: HttpClient,
    public _uploadFileService: UploadFileService,
    public _userService: UserService
  ) {
  }

  cargarHospitales( since: number = 0) {
    let url = URL_SERVICES + '/hospital?since=' + since;
    return this.http.get(url);
  }

  actualizarHospital( hospital: Hospital) {
    let url = `${ URL_SERVICES }/hospital/${ hospital._id }?token=${ this._userService.token }`;
    return this.http.put(url, hospital)
      .map( (res: any) => {
        swal('Hospital Actualizado', hospital.nombre, 'success');
        return true;
      });
  }

  borrarHospital( id: string) {
    let url = `${ URL_SERVICES }/hospital/${ id }?token=${ this._userService.token }`;
    return this.http.delete(url).map( res => {
      swal('Hospital eliminado', 'El hospital a sido eliminado correctamente', 'success');
      return true;
    });
  }

  buscarHospital( term: string) {
    let url = URL_SERVICES + '/search/coleccion/hospitales/' + term;
    return this.http.get(url)
      .map((res: any) => res.hospitales);
  }

  crearHospital( nombre: string) {
    let url = `${ URL_SERVICES }/hospital?token=${ this._userService.token }`;

    return this.http.post(url, {nombre})
      .map( (res: any) => {
        swal('Hospital creado', nombre, 'success');
        return res.hospital;
      });
  }

  obtenerHospital( id: string) {
    let url = `${ URL_SERVICES }/hospital/${ id }`;
    return this.http.get(url).map( (res: any) => res.hospital);
  }

}
