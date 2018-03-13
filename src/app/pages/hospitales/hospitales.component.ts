import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  since: number = 0;

  totalHospitales: number = 0;
  loading: boolean = false;

  constructor(
    public _hospitalesService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notification
      .subscribe( res => this.cargarHospitales());
  }

  cargarHospitales() {

    this.loading = true;

    this._hospitalesService.cargarHospitales(this.since).subscribe( (res: any) => {
      this.totalHospitales = res.total;
      this.hospitales = res.hospitales;
      this.loading = false;
    });
  }

  changeSince( value: number) {

    let since = this.since + value;

    if (since >= this.totalHospitales) {
      return;
    }
    if (since < 0) {
      return;
    }

    this.since += value;
    this.cargarHospitales();
  }

  displayModal( id: string) {
    this._modalUploadService.displayModal('hospitales', id);
  }

  actualizarHospital( hospital: Hospital) {
    console.log(hospital);
    this._hospitalesService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital( hospital: Hospital) {

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( willDelete => {
      if (willDelete) {
        this._hospitalesService.borrarHospital(hospital._id)
        .subscribe( res => {
          this.cargarHospitales();
        });
      }
    });
  }

  buscarHospital( term: string) {
    if (term.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.loading = true;

    this._hospitalesService.buscarHospital(term).subscribe( (hositales: Hospital[]) => {
      this.hospitales = hositales;
      this.loading = false;
    });
  }

  crearHospital() {
    swal({
      text: 'Ingrese el nombre del Hospital a crear',
      content: 'input',
      button: {
        text: 'Crear',
        closeModal: false,
      },
    })
    .then( nombre => {
      if (nombre) {
        this._hospitalesService.crearHospital(nombre)
          .subscribe( res => this.cargarHospitales());
      }
    });
  }
}
